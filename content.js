var switchValue;
var verifiedElements = [];

$(window).on("load", () => {
    console.log("Content Script Execution");

    chrome.runtime.sendMessage({
        message: "content__retrieve",
        payload: "switchValue",
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message === "delete_success") {
            // Handle Delete Query
        } else if (request.message === "update_success") {
            // Handle Update Query
            console.log("PAYLOAD: " + request.payload);
        }
        if (request.message.includes("retrieve_success")) {
            // Handle Retrieve Query
            if (request.message.includes("switchValue")) {
                switchValue = request.payload.value;
                checkImageSizes();
            }
        }
        if (request.message.includes("scrollTo")) {
            var pos = request.payload;
            if (pos > 0) {
                let element = verifiedElements[pos - 1].element;
                element.scrollIntoView();
                element.style.border = "5px solid red";
            }
        }
    });
});

function updateBadge(newValue) {
    chrome.runtime.sendMessage({
        message: "update__badge",
        payload: {
            name: "newValue",
            value: newValue,
        },
    });
}

function updateElementList(numElements, elements) {
    if (switchValue) {
        chrome.runtime.sendMessage({
            message: "update",
            payload: {
                name: "numDarkPatternIdentified",
                value: numElements,
            },
        });

        // Send a request to the DB to update the value of elements containing the dark pattern
        chrome.runtime.sendMessage({
            message: "update",
            payload: {
                name: "darkPatternIdentified",
                value: elements,
            },
        });
        // Send a request to the DB to update the value of the numOfDP
        updateBadge(numElements);
    } else {
        updateBadge("");
    }
}

// Function to get the dimensions of a link
function getLinkDimensions(link) {
    const tempElement = document.createElement("span");
    tempElement.style.visibility = "hidden";
    tempElement.textContent = link.textContent;
    link.appendChild(tempElement);

    // Get the dimensions of the span element
    const width = tempElement.offsetWidth;
    const height = tempElement.offsetHeight;

    link.removeChild(tempElement); // Remove the temporary span element
    return { width, height }; // Return the dimensions of the link
}

// Function to get the dimensions of a link inside a button
function getButtonLinkDimensions(button) {
    const tempElement = document.createElement("span");
    tempElement.style.visibility = "hidden";
    tempElement.textContent = button.textContent;
    button.appendChild(tempElement);

    const width = tempElement.offsetWidth;
    const height = tempElement.offsetHeight;

    button.removeChild(tempElement);

    return { width, height };
}

// Function to get the dimensions of a link inside a div with classes .close-btn or .sb-close-btn
function getCloseButtonLinkDimensions(closeButton) {
    const tempElement = document.createElement("span");
    tempElement.style.visibility = "hidden";
    tempElement.textContent = closeButton.textContent;
    closeButton.appendChild(tempElement);

    const width = tempElement.offsetWidth;
    const height = tempElement.offsetHeight;

    closeButton.removeChild(tempElement);

    return { width, height };
}

function checkImageSizes() {
    verifiedElements = [];
    // Desired maximum dimensions
    const maxWidth = 20;
    const maxHeight = 20;

    // Select all elements to check within the page
    const images = document.querySelectorAll("img, svg");
    const buttons = document.querySelectorAll("button");
    const showSbCloseButtons = document.querySelectorAll(".show_sb .sb-close-btn");
    const closeButtons = document.querySelectorAll(".close-btn");

    for (const imgOrSvg of images) {
        let width, height;
        let valore = "";

        if (imgOrSvg.tagName.toLowerCase() === "img") {
            width = imgOrSvg.naturalWidth;
            height = imgOrSvg.naturalHeight;
            console.log("HELLO ", width, " ", height);
            valore = "img";

            const parentLink = imgOrSvg.closest("a");
            if (parentLink && parentLink.href) {
                const linkDimensions = getLinkDimensions(parentLink);

                if (width <= maxWidth && height <= maxHeight) {
                    verifiedElements.push({ element: imgOrSvg, link: parentLink.href });
                }
            }
        } else if (imgOrSvg.tagName.toLowerCase() === "svg") {
            const bbox = imgOrSvg.getBBox();
            width = bbox.width;
            height = bbox.height;
            valore = "svg";

            const svgLinks = imgOrSvg.querySelectorAll("a");
            for (const svgLink of svgLinks) {
                if (svgLink.href) {
                    const linkDimensions = getLinkDimensions(svgLink);

                    if (width <= maxWidth && height <= maxHeight) {
                        verifiedElements.push({ element: svgLink, link: parentLink.href });
                    }
                    break;
                }
            }
        }
    }

    for (const button of buttons) {
        const buttonLinks = button.querySelectorAll("a");
        for (const buttonLink of buttonLinks) {
            if (buttonLink.href) {
                const linkDimensions = getButtonLinkDimensions(buttonLink);

                if (width <= maxWidth && height <= maxHeight) {
                    verifiedElements.push({ element: button, link: buttonLink.href });
                }
                break;
            }
        }
    }

    for (const showSbCloseButton of showSbCloseButtons) {
        const links = showSbCloseButton.querySelectorAll("a");
        for (const link of links) {
            if (link.href) {
                const linkDimensions = getCloseButtonLinkDimensions(link);

                if (width <= maxWidth && height <= maxHeight) {
                    verifiedElements.push({
                        element: showSbCloseButton,
                        link: link.href,
                    });
                }
                break;
            }
        }
    }

    for (const closeButton of closeButtons) {
        const links = closeButton.querySelectorAll("a");
        for (const link of links) {
            if (link.href) {
                const linkDimensions = getCloseButtonLinkDimensions(link);

                if (width <= maxWidth && height <= maxHeight) {
                    verifiedElements.push({ element: closeButton, link: link.href });
                }
                break;
            }
        }
    }

    if (switchValue) {
        updateElementList(verifiedElements.length, verifiedElements);
    } else {
        verifiedElements.forEach((elem) => {
            elem.element.style.border = "none";
        });
        updateElementList(0, verifiedElements);
    }
}

const listContent = $(".list__index");
const listDecrement = $("#list__dec");
const listIncrement = $("#list__inc");
const switchStatus = $("#switch__status");
const darkPattern_Message = $("#DP_msg");
const darkPattern_Link = $("#DP_Link");
const currentWebsite = $("#CUR__Website");

let darkPatternList;
let currentIndex = 0;
let maxIndex = 0;
let switchValue;

// Updating Database when switch change status
switchStatus.on("change", () => {
  const isChecked = switchStatus.is(":checked");
  console.log("Switch Status: " + isChecked);

  chrome.runtime.sendMessage({
    message: "update",
    payload: { name: "switchValue", value: isChecked },
  });

  chrome.runtime.sendMessage({
    message: "content__retrieve",
    payload: "switchValue",
  });

  updateText("Start");
});

// Retrieving all the elements of DB at the start
retrieveAllDatabase();

listIncrement.on("click", (e) => {
  e.preventDefault();
  nextItemList();
});

listDecrement.on("click", (e) => {
  e.preventDefault();
  previousItemList();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "delete_success") {
    // Delete Query
  } else if (request.message === "update_success") {
    // Update Query
    retrieveAllDatabase();
  }

  if (request.message.includes("retrieve_success")) {
    // Retrieve Query
    if (request.message.includes("switchValue")) {
      switchValue = request.payload.value;
      $("#switch__status").prop("checked", switchValue);
      updateText("Start");
    }

    if (request.message.includes("numDarkPatternIdentified")) {
      updateCounterList(request.payload.value);
    }

    if (request.message.includes("darkPatternIdentified")) {
      darkPatternList = request.payload.value;
    }
  }
});

// Functions for the list management
function updateCounterList(numDarkPatternIdentified) {
  if (numDarkPatternIdentified >= 0) {
    maxIndex = numDarkPatternIdentified;
    currentIndex = 0;
    updateText("DP_List");
  }
}

// Functions for the scrolling of the list
function nextItemList() {
  if (switchStatus.is(":checked")) {
    currentIndex = (currentIndex + 1) % (maxIndex + 1);
    updateText("DP_List");
    updateText("Message");
  }
}

function previousItemList() {
  if (switchStatus.is(":checked")) {
    currentIndex = (currentIndex - 1 + maxIndex + 1) % (maxIndex + 1);
    updateText("DP_List");
    updateText("Message");
  }
}

function updateText(operation) {
  if (switchStatus.is(":checked")) {
    switch (operation) {
      default:
        console.log("Default Case");
        break;

      case "Start":
        getURL().then((url) => {
          currentWebsite.text(url);
          updateText("Message");
          updateCounterList("DP_List");
        });
        break;

      case "Message":
        const dpIndex = currentIndex - 1;
        darkPattern_Link.attr("href", dpIndex >= 0 ? darkPatternList[dpIndex].link : "");
        darkPattern_Message.toggle(dpIndex >= 0);
        break;

      case "DP_List":
        listContent.text(`${currentIndex} out of ${maxIndex}`);
        scrollToElement(currentIndex);
        break;
    }
  } else {
    listContent.text("Activate Switch to track DP");
    darkPattern_Message.hide();
    currentWebsite.text("");
  }
}

async function getURL() {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return tab.url.substring(0, tab.url.indexOf("/", 9) + 1);
}

function retrieveAllDatabase() {
  chrome.runtime.sendMessage({ message: "retrieve", payload: "switchValue" });
  chrome.runtime.sendMessage({ message: "retrieve", payload: "numDarkPatternIdentified" });
  chrome.runtime.sendMessage({ message: "retrieve", payload: "darkPatternIdentified" });
}

function scrollToElement(element) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: "scrollTo", payload: element });
  });
}

// script.js
function goToWebsite() {
    var websiteUrl = document.getElementById("CUR__Website").textContent;

    if (websiteUrl.trim() !== "") {
        window.open(websiteUrl, '_blank');
    } else {
        alert("No website URL available.");
    }
}

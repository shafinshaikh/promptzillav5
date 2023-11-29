// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log('Promptzilla extension installed.');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "userTyped") {
        fetch(`http://localhost:3000/api/prompts?query=${request.query}`)
            .then(response => response.json())
            .then(data => {
                chrome.runtime.sendMessage({ action: "updatePrompts", prompts: data });
                updateBadgeText('Open'); // Indicate new prompts are available
            })
            .catch(error => console.error('Error fetching prompts:', error));
    }   
});

// Function to update badge text
function updateBadgeText(text) {
    chrome.action.setBadgeText({ text: text });
    chrome.action.setBadgeBackgroundColor({ color: '#000000' });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "userTyped") {
        fetch(`http://localhost:3000/api/prompts?query=${request.query}`)
            .then(response => response.json())
            .then(data => {
                chrome.runtime.sendMessage({ action: "updatePrompts", prompts: data });
                updateBadgeText('Open'); // Indicate new prompts are available
            })
            .catch(error => console.error('Error fetching prompts:', error));
    }
});
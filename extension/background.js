// background.js
let currentPrompts = []; // Store the fetched prompts here

chrome.runtime.onInstalled.addListener(() => {
    console.log('Promptzilla extension installed.');
});

function updateBadgeText(text) {
    chrome.action.setBadgeText({ text: text });
    chrome.action.setBadgeBackgroundColor({ color: '#000000' });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "userTyped") {
        fetch(`http://localhost:3000/api/prompts?query=${request.query}`)
            .then(response => response.json())
            .then(data => {
                currentPrompts = data; // Store the fetched prompts
                updateBadgeText('Open'); // Update badge
            })
            .catch(error => console.error('Error fetching prompts:', error));
    }
    
    if (request.action === "getPrompts") {
        sendResponse({ prompts: currentPrompts });
    }
    return true; // Return true to handle asynchronous response
});

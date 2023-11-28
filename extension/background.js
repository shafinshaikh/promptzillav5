// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log('Promptzilla extension installed.');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchPrompts") {
        fetch(`http://localhost:3000/api/prompts?query=${request.query}`)
            .then(response => response.json())
            .then(data => sendResponse({ prompts: data }))
            .catch(error => console.error('Error fetching prompts:', error));
        return true; // Indicates that sendResponse will be called asynchronously
    }
});

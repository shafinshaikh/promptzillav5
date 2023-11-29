// content.js
console.log("Promptzilla content script running on ChatGPT");

function monitorChatGPTPrompt() {
    const promptTextarea = document.getElementById("prompt-textarea");
    if (promptTextarea) {
        promptTextarea.addEventListener("input", (event) => {
            const userInput = event.target.value;
            console.log("User typed:", userInput);

            // Send message to background.js with user input
            chrome.runtime.sendMessage({ action: "userTyped", query: userInput });
        });
    } else {
        setTimeout(monitorChatGPTPrompt, 1000);
    }
}

function handleUserInput(event) {
    const userInput = event.target.value;
    console.log("User typed:", userInput);

    // Store the last query in chrome.storage.local
    chrome.storage.local.set({ lastQuery: userInput });

    // Send message to background.js with user input
    chrome.runtime.sendMessage({ action: "userTyped", query: userInput });
}

if (window.location.href.includes("https://chat.openai.com/")) {
    monitorChatGPTPrompt();
}

// content.js
console.log("Promptzilla content script running");

function suggestPrompts() {
    let lastUrl = location.href; 

    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            onUrlChange();
        }
    }).observe(document, { subtree: true, childList: true });

    function onUrlChange() {
        if (location.href.includes("https://chat.openai.com/c/")) {
            console.log("User is on a chat page, suggesting prompts...");
            // Add logic to monitor user input or page content
            monitorUserInput();
        }
    }

    function monitorUserInput() {
        // Select the element where user input occurs. 
        // This is an example, you'll need to adjust the selector based on the actual page structure.
        const inputField = document.querySelector('input[type="text"], textarea');

        if (inputField) {
            inputField.addEventListener('input', (event) => {
                const userInput = event.target.value;
                console.log(`User typed: ${userInput}`);
                
                // Optionally debounce this to avoid too many requests
                fetchPrompts(userInput);
            });
        }
    }

    function fetchPrompts(query) {
        // Send the query to your server or background script
        // This example sends a message to the background script
        chrome.runtime.sendMessage({action: "fetchPrompts", query: query}, response => {
            if (response && response.prompts) {
                // Do something with the prompts
                console.log('Prompts received:', response.prompts);
                displayPrompts(response.prompts);
            }
        });
    }

    function displayPrompts(prompts) {
        // Logic to display prompts on the page
        // This will depend on how you want to show the prompts (e.g., insert a new element, use an overlay, etc.)
    }
}

suggestPrompts();

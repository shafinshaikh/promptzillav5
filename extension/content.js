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
        const promptContainer = document.createElement('div');
        promptContainer.id = 'promptzilla-container';
        promptContainer.style.cssText = 'position: absolute; top: 0; left: 0; z-index: 1000; background-color: #fff; border: 1px solid #8976fd; padding: 10px; border-radius: 8px; width: 300px;';
    
        prompts.forEach(prompt => {
            const promptElement = document.createElement('div');
            promptElement.style.cssText = 'margin-bottom: 10px;';
    
            const promptText = document.createElement('p');
            promptText.textContent = prompt.text;
            promptText.style.cssText = 'font-size: 14px; color: #333;';
    
            const preview = document.createElement('p'); // Adjust element type based on the type of preview
            preview.textContent = prompt.preview; // Assuming 'preview' is text. Adjust if it's an image or other media type
            preview.style.cssText = 'font-size: 12px; color: #666;';
    
            promptElement.appendChild(promptText);
            promptElement.appendChild(preview);
            promptContainer.appendChild(promptElement);
        });
    
        // Append the container to the body or another appropriate element on the page
        document.body.appendChild(promptContainer);
    }
}

suggestPrompts();

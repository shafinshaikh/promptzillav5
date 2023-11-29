// content.js
console.log("Promptzilla content script running on ChatGPT");

function displaySuggestions(suggestions, promptTextarea) {
    let suggestionContainer = document.getElementById("promptzilla-suggestions");
    if (!suggestionContainer) {
        suggestionContainer = document.createElement("div");
        suggestionContainer.id = "promptzilla-suggestions";
        suggestionContainer.style.cssText = `
            position: fixed; 
            z-index: 9999; 
            background-color: #8976fd; 
            color: white;
            border: 1px solid #ddd; 
            padding: 10px; 
            border-radius: 8px; 
            width: 300px; 
            max-height: 150px; 
            overflow-y: auto; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
            top: 20px; 
            right: 20px;
        `;
        document.body.appendChild(suggestionContainer); // Append to body for visibility
    }

    console.log("Displaying suggestions:", suggestions);
    suggestionContainer.innerHTML = '';
    suggestions.slice(0, 3).forEach(s => {
        let suggestionElement = document.createElement("p");
        suggestionElement.style.cssText = "cursor: pointer; margin: 5px 0;";
        suggestionElement.textContent = s;
        suggestionElement.addEventListener("click", () => {
            promptTextarea.value = s;
            suggestionContainer.style.display = 'none';
        });
        suggestionContainer.appendChild(suggestionElement);
    });
}

function fetchSuggestions(userInput) {
    // Placeholder for fetching suggestions logic
    // For now, we use mock suggestions. Replace with API call if needed.
    return ["Suggestion 1 for: " + userInput, "Suggestion 2 for: " + userInput, "Suggestion 3 for: " + userInput];
}

function handleUserInput(event) {
    const userInput = event.target.value;
    console.log("User typed:", userInput);

    // Fetch and display suggestions based on user input
    const suggestions = fetchSuggestions(userInput);
    displaySuggestions(suggestions, event.target);
}

function monitorChatGPTPrompt() {
    const promptTextarea = document.getElementById("prompt-textarea");
    if (promptTextarea) {
        promptTextarea.addEventListener("input", handleUserInput);
    } else {
        // If the textarea is not found, retry after a short delay
        setTimeout(monitorChatGPTPrompt, 1000);
    }
}

// Check if we are on the ChatGPT page and set up the event listener
if (window.location.href.includes("https://chat.openai.com/")) {
    monitorChatGPTPrompt();
}

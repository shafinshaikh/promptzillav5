// content.js
console.log("Promptzilla content script running on ChatGPT");

function displaySuggestions(suggestions, promptTextarea) {
    // Create a container for suggestions if it doesn't exist
    let suggestionContainer = document.getElementById("promptzilla-suggestions");
    if (!suggestionContainer) {
        suggestionContainer = document.createElement("div");
        suggestionContainer.id = "promptzilla-suggestions";
        suggestionContainer.style.cssText = "position: absolute; z-index: 1000; background-color: white; border: 1px solid #ddd; padding: 10px; border-radius: 8px; top: -60px; width: 100%;";
        promptTextarea.parentNode.insertBefore(suggestionContainer, promptTextarea);
    }

    // Populate the container with suggestions
    suggestionContainer.innerHTML = suggestions.map(s => `<p style="cursor: pointer; margin: 5px 0;" onclick="document.getElementById('prompt-textarea').value = '${s}'">${s}</p>`).join('');
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

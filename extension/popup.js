// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const promptList = document.getElementById('prompt-list');

    // Function to fetch prompts based on user input
    const fetchPrompts = async (query) => {
        try {
            const response = await fetch(`http://localhost:3000/api/prompts?query=${query}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching prompts:', error);
        }
    };

    // Function to update the UI with prompt suggestions
    const updatePromptList = (prompts) => {
        promptList.innerHTML = '';
        prompts.forEach(prompt => {
            const li = document.createElement('li');
            li.textContent = prompt.text; // Adjust according to your data structure
            promptList.appendChild(li);
        });
    };

    // Event listener for the search button
    searchButton.addEventListener('click', async () => {
        const query = searchBar.value;
        const prompts = await fetchPrompts(query);
        updatePromptList(prompts);
    });
});

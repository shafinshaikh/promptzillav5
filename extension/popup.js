// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const promptList = document.getElementById('prompt-list');

    // Clear the badge when the popup is opened
    chrome.action.setBadgeText({ text: '' });

    // Fetch last typed query from storage and then fetch prompts based on it
    chrome.storage.local.get(['lastQuery'], function(result) {
        const lastQuery = result.lastQuery || '';
        fetch(`http://localhost:3000/api/prompts?query=${lastQuery}`)
            .then(response => response.json())
            .then(prompts => updatePromptList(prompts.slice(0, 3))) // Show top 3 prompts
            .catch(error => console.error('Error fetching prompts:', error));
    });

    function updatePromptList(prompts) {
        promptList.innerHTML = '';
        prompts.forEach(prompt => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="prompt-container">
                    <p class="prompt-preview">${prompt.prompt.slice(0, 50)}...</p>
                    <div class="icon-container">
                        <span class="dropdown-arrow" title="See full prompt and preview result">&#x25BC;</span>
                        <span class="copy-icon" title="Copy prompt">&#x1F4CB;</span>
                    </div>
                </div>
                <div class="dropdown-content" style="display: none;">
                    <p><strong>Full Prompt:</strong> ${prompt.prompt}</p>
                    <p><strong>Result Preview:</strong> ${prompt.result}</p>
                </div>`;
            promptList.appendChild(li);

            // Add event listeners for dropdown and copy functionality
            li.querySelector('.dropdown-arrow').addEventListener('click', function() {
                this.parentNode.parentNode.querySelector('.dropdown-content').classList.toggle('show');
            });

            li.querySelector('.copy-icon').addEventListener('click', function() {
                navigator.clipboard.writeText(prompt.prompt).then(() => {
                    alert('Prompt copied to clipboard!');
                });
            });
        });
    }
});

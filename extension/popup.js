// popup.js

document.addEventListener('DOMContentLoaded', () => {
    const promptList = document.getElementById('prompt-list');

    // Clear the badge when the popup is opened
    chrome.action.setBadgeText({ text: '' });

    // Request the stored prompts from the background script
    chrome.runtime.sendMessage({ action: "getPrompts" }, response => {
        if (response && response.prompts) {
            updatePromptList(response.prompts.slice(0, 3)); // Show top 3 prompts
        }
    });

    function updatePromptList(prompts) {
        promptList.innerHTML = '';
        prompts.forEach(prompt => {
            const li = document.createElement('li');
            li.className = 'prompt-item';
            li.innerHTML = `
                <div class="prompt-container">
                    <p class="prompt-preview">${prompt.prompt.slice(0, 100)}...</p>
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

            li.querySelector('.dropdown-arrow').addEventListener('click', () => {
                const dropdownContent = li.querySelector('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.style.display = dropdownContent.style.display === 'none' ? 'block' : 'none';
                }
            });

            li.querySelector('.copy-icon').addEventListener('click', () => {
                navigator.clipboard.writeText(prompt.prompt).then(() => {
                    alert('Prompt copied to clipboard!');
                });
            });
        });
    }
});

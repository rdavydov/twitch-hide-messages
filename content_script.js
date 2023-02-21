// TODO: appendChild a button that toggles hiding

// Write a message to the console
console.log('%c😵 Twitch Hide Messages: Extension loaded.', 'color: #9147ff; font-size: 1.1em; font-family: sans-serif;');

// Find the chat log element
const chatLog = document.querySelector('div[role="log"]');

// Create a new MutationObserver
const observer = new MutationObserver(mutations => {
    // Loop over each mutation
    mutations.forEach(mutation => {
        // Check if nodes were added to the chat log
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Loop over each added node
            mutation.addedNodes.forEach(node => {
                // Check if the added node is a chat message with the "chat-line__message" class
                if (node instanceof HTMLDivElement && node.classList.contains('chat-line__message')) {
                    const messageTextSpan = node.querySelector('[data-a-target="chat-message-text"]');
                    // Check if the message starts with an exclamation point
                    if (messageTextSpan && messageTextSpan.innerText.trim().startsWith('!')) {
                        console.log('%c➖ ' + node.innerText.trim(), 'color: #9147ff; font-size: 1.1em; font-family: sans-serif');
                        // Hide the message container
                        node.style.display = "none";
                    }
                }
            });
        }
    });
});

// Observe the chat log for changes
observer.observe(chatLog, { childList: true });
document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userMessageInput = document.getElementById('user-message');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', () => {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            const userMessageElement = document.createElement('div');
            userMessageElement.style.color = '#00FFFF';
            userMessageElement.textContent = `You: ${userMessage}`;
            chatWindow.appendChild(userMessageElement);

            const botReplyElement = document.createElement('div');
            botReplyElement.style.color = '#800080';
            botReplyElement.textContent = `Bot: Sorry, I don't have information on that yet.`;
            chatWindow.appendChild(botReplyElement);

            userMessageInput.value = '';
        }
    });

    const eventFeed = document.getElementById('event-feed');
    const events = [
        { title: 'Campus Concert', date: 'July 10, 2025', description: 'Join us for an evening of music and fun!' },
        { title: 'Art Exhibition', date: 'July 15, 2025', description: 'Explore the creative works of our students.' },
        { title: 'Tech Talk', date: 'July 20, 2025', description: 'Learn about the latest trends in technology.' }
    ];

    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <h2>${event.title}</h2>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
        `;
        eventFeed.appendChild(card);
    });
});

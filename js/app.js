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

            // Create and append a user message
            const userMessageDiv = document.createElement("div");
            userMessageDiv.className = "user-message";
            userMessageDiv.textContent = `User: ${userMessage}`;
            document.getElementById("chat-window").appendChild(userMessageDiv);

            const botReplyElement = document.createElement('div');
            botReplyElement.style.color = '#800080';
            botReplyElement.textContent = `Bot: Sorry, I don't have information on that yet.`;
            chatWindow.appendChild(botReplyElement);

            userMessageInput.value = '';
        }
    });

    const eventFeed = document.getElementById('event-feed');
    const events = [
        { title: 'Campus Concert', date: '2025-07-10', time: '6:00 PM', venue: 'Main Auditorium', description: 'Join us for an evening of music and fun!' },
        { title: 'Art Exhibition', date: '2025-07-15', time: '10:00 AM', venue: 'Art Gallery', description: 'Explore the creative works of our students.' },
        { title: 'Tech Talk', date: '2025-07-20', time: '2:00 PM', venue: 'Tech Hall', description: 'Learn about the latest trends in technology.' }
    ];

    const renderEvents = (filterDate = null) => {
        eventFeed.innerHTML = '';
        const filteredEvents = filterDate ? events.filter(event => new Date(event.date) >= new Date(filterDate)) : events;
        filteredEvents.forEach(event => {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.innerHTML = `
                <h2>${event.title}</h2>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Time:</strong> ${event.time}</p>
                <p><strong>Venue:</strong> ${event.venue}</p>
                <p>${event.description}</p>
                <button class="view-details">View Details</button>
            `;
            card.querySelector('.view-details').addEventListener('click', () => {
                alert(`Event Details:\nTitle: ${event.title}\nDate: ${event.date}\nTime: ${event.time}\nVenue: ${event.venue}`);
            });
            eventFeed.appendChild(card);
        });
    };

    renderEvents();

    // Poster Generation
    const posterForm = document.createElement('form');
    posterForm.innerHTML = `
        <h3>Create Event Poster</h3>
        <input type="text" id="poster-title" placeholder="Event Title" required>
        <input type="date" id="poster-date" required>
        <input type="text" id="poster-theme" placeholder="Theme" required>
        <button type="submit">Generate Poster</button>
    `;
    document.body.appendChild(posterForm);

    const posterPreview = document.createElement('div');
    posterPreview.id = 'poster-preview';
    document.body.appendChild(posterPreview);

    posterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('poster-title').value;
        const date = document.getElementById('poster-date').value;
        const theme = document.getElementById('poster-theme').value;
        posterPreview.innerHTML = `
            <div style="background: linear-gradient(135deg, #ff6a00, #ee0979); padding: 1rem; border-radius: 8px; color: white;">
                <h2>${title}</h2>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Theme:</strong> ${theme}</p>
            </div>
        `;
    });

    // Add Social Media-Style Previews
    const socialSection = document.createElement('section');
    socialSection.id = 'social-preview';
    socialSection.innerHTML = '<h3>Social Media-Style Previews</h3>';
    document.body.appendChild(socialSection);

    events.forEach(event => {
        const post = document.createElement('div');
        post.className = 'social-post';
        post.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <img src="https://via.placeholder.com/50" alt="Profile Icon" style="border-radius: 50%;">
                <div>
                    <h4>${event.title}</h4>
                    <p>${event.description}</p>
                </div>
            </div>
            <div style="display: flex; gap: 1rem;">
                <button>💬 Comment</button>
                <button>❤️ Like</button>
                <button>🔁 Share</button>
            </div>
        `;
        socialSection.appendChild(post);
    });

    const chatBubble = document.getElementById('chat-bubble');
    const chatbot = document.getElementById('chatbot');

    chatBubble.addEventListener('click', () => {
        const isVisible = chatbot.style.display === 'block';
        chatbot.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            // Create and append a bot message
            const message = document.createElement("div");
            message.className = "bot-message"; // Ensures correct CSS applies
            message.textContent = "Bot: Hi! How can I assist you with campus events?";
            document.getElementById("chat-window").appendChild(message);
        }
    });

    // Toggle chat container visibility
    document.getElementById("chat-toggle").addEventListener("click", () => {
        const chat = document.getElementById("chat-container");
        chat.classList.toggle("chat-hidden");
    });

    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '❌';
    closeButton.addEventListener('click', () => {
        chatbot.style.display = 'none';
    });
    chatbot.appendChild(closeButton);

    // Function to create flashcard-style event posters
    function createPoster(title, date, theme) {
        const poster = document.createElement("div");
        poster.className = "poster-flashcard";

        poster.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Theme:</strong> ${theme}</p>
            <div class="poster-actions">
                <button class="rename-btn">✏️ Rename</button>
                <button class="delete-btn">🗑️ Delete</button>
            </div>
        `;

        // Rename button logic
        poster.querySelector(".rename-btn").addEventListener("click", () => {
            const newTitle = prompt("Enter new title:", title);
            const newDate = prompt("Enter new date:", date);
            const newTheme = prompt("Enter new theme:", theme);
            if (newTitle && newDate && newTheme) {
                poster.querySelector("h3").textContent = newTitle;
                poster.querySelectorAll("p")[0].innerHTML = `<strong>Date:</strong> ${newDate}`;
                poster.querySelectorAll("p")[1].innerHTML = `<strong>Theme:</strong> ${newTheme}`;
            }
        });

        // Delete button logic
        poster.querySelector(".delete-btn").addEventListener("click", () => {
            poster.remove();
        });

        document.getElementById("poster-list").appendChild(poster);
    }

    // Example usage of createPoster function
    createPoster("Sample Event", "2025-08-10", "Sample Theme");
});

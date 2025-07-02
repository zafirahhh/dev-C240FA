document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userMessageInput = document.getElementById('user-message');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', sendMessage);
    
    // Allow Enter key to send message
    userMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            // Create and append user message
            const userMessageDiv = document.createElement("div");
            userMessageDiv.className = "user-message";
            userMessageDiv.textContent = userMessage;
            chatWindow.appendChild(userMessageDiv);

            // Show typing indicator
            const typingDiv = document.createElement('div');
            typingDiv.className = "bot-message typing-indicator";
            typingDiv.textContent = "Assistant is typing...";
            chatWindow.appendChild(typingDiv);
            
            // Scroll to bottom
            chatWindow.scrollTop = chatWindow.scrollHeight;

            // Generate bot response with realistic delay
            setTimeout(() => {
                // Remove typing indicator
                chatWindow.removeChild(typingDiv);
                
                const botResponse = generateBotResponse(userMessage.toLowerCase());
                const botReplyDiv = document.createElement('div');
                botReplyDiv.className = "bot-message";
                botReplyDiv.textContent = botResponse;
                chatWindow.appendChild(botReplyDiv);
                
                // Scroll to bottom of chat
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds

            userMessageInput.value = '';
        }
    }

    function generateBotResponse(message) {
        // Keywords for different types of queries
        const responses = {
            // Event listing queries
            events: [
                "Here are the upcoming events:\n• Campus Concert - July 10, 6:00 PM at Main Auditorium\n• Art Exhibition - July 15, 10:00 AM at Art Gallery\n• Tech Talk - July 20, 2:00 PM at Tech Hall",
                "I found 3 upcoming events for you! Check out the Campus Concert on July 10th, Art Exhibition on July 15th, and Tech Talk on July 20th."
            ],
            
            // Date/time queries
            when: [
                "The next event is the Campus Concert on July 10th at 6:00 PM at the Main Auditorium!",
                "Coming up soon: Campus Concert (July 10), Art Exhibition (July 15), and Tech Talk (July 20)."
            ],
            
            // Location queries
            where: [
                "Events are happening at various locations:\n• Main Auditorium (Campus Concert)\n• Art Gallery (Art Exhibition)\n• Tech Hall (Tech Talk)",
                "Our venues include the Main Auditorium, Art Gallery, and Tech Hall. Which event are you interested in?"
            ],
            
            // Music/concert queries
            music: [
                "🎵 The Campus Concert is on July 10th at 6:00 PM in the Main Auditorium! It's going to be an evening of music and fun!",
                "Love music? Don't miss our Campus Concert on July 10th! It's happening at the Main Auditorium at 6:00 PM."
            ],
            
            // Art queries
            art: [
                "🎨 The Art Exhibition starts July 15th at 10:00 AM in the Art Gallery. Come explore the creative works of our students!",
                "Interested in art? Our Art Exhibition showcases amazing student works starting July 15th at the Art Gallery."
            ],
            
            // Tech queries
            tech: [
                "💻 Join our Tech Talk on July 20th at 2:00 PM in Tech Hall to learn about the latest technology trends!",
                "The Tech Talk is happening July 20th at Tech Hall. Perfect for learning about cutting-edge technology!"
            ],
            
            // Creating events
            create: [
                "You can create event posters using the form above! Just fill in the event title, date, and theme, then click 'Generate Poster'.",
                "To create an event poster, use the 'Create Event Poster' section. Add your event details and I'll help you make it look amazing!"
            ],
            
            // Help queries
            help: [
                "I can help you with:\n• Finding upcoming events\n• Event details (dates, times, locations)\n• Creating event posters\n• General campus event information\n\nWhat would you like to know?",
                "I'm here to assist with campus events! Ask me about upcoming events, venues, dates, or how to create your own event poster."
            ],
            
            // Greeting responses
            greeting: [
                "Hello! I'm here to help you discover amazing campus events. What would you like to know?",
                "Hi there! Ready to explore what's happening on campus? Ask me about upcoming events!",
                "Welcome! I can help you find events, get details, or create your own event posters. How can I assist?"
            ]
        };

        // Check for greetings
        if (message.match(/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/)) {
            return getRandomResponse(responses.greeting);
        }
        
        // Check for help requests
        if (message.match(/\b(help|what can you do|commands|options)\b/)) {
            return getRandomResponse(responses.help);
        }
        
        // Check for event listing requests
        if (message.match(/\b(events|what's happening|upcoming|schedule|list)\b/)) {
            return getRandomResponse(responses.events);
        }
        
        // Check for date/time queries
        if (message.match(/\b(when|date|time|schedule)\b/)) {
            return getRandomResponse(responses.when);
        }
        
        // Check for location queries
        if (message.match(/\b(where|location|venue|place)\b/)) {
            return getRandomResponse(responses.where);
        }
        
        // Check for music/concert queries
        if (message.match(/\b(music|concert|band|performance|sing)\b/)) {
            return getRandomResponse(responses.music);
        }
        
        // Check for art queries
        if (message.match(/\b(art|exhibition|gallery|painting|draw|creative)\b/)) {
            return getRandomResponse(responses.art);
        }
        
        // Check for tech queries
        if (message.match(/\b(tech|technology|computer|programming|coding|digital)\b/)) {
            return getRandomResponse(responses.tech);
        }
        
        // Check for poster creation queries
        if (message.match(/\b(create|make|poster|design|generate)\b/)) {
            return getRandomResponse(responses.create);
        }
        
        // Default responses for unmatched queries
        const defaultResponses = [
            "I'm not sure about that specific question, but I can help you with upcoming events, event details, or creating posters. What would you like to know?",
            "That's an interesting question! I specialize in campus events. Try asking me about upcoming events, venues, or how to create event posters.",
            "I'd love to help! I can tell you about our Campus Concert, Art Exhibition, Tech Talk, or help you create your own event poster. What interests you?",
            "Let me help you with campus events! Ask me about what's happening this week, event locations, or how to create amazing event posters."
        ];
        
        return getRandomResponse(defaultResponses);
    }
    
    function getRandomResponse(responseArray) {
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }

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
    // Poster Generation Form
    const posterForm = document.createElement('form');
    posterForm.innerHTML = `
        <h3>Create Event Poster</h3>
        <input type="text" id="poster-title" placeholder="Event Title" required>
        <input type="date" id="poster-date" required>
        <input type="text" id="poster-theme" placeholder="Theme" required>
        <button type="submit">Generate Poster</button>
    `;

    // Attach form to the correct section
    document.getElementById("poster-generation").appendChild(posterForm);

    // On submit → call createPoster()
    posterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("poster-title").value;
        const date = document.getElementById("poster-date").value;
        const theme = document.getElementById("poster-theme").value;
        createPoster(title, date, theme);
        posterForm.reset();
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
  <div class="social-post-header">
    <img src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png" alt="Profile Icon">
    <div class="username">${event.title}</div>
  </div>
  <div class="social-post-content">
    ${event.description}
  </div>
  <div class="social-post-actions">
    <button><span>💬</span> Comment</button>
    <button><span>❤️</span> Like</button>
    <button><span>🔁</span> Share</button>
  </div>
`;
        socialSection.appendChild(post);
    });

    const chatBubble = document.getElementById('chat-bubble');
    const chatbot = document.getElementById('chatbot');

    chatBubble.addEventListener('click', () => {
        const isVisible = chatbot.style.display === 'block';
        chatbot.style.display = isVisible ? 'none' : 'block';
        
        // Add welcome message when opening chat for the first time
        if (!isVisible && chatWindow.children.length === 0) {
            const welcomeMessage = document.createElement("div");
            welcomeMessage.className = "bot-message";
            welcomeMessage.textContent = "Hi! I'm your Campus Event Assistant. I can help you find upcoming events, get event details, or create event posters. Try asking me 'What events are happening?' or 'Help'";
            chatWindow.appendChild(welcomeMessage);
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

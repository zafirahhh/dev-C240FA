document.addEventListener('DOMContentLoaded', () => {
    const eventFeed = document.getElementById('event-feed');

    // Example event data
    const events = [
        { title: 'Campus Concert', date: 'July 10, 2025', description: 'Join us for an evening of music and fun!' },
        { title: 'Art Exhibition', date: 'July 15, 2025', description: 'Explore the creative works of our students.' },
        { title: 'Tech Talk', date: 'July 20, 2025', description: 'Learn about the latest trends in technology.' }
    ];

    // Render event cards
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

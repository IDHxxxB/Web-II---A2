// home.js

// Execute after the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
});

// Load and display the activity list
async function loadEvents() {
    const eventListContainer = document.getElementById('event-list');
    
    try {
        showLoading(eventListContainer);
        
        // Call the home page API to obtain the activity list
        const response = await fetch('http://localhost:3000/api/events');
        
        if (!response.ok) {
            throw new Error('Failed to get the list of activities');
        }
        
        const events = await response.json();
        
        // Empty the container
        eventListContainer.innerHTML = '';
        
        if (events.length === 0) {
            eventListContainer.innerHTML = '<p class="placeholder-text">There are no upcoming events at present</p>';
            return;
        }
        
        // Create cards for each activity
        events.forEach(event => {
            const eventCard = createEventCard(event);
            eventListContainer.appendChild(eventCard);
        });
        
    } catch (error) {
        console.error('Error:', error);
        showError('There is a problem while loading the activity. Please try again later', eventListContainer);
    }
}

// Create activity card function
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <h3><a href="event.html?id=${event.id}">${event.name}</a></h3>
        <p><strong>Category:</strong> ${event.category_name}</p>
        <p><strong>Date:</strong> ${formatDate(event.event_date)}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Price:</strong> ${formatCurrency(event.ticket_price)}</p>
        <p><strong>Progress:</strong> ${formatCurrency(event.current_amount)} / ${formatCurrency(event.fundraising_goal)}</p>
        <a href="event.html?id=${event.id}" class="view-details-btn">View Details</a>
    `;
    
    return card;
}

// Show loading status
function showLoading(container) {
    container.innerHTML = '<div class="loading">Loading...</div>';
}

// Show error message
function showError(message, container) {
    container.innerHTML = `<p class="error-message">${message}</p>`;
}

// Date formatting function
function formatDate(dateString) {
  if (!dateString) return 'No specified date';
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // The month starts from 0, so add 1
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
}

// Price formatting function
function formatCurrency(amount) {
    if (amount === null || amount === undefined) return 'Not set';
    return '¥' + Number(amount).toFixed(2);
}

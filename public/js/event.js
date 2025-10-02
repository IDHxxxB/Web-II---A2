// event.js

// Execute after the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadEventDetails();
    setupModal();
});

// Load event details
async function loadEventDetails() {
    const detailsContainer = document.getElementById('event-details');
    
    // Obtain the event ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    
    if (!eventId) {
        showError('Unspecified event ID', detailsContainer);
        return;
    }
    
    try {
        showLoading(detailsContainer);
        
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
        
        if (!response.ok) {
            throw new Error('Failed to obtain the details of the event');
        }
        
        const event = await response.json();
        
        // Display event details
        displayEventDetails(event, detailsContainer);
        
    } catch (error) {
        console.error('Error:', error);
        showError('There is a problem while loading the activity. Please try again later', detailsContainer);
    }
}

// Display event details
function displayEventDetails(event, container) {
    // Calculate the percentage of fundraising progress (avoid division by zero)
    const progressPercentage = event.fundraising_goal > 0 
        ? (event.current_amount / event.fundraising_goal) * 100 
        : 0;
    
    container.innerHTML = `
        <div class="event-detail-card">
            <h1>${event.name || 'Unnamed Event'}</h1>
            
            <div class="event-info-grid">
                <div class="info-item">
                    <strong>Category:</strong>
                    <span>${event.category_name || 'Uncategorized'}</span>
                </div>
                
                <div class="info-item">
                    <strong>Date:</strong>
                    <span>${formatDate(event.event_date)}</span>
                </div>
                
                <div class="info-item">
                    <strong>Location:</strong>
                    <span>${event.location || 'Not specified'}</span>
                </div>
                
                <div class="info-item">
                    <strong>Price:</strong>
                    <span>${formatCurrency(event.ticket_price)}</span>
                </div>
            </div>
            
            <div class="event-description">
                <h3>Event Description</h3>
                <p>${event.description || 'No description'}</p>
            </div>
            
            <div class="fundraising-progress">
                <h3>Progress</h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
                <p class="progress-text">
                    ${formatCurrency(event.current_amount)} / ${formatCurrency(event.fundraising_goal)} 
                    (${progressPercentage.toFixed(1)}%)
                </p>
            </div>
            
            <button id="registerBtn" class="register-button">Sign up immediately to participate</button>
        </div>
    `;
    
    // Add a click event to the registration button
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', showRegisterModal);
    }
}

// Set up the registration pop-up window
function setupModal() {
    const modal = document.getElementById('registerModal');
    const closeBtn = document.querySelector('.close');
    
    if (!modal) {
        console.warn('The registration pop-up element was not found. Please check if the HTML contains an element with the id "registerModal"');
        return;
    }
    
    // Click the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Click outside the pop-up window to close it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Display the registration pop-up window
function showRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error('The registration pop-up window was not found. Please check the HTML structure.');
    }
}

// Display loading status
function showLoading(container) {
    container.innerHTML = '<div class="loading">Loading...</div>';
}

// Display error message
function showError(message, container) {
    container.innerHTML = `<p class="error-message">${message}</p>`;
}

// Date Formatting Function
function formatDate(dateString) {
  if (!dateString) return 'No specific date specified';
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // The months start from 0, so add 1
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
}

// Price formatting function
function formatCurrency(amount) {
    if (amount === null || amount === undefined) return 'Not set';
    return '¥' + Number(amount).toFixed(2);
}
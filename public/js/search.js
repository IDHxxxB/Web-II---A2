// search.js

let allCategories = [];

// Execute after the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    setupEventListeners();
});

// Load all categories into the drop-down box
async function loadCategories() {
    const categorySelect = document.getElementById('category');
    
    try {
        // Display loading status
        if (categorySelect) {
            const originalContent = categorySelect.innerHTML;
            categorySelect.disabled = true;
            categorySelect.innerHTML = 'Loading...';
            
            const response = await fetch('http://localhost:3000/api/categories');
            
            if (!response.ok) {
                throw new Error('Failed to obtain the list of categories');
            }
            
            allCategories = await response.json();
            
            // Restore the original content and add options
            categorySelect.innerHTML = originalContent;
            categorySelect.disabled = false;
            
            // Clear all options after resetting the default options
            while (categorySelect.children.length > 1) {
                categorySelect.removeChild(categorySelect.lastChild);
            }
            
            // Add category options
            allCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
            
        }
        
    } catch (error) {
        console.error('Error:', error);
        if (categorySelect) {
            categorySelect.innerHTML = 'Loading failed';
            categorySelect.disabled = false;
        }
        alert('There was an issue while loading the category list');
    }
}

// Set up event listener
function setupEventListeners() {
    const searchForm = document.getElementById('searchForm');
    const clearBtn = document.getElementById('clearBtn');
    
    // Fault-tolerant processing: Check if the form elements exist
    if (!searchForm) {
        console.warn('The search form was not found. Please check if there is an element with the id "searchForm" in the HTML.');
        return;
    }
    
    // Search form submission event
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from default submission
        performSearch();
    });
    
    // Clear button click event
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            clearFilters();
        });
    } else {
        console.warn('The "Clear" button was not found. Please check if there is an element with the id "clearBtn" in the HTML.');
    }
}

// Carry out the search
async function performSearch() {
    const searchForm = document.getElementById('searchForm');
    const resultsContainer = document.getElementById('search-results');
    
    // Fault-tolerant processing: Check if the result container exists
    if (!resultsContainer) {
        console.error('No result container was found. Please check if there is an element with the id "search-results" in the HTML');
        return;
    }
    
    // Obtain form data
    const formData = new FormData(searchForm);
    const searchParams = new URLSearchParams();
    
    // Construct query parameters
    for (let [key, value] of formData) {
        if (value.trim() !== '') {
            searchParams.append(key, value);
        }
    }
    
    try {
        showLoading(resultsContainer);
        
        const response = await fetch(`http://localhost:3000/api/events/search?${searchParams}`);
        
        if (!response.ok) {
            throw new Error('Search failed');
        }
        
        const events = await response.json();
        
        // Empty the result container
        resultsContainer.innerHTML = '';
        
        if (events.length === 0) {
            resultsContainer.innerHTML = '<p class="placeholder-text">没有找到匹配的活动</p>';
            return;
        }
        
        // Display search results
        events.forEach(event => {
            const eventCard = createEventCard(event);
            resultsContainer.appendChild(eventCard);
        });
        
    } catch (error) {
        console.error('Error:', error);
        showError('If there is any problem during the search, please try again later', resultsContainer);
    }
}

// Clear filtering criteria
function clearFilters() {
    const searchForm = document.getElementById('searchForm');
    const resultsContainer = document.getElementById('search-results');
    
    if (searchForm) {
        searchForm.reset();
    }
    
    if (resultsContainer) {
        resultsContainer.innerHTML = '<p class="placeholder-text">Please enter the search criteria to look for the event</p>';
    }
}

// Create event cards
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    card.innerHTML = `
        <h3><a href="event.html?id=${event.id}">${event.name || 'Unnamed Event'}</a></h3>
        <p><strong>Category:</strong> ${event.category_name || 'Uncategorized'}</p>
        <p><strong>Date:</strong> ${formatDate(event.event_date)}</p>
        <p><strong>Location:</strong> ${event.location || 'Not specified'}</p>
        <p><strong>Price:</strong> ${formatCurrency(event.ticket_price)}</p>
        <a href="event.html?id=${event.id}" class="view-details-btn">View Details</a>
    `;
    
    return card;
}

// Display loading status
function showLoading(container) {
    container.innerHTML = '<div class="loading">Searching...</div>';
}

// Display error message
function showError(message, container) {
    container.innerHTML = `<p class="error-message">${message}</p>`;
}

// Date formatting function
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
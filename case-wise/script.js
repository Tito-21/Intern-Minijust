// CaseWise JavaScript functionality

// Login form handling
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    
    // Simple validation (in production, this should be server-side)
    if (email && password) {
        // Redirect to dashboard on successful login
        window.location.href = 'dash.html';
    } else {
        errorMsg.textContent = 'Please enter both email and password';
    }
});

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Search functionality
document.getElementById('searchInput')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.cases-table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// New case button
document.querySelector('.new-case-btn')?.addEventListener('click', function() {
    const firstName = prompt('Enter first name:');
    const lastName = prompt('Enter last name:');
    
    if (firstName && lastName) {
        // Generate new case number
        const table = document.querySelector('.cases-table tbody');
        const lastRow = table.lastElementChild;
        const lastCaseNumber = lastRow ? lastRow.cells[2].textContent : 'CW-2026-000';
        const newNumber = parseInt(lastCaseNumber.split('-')[2]) + 1;
        const caseNumber = `CW-2026-${newNumber.toString().padStart(3, '0')}`;
        
        // Add new row to table
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${caseNumber}</td>
        `;
        
        alert(`New case registered: ${caseNumber}`);
    }
});

// Sidebar navigation
document.getElementById('myCases')?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('My Cases page - showing all your assigned cases');
});

document.getElementById('laws')?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Laws page - legal references and statutes');
});

document.getElementById('caseRegistration')?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Case Registration - already on this page');
});

// Filter functionality
let activeFilters = {};

// Initialize filter dropdowns
function initializeFilters() {
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');
    
    filterDropdowns.forEach(dropdown => {
        const span = dropdown.querySelector('span');
        const column = dropdown.dataset.column;
        
        // Toggle dropdown
        span.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close other dropdowns
            filterDropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
            
            // Populate options if opening
            if (dropdown.classList.contains('active')) {
                populateFilterOptions(dropdown, column);
            }
        });
    });
    
    // Close dropdowns when clicking outside (but not on filter options)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.filter-dropdown')) {
            filterDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Populate filter options from table data
function populateFilterOptions(dropdown, column) {
    const options = dropdown.querySelector('.filter-options');
    options.innerHTML = '';
    
    const values = getUniqueColumnValues(column);
    
    // Add "All" option
    const allOption = document.createElement('div');
    allOption.className = 'filter-option';
    allOption.textContent = 'All';
    allOption.addEventListener('click', function(e) {
        e.stopPropagation();
        clearFilter(dropdown.id);
    });
    options.appendChild(allOption);
    
    // Add unique values
    values.forEach(value => {
        if (value) {
            const option = document.createElement('div');
            option.className = 'filter-option';
            option.textContent = value;
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                applyFilter(dropdown.id, column, value);
            });
            options.appendChild(option);
        }
    });
    
    // Add clear button
    const clearBtn = document.createElement('div');
    clearBtn.className = 'filter-clear';
    clearBtn.textContent = 'Clear Filter';
    clearBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        clearFilter(dropdown.id);
    });
    options.appendChild(clearBtn);
}

// Get unique values from a column
function getUniqueColumnValues(column) {
    const rows = document.querySelectorAll('.cases-table tbody tr');
    const values = new Set();
    
    rows.forEach(row => {
        if (column.includes(',')) {
            // For names filter (multiple columns)
            const columns = column.split(',');
            columns.forEach(col => {
                const value = row.cells[col].textContent.trim();
                if (value) values.add(value);
            });
        } else {
            // Single column
            const value = row.cells[column].textContent.trim();
            if (value) values.add(value);
        }
    });
    
    return Array.from(values).sort();
}

// Apply filter
function applyFilter(filterId, column, value) {
    activeFilters[filterId] = { column, value };
    
    // Update button appearance
    const dropdown = document.getElementById(filterId);
    dropdown.classList.add('active');
    
    // Update selected option
    const options = dropdown.querySelectorAll('.filter-option');
    options.forEach(option => {
        option.classList.toggle('selected', option.textContent === value);
    });
    
    // Apply all active filters
    applyAllFilters();
}

// Clear filter
function clearFilter(filterId) {
    delete activeFilters[filterId];
    
    // Update button appearance
    const dropdown = document.getElementById(filterId);
    dropdown.classList.remove('active');
    
    // Clear selected options
    const options = dropdown.querySelectorAll('.filter-option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Apply all active filters
    applyAllFilters();
}

// Apply all active filters
function applyAllFilters() {
    const rows = document.querySelectorAll('.cases-table tbody tr');
    
    rows.forEach(row => {
        let showRow = true;
        
        // Check each active filter
        Object.values(activeFilters).forEach(filter => {
            if (filter.column.includes(',')) {
                // Multiple columns (names filter)
                const columns = filter.column.split(',');
                let match = false;
                columns.forEach(col => {
                    if (row.cells[col].textContent.toLowerCase().includes(filter.value.toLowerCase())) {
                        match = true;
                    }
                });
                if (!match) showRow = false;
            } else {
                // Single column
                const cellValue = row.cells[filter.column].textContent.toLowerCase();
                if (!cellValue.includes(filter.value.toLowerCase())) {
                    showRow = false;
                }
            }
        });
        
        row.style.display = showRow ? '' : 'none';
    });
}

// Initialize filters when page loads
document.addEventListener('DOMContentLoaded', initializeFilters);

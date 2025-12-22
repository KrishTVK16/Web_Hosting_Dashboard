/**
 * Web Hosting Dashboard - JavaScript
 * Handles tab navigation, charts, search functionality, and data updates
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Theme System
    initializeTheme();
    
    // Initialize Charts
    initializeCharts();
    
    // Initialize Search Functionality
    initializeSearch();
    
    // Initialize Tab Event Listeners
    initializeTabListeners();
    
    // Initialize Authentication Forms
    initializeAuthForms();
    
    // Initialize Modal Handlers
    initializeModalHandlers();
    
    // Simulate real-time data updates
    startDataUpdates();
});

/**
 * Initialize Theme System
 */
function initializeTheme() {
    // Load saved theme preference or default to light
    const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
    applyTheme(savedTheme);
    
    // Set theme select dropdown value
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        themeSelect.value = savedTheme;
        
        // Listen for theme changes
        themeSelect.addEventListener('change', function() {
            const selectedTheme = this.value;
            applyTheme(selectedTheme);
            localStorage.setItem('dashboard-theme', selectedTheme);
            showToast(`Theme changed to ${selectedTheme === 'dark' ? 'Dark' : 'Light'}`, 'success');
        });
    }
}

/**
 * Apply theme to the document
 */
function applyTheme(theme) {
    const htmlElement = document.documentElement;
    
    // Default to light mode if theme is not specified
    if (!theme || theme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        document.body.classList.add('theme-gold-wash');
    } else if (theme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        document.body.classList.remove('theme-gold-wash');
    }
}

/**
 * Initialize Chart.js visualizations for server metrics
 */
function initializeCharts() {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    };
    
    // CPU Usage Chart (Doughnut)
    const cpuCtx = document.getElementById('cpuChart');
    if (cpuCtx) {
        new Chart(cpuCtx, {
            type: 'doughnut',
            data: {
                labels: ['Used', 'Available'],
                datasets: [{
                    data: [32, 68],
                    backgroundColor: ['#B8962E', 'rgba(184, 150, 46, 0.3)'],
                    borderWidth: 0
                }]
            },
            options: {
                ...chartOptions,
                cutout: '70%',
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Memory Usage Chart (Doughnut)
    const memoryCtx = document.getElementById('memoryChart');
    if (memoryCtx) {
        new Chart(memoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Used', 'Available'],
                datasets: [{
                    data: [38.75, 61.25], // 12.4 GB out of 32 GB
                    backgroundColor: ['#10B981', 'rgba(16, 185, 129, 0.3)'],
                    borderWidth: 0
                }]
            },
            options: {
                ...chartOptions,
                cutout: '70%',
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.label === 'Used' ? '12.4 GB' : '19.6 GB';
                                return label + ': ' + value;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Storage Usage Chart (Doughnut)
    const storageCtx = document.getElementById('storageChart');
    if (storageCtx) {
        new Chart(storageCtx, {
            type: 'doughnut',
            data: {
                labels: ['Used', 'Available'],
                datasets: [{
                    data: [49, 51], // 245 GB out of 500 GB
                    backgroundColor: ['#F59E0B', 'rgba(245, 158, 11, 0.3)'],
                    borderWidth: 0
                }]
            },
            options: {
                ...chartOptions,
                cutout: '70%',
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.label === 'Used' ? '245 GB' : '255 GB';
                                return label + ': ' + value;
                            }
                        }
                    }
                }
            }
        });
    }
}

/**
 * Initialize search functionality for tables
 */
function initializeSearch() {
    // Hosting Services Search
    const hostingSearch = document.getElementById('hostingSearch');
    if (hostingSearch) {
        hostingSearch.addEventListener('keyup', function() {
            filterTable(this, '#hosting .data-table tbody tr');
        });
    }
    
    // Domains Search
    const domainSearch = document.getElementById('domainSearch');
    if (domainSearch) {
        domainSearch.addEventListener('keyup', function() {
            filterTable(this, '#domains .data-table tbody tr');
        });
    }
    
    // Logs Search
    const logSearch = document.getElementById('logSearch');
    if (logSearch) {
        logSearch.addEventListener('keyup', function() {
            filterTable(this, '#logs .data-table tbody tr');
        });
    }
    
    // Logs Filter by Severity
    const logFilter = document.getElementById('logFilter');
    if (logFilter) {
        logFilter.addEventListener('change', function() {
            const filterValue = this.value.toLowerCase();
            const rows = document.querySelectorAll('#logs .data-table tbody tr');
            
            rows.forEach(row => {
                if (filterValue === 'all') {
                    row.style.display = '';
                } else {
                    const badge = row.querySelector('.status-badge');
                    if (badge) {
                        const severity = badge.textContent.toLowerCase();
                        row.style.display = severity.includes(filterValue) ? '' : 'none';
                    }
                }
            });
        });
    }
}

/**
 * Generic table filter function
 */
function filterTable(input, selector) {
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll(selector);
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
}

/**
 * Initialize tab event listeners
 */
function initializeTabListeners() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', function(event) {
            const targetTab = event.target.getAttribute('data-bs-target');
            console.log('Switched to tab:', targetTab);
            
            // You can add custom logic here when tabs are switched
            // For example, refreshing data or resetting filters
        });
    });
}

/**
 * Initialize authentication forms
 */
function initializeAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Login successful!', 'success');
            // Close modal after successful login
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            if (modal) modal.hide();
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Account created successfully!', 'success');
            // Close modal after successful signup
            const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
            if (modal) modal.hide();
        });
    }
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Password reset link sent to your email!', 'success');
            // Close modal after sending reset link
            const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
            if (modal) modal.hide();
        });
    }
}

/**
 * Initialize modal handlers for dynamic data population
 */
function initializeModalHandlers() {
    // Handle Manage Service Modal
    const manageServiceModal = document.getElementById('manageServiceModal');
    if (manageServiceModal) {
        manageServiceModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            if (button) {
                const serviceName = button.getAttribute('data-service');
                const plan = button.getAttribute('data-plan');
                const status = button.getAttribute('data-status');
                const created = button.getAttribute('data-created');
                const renewal = button.getAttribute('data-renewal');
                
                if (serviceName) document.getElementById('serviceNameDisplay').textContent = serviceName;
                if (plan) document.getElementById('servicePlanDisplay').textContent = plan;
                if (status) {
                    document.getElementById('serviceStatusDisplay').textContent = status;
                    document.getElementById('serviceStatusDisplay').className = 'status-badge ' + (status === 'Active' ? 'status-success' : 'status-warning');
                }
                if (created) document.getElementById('serviceCreatedDisplay').textContent = created;
                if (renewal) document.getElementById('serviceRenewalDisplay').textContent = renewal;
            }
        });
    }
    
    // Handle Upgrade Service Modal
    const upgradeServiceModal = document.getElementById('upgradeServiceModal');
    if (upgradeServiceModal) {
        upgradeServiceModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            if (button) {
                const currentPlan = button.getAttribute('data-plan');
                if (currentPlan) document.getElementById('currentPlan').value = currentPlan;
            }
        });
        
        const upgradeForm = document.getElementById('upgradeServiceForm');
        if (upgradeForm) {
            upgradeForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showToast('Service upgrade initiated!', 'success');
                const modal = bootstrap.Modal.getInstance(upgradeServiceModal);
                if (modal) modal.hide();
            });
        }
    }
    
    // Handle Renew Service Modal
    const renewServiceModal = document.getElementById('renewServiceModal');
    if (renewServiceModal) {
        renewServiceModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            if (button) {
                const serviceName = button.getAttribute('data-service');
                if (serviceName) document.getElementById('renewServiceName').value = serviceName;
            }
            
            // Update amount based on period
            const periodSelect = document.getElementById('renewPeriod');
            if (periodSelect) {
                periodSelect.addEventListener('change', function() {
                    const prices = { '1': '$99.99', '2': '$199.98', '3': '$299.97' };
                    const amountField = document.getElementById('renewAmount');
                    if (amountField) amountField.value = prices[this.value] || '$99.99';
                });
                periodSelect.dispatchEvent(new Event('change'));
            }
        });
        
        const renewForm = document.getElementById('renewServiceForm');
        if (renewForm) {
            renewForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showToast('Service renewal initiated!', 'success');
                const modal = bootstrap.Modal.getInstance(renewServiceModal);
                if (modal) modal.hide();
            });
        }
    }
    
    // Handle Manage DNS Modal
    const manageDNSModal = document.getElementById('manageDNSModal');
    if (manageDNSModal) {
        manageDNSModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            if (button) {
                const domainName = button.getAttribute('data-domain');
                if (domainName) document.getElementById('dnsDomainName').textContent = domainName;
            }
        });
    }
    
    // Handle Renew Domain Modal
    const renewDomainModal = document.getElementById('renewDomainModal');
    if (renewDomainModal) {
        renewDomainModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            if (button) {
                const domainName = button.getAttribute('data-domain');
                if (domainName) document.getElementById('renewDomainName').value = domainName;
            }
        });
        
        const renewDomainForm = document.getElementById('renewDomainForm');
        if (renewDomainForm) {
            renewDomainForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showToast('Domain renewal initiated!', 'success');
                const modal = bootstrap.Modal.getInstance(renewDomainModal);
                if (modal) modal.hide();
            });
        }
    }
    
    // Handle Renew SSL Modal
    const renewSSLModal = document.getElementById('renewSSLModal');
    if (renewSSLModal) {
        renewSSLModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            if (button) {
                const domainName = button.getAttribute('data-domain');
                if (domainName) document.getElementById('sslDomainName').value = domainName;
            }
        });
        
        const renewSSLForm = document.getElementById('renewSSLForm');
        if (renewSSLForm) {
            renewSSLForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showToast('SSL certificate renewal initiated!', 'success');
                const modal = bootstrap.Modal.getInstance(renewSSLModal);
                if (modal) modal.hide();
            });
        }
    }
    
    // Handle Add Service Form
    const addServiceForm = document.getElementById('addServiceForm');
    if (addServiceForm) {
        addServiceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('New service created successfully!', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addServiceModal'));
            if (modal) modal.hide();
        });
    }
    
    // Handle Register Domain Form
    const registerDomainForm = document.getElementById('registerDomainForm');
    if (registerDomainForm) {
        registerDomainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Domain registration initiated!', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('registerDomainModal'));
            if (modal) modal.hide();
        });
    }
    
    // Handle Contact Support Form
    const contactSupportForm = document.getElementById('contactSupportForm');
    if (contactSupportForm) {
        contactSupportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Support ticket created successfully!', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('contactSupportModal'));
            if (modal) modal.hide();
        });
    }
    
    // Handle Settings Form
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Theme is already handled by the select change event
            // But we can save other settings here if needed
            
            showToast('Settings saved successfully!', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
            if (modal) modal.hide();
        });
    }
    
    // Handle Profile Form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Profile updated successfully!', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('profileModal'));
            if (modal) modal.hide();
        });
    }
    
    // Handle Logout Confirmation
    const confirmLogout = document.getElementById('confirmLogout');
    if (confirmLogout) {
        confirmLogout.addEventListener('click', function() {
            showToast('You have been logged out successfully!', 'success');
            const modal = bootstrap.Modal.getInstance(document.getElementById('logoutModal'));
            if (modal) modal.hide();
        });
    }
}

/**
 * Simulate real-time data updates
 */
function startDataUpdates() {
    // Update timestamps in activity feed every minute
    setInterval(updateActivityTimestamps, 60000);
    
    // Simulate metric updates every 5 seconds (for demo purposes)
    setInterval(updateMetrics, 5000);
}

/**
 * Update activity feed timestamps
 */
function updateActivityTimestamps() {
    const timeElements = document.querySelectorAll('.activity-time');
    timeElements.forEach(element => {
        // This is a simple demo - in production, you'd calculate actual relative time
        console.log('Updating timestamps...');
    });
}

/**
 * Update dashboard metrics (demo simulation)
 */
function updateMetrics() {
    // In a real application, this would fetch fresh data from an API
    // For now, we'll just log to demonstrate the concept
    
    const cpuUsage = Math.floor(Math.random() * 20) + 25; // 25-45%
    const memoryUsage = Math.floor(Math.random() * 10) + 35; // 35-45%
    const storageUsage = Math.floor(Math.random() * 5) + 47; // 47-52%
    
    // Update the "Current" stat display if needed
    console.log('Metrics updated:', { cpu: cpuUsage, memory: memoryUsage, storage: storageUsage });
}

/**
 * Utility: Format bytes to human-readable format
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Utility: Format relative time
 */
function formatRelativeTime(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return Math.floor(diffInSeconds / 60) + ' minutes ago';
    if (diffInSeconds < 86400) return Math.floor(diffInSeconds / 3600) + ' hours ago';
    return Math.floor(diffInSeconds / 86400) + ' days ago';
}

/**
 * Toggle notification badge (for future implementation)
 */
function updateNotificationBadge(count) {
    const badge = document.querySelector('.navbar .bi-bell');
    if (badge && count > 0) {
        badge.classList.add('text-danger');
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    // Create a simple alert-style notification
    // In production, you could use Bootstrap toasts or a notification library
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'}`;
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
    
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// Export functions for external use if needed
window.dashboardUtils = {
    formatBytes,
    formatRelativeTime,
    showToast,
    updateNotificationBadge
};

document.addEventListener('DOMContentLoaded', function() {
    // Check admin login
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'admin.html';
        return;
    }
    
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.dashboard-section');
    const logoutBtn = document.getElementById('logoutBtn');
    const exportBtn = document.getElementById('exportDonors');
    const refreshBtn = document.getElementById('refreshDonors');
    const addEventBtn = document.getElementById('addEventBtn');
    const eventModal = document.getElementById('eventModal');
    const eventForm = document.getElementById('eventForm');
    const closeModal = document.querySelector('.close');
    
    // Sidebar navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // Logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'index.html';
    });
    
    // Load donors table
    function loadDonors() {
        const donors = JSON.parse(localStorage.getItem('templeDonors')) || [];
        const tbody = document.getElementById('donorsTableBody');
        tbody.innerHTML = '';
        
        donors.forEach((donor, index) => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${donor.name}</td>
                <td>${donor.type.toUpperCase()}</td>
                <td>${donor.type === 'money' ? '₹' + donor.amount : donor.item}</td>
                <td>${new Date(donor.date).toLocaleDateString('en-IN')}</td>
                <td>${donor.transactionId || '-'}</td>
                <td><button class="delete-btn" onclick="deleteDonor(${index})">Delete</button></td>
            `;
        });
    }
    
    // Load comments table
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('templeComments')) || [];
        const tbody = document.getElementById('commentsTableBody');
        tbody.innerHTML = '';
        
        comments.forEach((comment, index) => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${comment.name}</td>
                <td>${comment.message.substring(0, 100)}${comment.message.length > 100 ? '...' : ''}</td>
                <td>${new Date(comment.date).toLocaleDateString('en-IN')}</td>
                <td><button class="delete-btn" onclick="deleteComment(${index})">Delete</button></td>
            `;
        });
    }
    
    // Load events table
    function loadEvents() {
        const events = JSON.parse(localStorage.getItem('templeEvents')) || [];
        const tbody = document.getElementById('eventsTableBody');
        tbody.innerHTML = '';
        
        events.forEach((event, index) => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${event.title}</td>
                <td>${new Date(event.date).toLocaleDateString('en-IN')}</td>
                <td>${event.description.substring(0, 80)}${event.description.length > 80 ? '...' : ''}</td>
                <td><button class="delete-btn" onclick="deleteEvent(${index})">Delete</button></td>
            `;
        });
    }
    
    // Delete functions (make global for onclick)
    window.deleteDonor = function(index) {
        if (confirm('Are you sure you want to delete this donor?')) {
            const donors = JSON.parse(localStorage.getItem('templeDonors')) || [];
            donors.splice(index, 1);
            localStorage.setItem('templeDonors', JSON.stringify(donors));
            loadDonors();
        }
    };
    
    window.deleteComment = function(index) {
        if (confirm('Are you sure you want to delete this comment?')) {
            const comments = JSON.parse(localStorage.getItem('templeComments')) || [];
            comments.splice(index, 1);
            localStorage.setItem('templeComments', JSON.stringify(comments));
            loadComments();
        }
    };
    
    window.deleteEvent = function(index) {
        if (confirm('Are you sure you want to delete this event?')) {
            const events = JSON.parse(localStorage.getItem('templeEvents')) || [];
            events.splice(index, 1);
            localStorage.setItem('templeEvents', JSON.stringify(events));
            loadEvents();
        }
    };
    
    // Export donors to CSV
    exportBtn.addEventListener('click', function() {
        const donors = JSON.parse(localStorage.getItem('templeDonors')) || [];
        if (donors.length === 0) {
            alert('No donors to export');
            return;
        }
        
        let csv = 'Name,Type,Amount/Item,Phone,Transaction ID,Date\n';
        donors.forEach(donor => {
            csv += `"${donor.name}","${donor.type}","${donor.type === 'money' ? '₹' + donor.amount : donor.item}","${donor.phone}","${donor.transactionId || ''}","${new Date(donor.date).toLocaleDateString('en-IN')}"\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'temple-donors-' + new Date().toISOString().split('T')[0] + '.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    });
    
    // Event modal
    addEventBtn.addEventListener('click', function() {
        eventModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', function() {
        eventModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === eventModal) {
            eventModal.style.display = 'none';
        }
    });
    
    // Add event
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const eventData = {
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            description: document.getElementById('eventDesc').value
        };
        
        const events = JSON.parse(localStorage.getItem('templeEvents')) || [];
        events.unshift(eventData);
        localStorage.setItem('templeEvents', JSON.stringify(events));
        
        // Reset and close modal
        eventForm.reset();
        eventModal.style.display = 'none';
        loadEvents();
        
        alert('Event added successfully!');
    });
    
    // Refresh button
    refreshBtn.addEventListener('click', loadDonors);
    
    // Initial load
    loadDonors();
    loadComments();
    loadEvents();
});

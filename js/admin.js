document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('adminLoginForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userId = document.getElementById('adminUserId').value;
        const password = document.getElementById('adminPassword').value;
        
        // Admin credentials
        const ADMIN_USERID = 'RAMALINGESARA_TEMPLE@ADMIN';
        const ADMIN_PASSWORD = 'HARAHARAMAHADEV@123';
        
        if (userId === ADMIN_USERID && password === ADMIN_PASSWORD) {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials! Please check User ID and Password.');
            document.getElementById('adminPassword').value = '';
        }
    });
});

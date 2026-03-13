document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    
    // Load comments
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('templeComments')) || [];
        commentsList.innerHTML = '';
        
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-item';
            commentDiv.innerHTML = `
                <div class="comment-meta">
                    <strong>${comment.name}</strong>
                    <span>${new Date(comment.date).toLocaleDateString('en-IN')}</span>
                </div>
                <div class="comment-text">${comment.message}</div>
            `;
            commentsList.appendChild(commentDiv);
        });
    }
    
    // Submit comment
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('commentName').value;
            const message = document.getElementById('commentMessage').value;
            
            const comment = {
                name,
                message,
                date: new Date().toISOString()
            };
            
            // Get existing comments
            const comments = JSON.parse(localStorage.getItem('templeComments')) || [];
            comments.unshift(comment); // Add to beginning
            localStorage.setItem('templeComments', JSON.stringify(comments));
            
            // Reset form
            commentForm.reset();
            
            // Reload comments
            loadComments();
            
            alert('Thank you for your comment!');
        });
    }
    
    // Initial load
    loadComments();
});

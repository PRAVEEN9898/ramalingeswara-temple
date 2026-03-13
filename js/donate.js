document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donationForm');
    const donationType = document.getElementById('donationType');
    const moneyField = document.getElementById('moneyField');
    const itemField = document.getElementById('itemField');
    
    // Toggle donation fields
    donationType.addEventListener('change', function() {
        if (this.value === 'money') {
            moneyField.classList.remove('hidden');
            itemField.classList.add('hidden');
        } else if (this.value === 'item') {
            moneyField.classList.add('hidden');
            itemField.classList.remove('hidden');
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const donorData = {
            name: document.getElementById('donorName').value,
            phone: document.getElementById('donorPhone').value,
            type: document.getElementById('donationType').value,
            amount: document.getElementById('donationAmount').value || '',
            item: document.getElementById('itemName').value || '',
            transactionId: document.getElementById('transactionId').value || '',
            message: document.getElementById('donorMessage').value || '',
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
        
        // Store donor
        const donors = JSON.parse(localStorage.getItem('templeDonors')) || [];
        donors.unshift(donorData);
        localStorage.setItem('templeDonors', JSON.stringify(donors));
        
        // Reset form
        form.reset();
        moneyField.classList.add('hidden');
        itemField.classList.add('hidden');
        
        alert('Thank you for your generous donation! Har Har Mahadev!');
    });
});

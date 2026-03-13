document.addEventListener('DOMContentLoaded', function() {
    const eventsList = document.getElementById('eventsList');
    
    // Load events
    function loadEvents() {
        const events = JSON.parse(localStorage.getItem('templeEvents')) || [];
        
        // Sample events if none exist
        if (events.length === 0) {
            const sampleEvents = [
                {
                    title: 'Mahashivaratri Celebration',
                    date: '2026-02-26',
                    description: 'Grand celebrations with special abhishekam and night jagarana.'
                },
                {
                    title: 'Karthika Masam Poojas',
                    date: '2026-11-15',
                    description: 'Daily special poojas throughout Karthika Masam.'
                },
                {
                    title: 'Reconstruction Progress Update',
                    date: '2026-03-20',
                    description: 'Latest updates on temple reconstruction work.'
                }
            ];
            localStorage.setItem('templeEvents', JSON.stringify(sampleEvents));
            loadEvents();
            return;
        }
        
        eventsList.innerHTML = '';
        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event-card';
            eventDiv.innerHTML = `
                <h3>${event.title}</h3>
                <div class="event-date"><i class="fas fa-calendar"></i> ${new Date(event.date).toLocaleDateString('en-IN')}</div>
                <p>${event.description}</p>
            `;
            eventsList.appendChild(eventDiv);
        });
    }
    
    loadEvents();
});

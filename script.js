document.addEventListener('DOMContentLoaded', () => {
    const themes = document.querySelectorAll('.theme');
    const artworks = document.querySelectorAll('.artwork');
    
    // Define correct matches (artwork id : theme id)
    const correctMatches = {
        'artwork1': 'theme1',
        'artwork2': 'theme2',
        // Add more matches as needed
    };

    // Create drop zones for each artwork
    artworks.forEach(artwork => {
        const dropZone = document.createElement('div');
        dropZone.classList.add('drop-zone');
        dropZone.dataset.artworkId = artwork.id;
        artwork.parentElement.appendChild(dropZone);
    });

    themes.forEach(theme => {
        theme.setAttribute('draggable', true);
        
        theme.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', theme.id);
            theme.classList.add('dragging');
        });

        theme.addEventListener('dragend', () => {
            theme.classList.remove('dragging');
        });
    });

    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            
            const themeId = e.dataTransfer.getData('text/plain');
            const artworkId = zone.dataset.artworkId;
            
            // Clear previous content
            zone.innerHTML = '';
            
            // Clone and append the dropped theme
            const droppedTheme = document.getElementById(themeId).cloneNode(true);
            zone.appendChild(droppedTheme);
            
            // Check if match is correct
            if (correctMatches[artworkId] === themeId) {
                zone.classList.add('correct');
                createSparkles(zone);
            } else {
                zone.classList.add('incorrect');
                setTimeout(() => {
                    zone.classList.remove('incorrect');
                    zone.innerHTML = '';
                }, 1000);
            }
        });
    });

    function createSparkles(element) {
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    function resetGame() {
        dropZones.forEach(zone => {
            zone.innerHTML = '';
            zone.classList.remove('correct', 'incorrect');
        });
        createSparkles(document.querySelector('.reset-btn'));
    }

    document.querySelector('.reset-btn').addEventListener('click', resetGame);
});

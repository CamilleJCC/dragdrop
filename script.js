document.addEventListener('DOMContentLoaded', () => {
    const themes = document.querySelectorAll('.theme');
    const artworks = document.querySelectorAll('.artwork');
    
    // Define correct matches (artwork id : theme id)
    const correctMatches = {
        'artwork3': 'theme1', // El mago / Pim Pam Pum - Maruja Mallo
        'artwork2': 'theme2', // El domingo o el celo marino - Óscar Domínguez
        'artwork1': 'theme3', // Valle boscoso - Ithell Colquhoun
        'artwork4': 'theme4'  // Paisaje astral - Benjamín Palencia
    };

    // Randomize themes
    const themesContainer = document.querySelector('.themes-container');
    const themeElements = Array.from(themes);
    const tooltipContainer = themesContainer.querySelector('.tooltip-container');
    
    // Remove themes and shuffle them
    themeElements.forEach(theme => theme.remove());
    shuffleArray(themeElements);
    
    // Add themes back in random order
    themeElements.forEach(theme => {
        themesContainer.insertBefore(theme, tooltipContainer);
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Create artwork-dropzone pairs
    artworks.forEach(artwork => {
        const container = document.createElement('div');
        container.classList.add('artwork-container');
        
        const dropZone = document.createElement('div');
        dropZone.classList.add('drop-zone');
        dropZone.dataset.artworkId = artwork.id;
        
        // Move the artwork into the new container
        artwork.parentNode.insertBefore(container, artwork);
        container.appendChild(artwork);
        container.appendChild(dropZone);
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
            droppedTheme.setAttribute('draggable', false); // Prevent further dragging
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
        createSparkles(document.querySelector('.reveal-btn'));
    }

    document.querySelector('.reveal-btn').addEventListener('click', resetGame);
});

document.addEventListener('DOMContentLoaded', () => {
    const themes = document.querySelectorAll('.theme');
    const artworks = document.querySelectorAll('.artwork');
    let matchedCount = 0;
    const totalMatches = 4; // Total number of matches needed

    const correctMatches = {
        'artwork3': 'theme1', // El mago / Pim Pam Pum - Maruja Mallo
        'artwork2': 'theme2', // El domingo o el celo marino - Óscar Domínguez
        'artwork1': 'theme3', // Valle boscoso - Ithell Colquhoun
        'artwork4': 'theme4'  // Paisaje astral - Benjamín Palencia
    };

    const themesContainer = document.querySelector('.themes-container');
    const themeElements = Array.from(themes);
    const tooltipContainer = themesContainer.querySelector('.tooltip-container');
    
    themeElements.forEach(theme => theme.remove());
    shuffleArray(themeElements);
    
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

    artworks.forEach(artwork => {
        const container = document.createElement('div');
        container.classList.add('artwork-container');
        
        const dropZone = document.createElement('div');
        dropZone.classList.add('drop-zone');
        dropZone.dataset.artworkId = artwork.id;
        
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

    function createVictoryConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    }

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
    
    // Get the original theme from the themes container
    const originalTheme = document.getElementById(themeId);
    
    // Create a new clone for the drop zone that stays fully visible
    const droppedTheme = originalTheme.cloneNode(true);
    droppedTheme.setAttribute('draggable', false);
    
    zone.innerHTML = '';
    zone.appendChild(droppedTheme);
    
    if (correctMatches[artworkId] === themeId) {
        zone.classList.add('correct');
        createSparkles(zone);
        
        // Make the original theme in the themes container semi-transparent
        originalTheme.style.opacity = '0.5';
        originalTheme.setAttribute('draggable', false);
        
        matchedCount++;
        if (matchedCount === totalMatches) {
            createVictoryConfetti();
        }
    } else {
        zone.classList.add('incorrect');
        setTimeout(() => {
            zone.classList.remove('incorrect');
            zone.innerHTML = '';
        }, 1000);
    }
});


    });

    function resetGame() {
        dropZones.forEach(zone => {
            zone.innerHTML = '';
            zone.classList.remove('correct', 'incorrect');
        });
        themes.forEach(theme => {
            theme.style.opacity = '1';
            theme.setAttribute('draggable', true);
        });
        matchedCount = 0;
        createSparkles(document.querySelector('.reveal-btn'));
    }

    document.querySelector('.reveal-btn').addEventListener('click', resetGame);
});

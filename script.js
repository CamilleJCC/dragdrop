document.addEventListener('DOMContentLoaded', () => {
    const themes = document.querySelectorAll('.theme');
    const artworks = document.querySelectorAll('.artwork');
    // Add this object at the top of your JavaScript
const validMatches = {
    'artwork1': ['sueños', 'pesadillas'],
    'artwork2': ['seres fantásticos', 'cosmos'],
    'artwork3': ['cosmos', 'piedras'],
    'artwork4': ['piedras', 'árboles'],
    'artwork5': ['pesadillas', 'seres fantásticos'],
    'artwork6': ['árboles', 'sueños']
};

function validateMatch(theme, artwork) {
    const artworkId = artwork.dataset.id;
    const validThemes = validMatches[artworkId];
    
    if (validThemes.includes(theme)) {
        createSuccessMatch(theme, artwork);
    } else {
        createTemporaryMatch(theme, artwork);
    }
}

function createSuccessMatch(theme, artwork) {
    const connection = createConnection(theme, artwork);
    connection.classList.add('success');
    createSparkles(artwork);
    
    // Track completed matches
    checkGameCompletion();
}

function createTemporaryMatch(theme, artwork) {
    const connection = createConnection(theme, artwork);
    connection.classList.add('temporary');
    
    setTimeout(() => {
        connection.remove();
    }, 1000);
}

    
    themes.forEach(theme => {
        theme.addEventListener('dragstart', dragStart);
        theme.addEventListener('dragend', dragEnd);
    });

    artworks.forEach(artwork => {
        artwork.addEventListener('dragover', dragOver);
        artwork.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.dataset.theme);
    }

    function dragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }

    function drop(e) {
        e.preventDefault();
        const theme = e.dataTransfer.getData('text/plain');
        const artwork = e.currentTarget;
        
        createConnection(theme, artwork);
        createSparkles(artwork);
    }

    function createConnection(theme, artwork) {
        const connection = document.createElement('div');
        connection.classList.add('connection');
        // Add magical connection animation
        artwork.appendChild(connection);
    }

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
    // Add this to your existing JavaScript
function createConnection(theme, artwork) {
    const themeElement = document.querySelector(`[data-theme="${theme}"]`);
    const connection = document.createElement('div');
    connection.classList.add('connection-line');
    
    // Calculate positions
    const themeRect = themeElement.getBoundingClientRect();
    const artworkRect = artwork.getBoundingClientRect();
    
    // Set line position and angle
    const startX = themeRect.left + themeRect.width/2;
    const startY = themeRect.top + themeRect.height/2;
    const endX = artworkRect.left + artworkRect.width/2;
    const endY = artworkRect.top + artworkRect.height/2;
    
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    
    connection.style.width = `${length}px`;
    connection.style.transform = `rotate(${angle}deg)`;
    connection.style.left = `${startX}px`;
    connection.style.top = `${startY}px`;
    
    document.body.appendChild(connection);
}

});


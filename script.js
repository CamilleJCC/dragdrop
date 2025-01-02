document.addEventListener('DOMContentLoaded', () => {
    const themes = document.querySelectorAll('.theme');
    const artworks = document.querySelectorAll('.artwork');
    let connections = [];

    const validMatches = {
        '1': ['sueños', 'pesadillas'],
        '2': ['seres fantásticos', 'cosmos'],
        '3': ['cosmos', 'piedras'],
        '4': ['piedras', 'árboles'],
        '5': ['pesadillas', 'seres fantásticos'],
        '6': ['árboles', 'sueños']
    };

    function validateMatch(theme, artwork) {
        const artworkId = artwork.dataset.id;
        const validThemes = validMatches[artworkId];
        
        if (validThemes && validThemes.includes(theme)) {
            createSuccessMatch(theme, artwork);
            return true;
        } else {
            createTemporaryMatch(theme, artwork);
            return false;
        }
    }

    function createSuccessMatch(theme, artwork) {
        const connection = createConnection(theme, artwork);
        connection.classList.add('success');
        connections.push(connection);
        
        const themeElement = document.querySelector(`[data-theme="${theme}"]`);
        themeElement.classList.add('matched');
        artwork.classList.add('matched');
        
        createSparkles(artwork);
        checkGameCompletion();
    }

    function createTemporaryMatch(theme, artwork) {
        const connection = createConnection(theme, artwork);
        connection.classList.add('temporary');
        setTimeout(() => connection.remove(), 1000);
    }

    function createConnection(theme, artwork) {
        const themeElement = document.querySelector(`[data-theme="${theme}"]`);
        const connection = document.createElement('div');
        connection.classList.add('connection-line');
        
        const themeRect = themeElement.getBoundingClientRect();
        const artworkRect = artwork.getBoundingClientRect();
        
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
        return connection;
    }

    function resetGame() {
        // Remove all connections
        connections.forEach(connection => connection.remove());
        connections = [];
        
        // Reset all themes and artworks
        themes.forEach(theme => {
            theme.classList.remove('matched');
            theme.classList.remove('dragging');
        });
        
        artworks.forEach(artwork => {
            artwork.classList.remove('matched');
            artwork.classList.remove('hover');
        });
        
        createSparkles(document.querySelector('.reset-btn'));
    }

    // Event Listeners
    themes.forEach(theme => {
        theme.addEventListener('dragstart', e => {
            e.target.classList.add('dragging');
            e.dataTransfer.setData('text/plain', e.target.dataset.theme);
        });
        
        theme.addEventListener('dragend', e => {
            e.target.classList.remove('dragging');
        });
    });

    artworks.forEach(artwork => {
        artwork.addEventListener('dragover', e => {
            e.preventDefault();
            artwork.classList.add('dragover');
        });
        
        artwork.addEventListener('dragleave', () => {
            artwork.classList.remove('dragover');
        });
        
        artwork.addEventListener('drop', e => {
            e.preventDefault();
            artwork.classList.remove('dragover');
            const theme = e.dataTransfer.getData('text/plain');
            validateMatch(theme, artwork);
        });
    });

    document.querySelector('.reset-btn').addEventListener('click', resetGame);

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

    function checkGameCompletion() {
        const matchedThemes = document.querySelectorAll('.theme.matched');
        if (matchedThemes.length === themes.length) {
            setTimeout(() => {
                alert('¡Felicitaciones! Has completado el juego ✨');
            }, 500);
        }
    }
});

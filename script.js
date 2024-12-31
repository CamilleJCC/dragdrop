document.addEventListener('DOMContentLoaded', () => {
    const themes = document.querySelectorAll('.theme');
    const artworks = document.querySelectorAll('.artwork');
    
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
});

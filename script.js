document.addEventListener('DOMContentLoaded', () => {
    const themes = document.querySelectorAll('.theme');
    const artworks = document.querySelectorAll('.artwork');
    let connections = [];
    let isDrawingLine = false;
    let currentTheme = null;
    let currentLine = null;

    function createLine(theme, startX, startY) {
        const line = document.createElement('div');
        line.classList.add('connection-line');
        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        document.body.appendChild(line);
        return line;
    }

    function updateLine(line, startX, startY, endX, endY) {
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
        
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
    }

    themes.forEach(theme => {
        theme.addEventListener('mousedown', (e) => {
            isDrawingLine = true;
            currentTheme = theme;
            
            const themeRect = theme.getBoundingClientRect();
            const startX = themeRect.left + themeRect.width/2;
            const startY = themeRect.top + themeRect.height/2;
            
            currentLine = createLine(theme, startX, startY);
            theme.style.zIndex = '1001';
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (isDrawingLine && currentLine && currentTheme) {
            const themeRect = currentTheme.getBoundingClientRect();
            const startX = themeRect.left + themeRect.width/2;
            const startY = themeRect.top + themeRect.height/2;
            
            updateLine(currentLine, startX, startY, e.clientX, e.clientY);
        }
    });

    artworks.forEach(artwork => {
        artwork.addEventListener('mouseup', (e) => {
            if (isDrawingLine && currentLine && currentTheme) {
                const artworkRect = artwork.getBoundingClientRect();
                const endX = artworkRect.left + artworkRect.width/2;
                const endY = artworkRect.top + artworkRect.height/2;
                
                updateLine(currentLine, 
                    currentLine.offsetLeft, 
                    currentLine.offsetTop, 
                    endX, 
                    endY
                );
                
                connections.push(currentLine);
                createSparkles(artwork);
            }
            endDrawing();
        });
    });

    document.addEventListener('mouseup', endDrawing);

    function endDrawing() {
        if (isDrawingLine && currentLine && !currentLine.parentElement) {
            currentLine.remove();
        }
        isDrawingLine = false;
        currentLine = null;
        if (currentTheme) {
            currentTheme.style.zIndex = '';
            currentTheme = null;
        }
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

    function resetGame() {
        connections.forEach(connection => connection.remove());
        connections = [];
        themes.forEach(theme => {
            theme.style.zIndex = '';
        });
        createSparkles(document.querySelector('.reset-btn'));
    }

    document.querySelector('.reset-btn').addEventListener('click', resetGame);
});

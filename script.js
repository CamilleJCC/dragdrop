.question-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
}

.options-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

.option-button {
    background: var(--gradient-start);
    border: none;
    padding: 1rem 2rem;
    border-radius: 100px;
    color: var(--secondary-color);
    font-size: clamp(1rem, 2vw, 1.125rem);
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
}

.option-button:hover {
    background: var(--gradient-end);
    transform: translateX(10px);
}

.option-button.correct {
    background: #b5f0de;
}

.option-button.incorrect {
    background: #fab8a1;
}

.progress-bar {
    width: 100%;
    height: 4px;
    background: var(--gradient-start);
    border-radius: 2px;
    margin-top: 2rem;
}

.progress {
    height: 100%;
    background: var(--primary-color);
    border-radius: 2px;
    transition: width 0.3s ease;
}

.score-display {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin: 1rem 0;
}

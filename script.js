
// Update the second question's correctAnswer
const gameData = {
    questions: [
        {
            image: "assets/9..jpg",
            options: [
                "<span class='italic'>El domingo o el celo marino,</span> del pintor <span class='semibold'>Óscar Domínguez</span>",
                "<span class='italic'>Valle boscoso,</span> de la pintora <span class='semibold'>Ithell Colquhoun</span>",
                "<span class='italic'>Paisaje astral,</span> del pintor <span class='semibold'>Benjamín Palencia</span>"
            ],
            correctAnswer: 1,
            credit: "© Valle boscoso, Ithell Colquhoun"
        },
        {
            image: "assets/6. copia.jpg",
            options: [
                "<span class='italic'>Paisaje astral,</span> del pintor <span class='semibold'>Benjamín Palencia</span>",
                "<span class='italic'>El domingo o el celo marino,</span> del pintor <span class='semibold'>Óscar Domínguez</span>",
                "<span class='italic'>Valle boscoso,</span> de la pintora <span class='semibold'>Ithell Colquhoun</span>"
            ],
            correctAnswer: 1,
            credit: "© El domingo o el celo marino, Óscar Domínguez"
        },
        {
            image: "assets/26. Pdte..jpg",
            options: [
                "<span class='italic'>Valle boscoso,</span> de la pintora <span class='semibold'>Ithell Colquhoun</span>",
                "<span class='italic'>Paisaje astral,</span> del pintor <span class='semibold'>Benjamín Palencia</span>",
                "<span class='italic'>El domingo o el celo marino,</span> del pintor <span class='semibold'>Óscar Domínguez</span>"
            ],
            correctAnswer: 1, // Updated to index 1 for "Paisaje astral"
            credit: "© Paisaje astral, Benjamín Palencia"
        }
    ]
};
class ArtQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.hasAnswered = false;
        this.init();
    }

    init() {
        this.artworkImage = document.getElementById('current-artwork');
        this.optionsContainer = document.querySelector('.options-container');
        this.progressBar = document.querySelector('.progress');
        this.scoreDisplay = document.querySelector('.score-display');
        this.revealBtn = document.querySelector('.reveal-btn');
        
        this.nextBtn = document.createElement('button');
        this.nextBtn.className = 'next-btn';
        this.nextBtn.textContent = 'Siguiente';
        this.nextBtn.style.display = 'none';
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.optionsContainer.parentNode.appendChild(this.nextBtn);
        
        this.revealBtn.addEventListener('click', () => this.resetQuiz());
        this.displayQuestion();
    }

 displayQuestion() {
    const question = gameData.questions[this.currentQuestion];
    this.artworkImage.src = question.image;
    this.optionsContainer.innerHTML = '';
    this.hasAnswered = false;
    this.nextBtn.style.display = 'none';

    // Update score display to show current artwork number
    this.scoreDisplay.innerHTML = `Obra ${this.currentQuestion + 1} de ${gameData.questions.length}`;

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.innerHTML = option;
        button.addEventListener('click', () => {
            if (!this.hasAnswered) {
                this.checkAnswer(index);
            }
        });
        this.optionsContainer.appendChild(button);
    });

    this.updateProgress();
}

    checkAnswer(selectedIndex) {
        const question = gameData.questions[this.currentQuestion];
        const correct = selectedIndex === question.correctAnswer;
        this.hasAnswered = true;
        
        if (correct) this.score++;
        
        this.userAnswers.push({
            question: this.currentQuestion,
            correct: correct,
            selected: selectedIndex
        });

        const buttons = this.optionsContainer.querySelectorAll('.option-button');
        buttons[selectedIndex].classList.add(correct ? 'correct' : 'incorrect');
        buttons[question.correctAnswer].classList.add('correct');

        if (this.currentQuestion < gameData.questions.length - 1) {
            this.nextBtn.style.display = 'block';
        } else {
            setTimeout(() => this.showResults(), 1500);
        }
    }

    nextQuestion() {
        if (this.currentQuestion < gameData.questions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        }
    }

showResults() {
    this.optionsContainer.innerHTML = '';
    this.nextBtn.style.display = 'none';
    
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-grid';
    
    const threeQuestions = gameData.questions.slice(0, 3);
    
    threeQuestions.forEach((question, index) => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'artwork';
        
        const resultContent = `
            <img src="${question.image}" alt="Artwork ${index + 1}" style="height: 400px; width: auto;">
            <div class="result-info">
                <span class="${this.userAnswers[index].correct ? 'correct' : 'incorrect'}">
                    ${this.userAnswers[index].correct ? '✓' : '✗'}
                </span>
            </div>
            <div class="tooltip-container">
                <button class="plus-icon" id="plusBtn${index}">+</button>
                <p class="tooltip-text">${question.credit}</p>
            </div>
        `;
        
        resultDiv.innerHTML = resultContent;
        resultsContainer.appendChild(resultDiv);

        // Add click event listener for each plus button
        setTimeout(() => {
            const plusBtn = document.getElementById(`plusBtn${index}`);
            const tooltipText = plusBtn.nextElementSibling;
            
            plusBtn.addEventListener('click', () => {
                if (tooltipText.style.visibility === 'visible') {
                    tooltipText.style.visibility = 'hidden';
                    tooltipText.style.display = 'none';
                } else {
                    tooltipText.style.visibility = 'visible';
                    tooltipText.style.display = 'block';
                }
            });
        }, 0);
    });
    
    this.optionsContainer.replaceChildren(resultsContainer);

    this.scoreDisplay.innerHTML = `
        Score: ${this.score} / 3
        ${this.score === 3 ? '¡Felicitaciones!' : 'Inténtalo de nuevo'}
    `;
}

    resetQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.hasAnswered = false;
        this.displayQuestion();
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / gameData.questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ArtQuiz();
});

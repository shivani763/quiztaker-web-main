// Data is loaded from data.js
// UI State
let currentCategory = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let userScore = 0;
let customQuestionsDraft = [];

// DOM Elements
const views = {
    dashboard: document.getElementById('dashboard'),
    quiz: document.getElementById('quiz-interface'),
    result: document.getElementById('result-view'),
    create: document.getElementById('create-view')
};

const navBtns = {
    home: document.getElementById('nav-home'),
    create: document.getElementById('nav-create')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    
    // Navigation Listeners
    navBtns.home.addEventListener('click', () => showDashboard());
    navBtns.create.addEventListener('click', () => switchView('create'));
});

// View Management
function switchView(viewName) {
    // Hide all
    Object.values(views).forEach(v => v.classList.remove('active-view'));
    // Show target
    views[viewName].classList.add('active-view');
    
    // Update Nav
    Object.values(navBtns).forEach(b => b.classList.remove('active'));
    if(navBtns[viewName]) navBtns[viewName].classList.add('active');
}

// Dashboard
function populateCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';
    
    const icons = {
        "Operating Systems": "💻",
        "Computer Networks": "🌐",
        "Algorithms & Data Structures": "🧮",
        "DBMS": "🗄️",
        "Compiler Design": "⚙️",
        "Computer Organization and Architecture": "🏗️",
        "Software Engineering": "📐",
        "Theory of Computation": "🧠",
        "Basics of Computer": "🖥️"
    };

    // Preloaded Categories
    for (const [subject, questions] of Object.entries(csQuizzes)) {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => startQuiz(subject, questions);
        
        card.innerHTML = `
            <div class="category-icon">${icons[subject] || "📝"}</div>
            <div class="category-info">
                <h4>${subject}</h4>
                <p>${questions.length} Questions</p>
            </div>
        `;
        container.appendChild(card);
    }
}

function showDashboard() {
    switchView('dashboard');
    populateCategories();
}

// Quiz Execution
function startQuiz(subject, questions) {
    if(!questions || questions.length === 0) return;
    
    currentCategory = subject;
    currentQuestions = [...questions]; // Array copy
    currentQuestionIndex = 0;
    userScore = 0;
    
    document.getElementById('quiz-title').textContent = subject;
    
    switchView('quiz');
    loadQuestion();
}

function loadQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('current-question-text').textContent = q.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span>${opt}</span><span class="icon"></span>`;
        btn.onclick = () => handleAnswer(index + 1, btn);
        optionsContainer.appendChild(btn);
    });
    
    // Reset Explanation Box
    document.getElementById('explanation-box').classList.add('hidden');
    
    // Update Progress
    const progressPercent = ((currentQuestionIndex) / currentQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    document.getElementById('progress-text').textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
}

function handleAnswer(selectedIndex, selectedBtn) {
    const q = currentQuestions[currentQuestionIndex];
    const optionsBtns = document.querySelectorAll('.option-btn');
    
    // Disable all options
    optionsBtns.forEach(btn => btn.disabled = true);
    
    // Check correct
    const isCorrect = selectedIndex === q.correct;
    
    if (isCorrect) {
        userScore++;
        selectedBtn.classList.add('correct');
        selectedBtn.querySelector('.icon').textContent = '✓';
    } else {
        selectedBtn.classList.add('wrong');
        selectedBtn.querySelector('.icon').textContent = '✗';
        // Highlight correct one
        optionsBtns[q.correct - 1].classList.add('correct');
        optionsBtns[q.correct - 1].querySelector('.icon').textContent = '✓';
    }
    
    // Show Explanation
    const explBox = document.getElementById('explanation-box');
    const explStatus = document.getElementById('explanation-status');
    const explText = document.getElementById('explanation-text');
    
    explBox.classList.remove('hidden');
    
    if (isCorrect) {
        explStatus.textContent = 'Correct!';
        explStatus.className = 'status-badge correct';
    } else {
        explStatus.textContent = 'Incorrect';
        explStatus.className = 'status-badge wrong';
    }
    
    explText.innerHTML = q.explanation || "No advanced explanation available.";
    
    const nextBtn = document.getElementById('next-btn');
    nextBtn.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    };
    
    if (currentQuestionIndex === currentQuestions.length - 1) {
        nextBtn.innerHTML = 'See Results <span class="arrow">→</span>';
    } else {
        nextBtn.innerHTML = 'Next Question <span class="arrow">→</span>';
    }
}

function showResult() {
    switchView('result');
    
    // Update Progress to 100%
    document.getElementById('progress-bar').style.width = `100%`;
    
    const scoreText = document.getElementById('final-score');
    scoreText.textContent = `${userScore}/${currentQuestions.length}`;
    
    const percentage = (userScore / currentQuestions.length) * 100;
    document.querySelector('.score-circle').style.setProperty('--percentage', percentage);
    
    const messageText = document.getElementById('score-message');
    if (percentage === 100) messageText.textContent = "Perfect! You're an expert.";
    else if (percentage >= 75) messageText.textContent = "Great job! Keep it up.";
    else if (percentage >= 50) messageText.textContent = "Good effort, but lots to learn!";
    else messageText.textContent = "Time to hit the books!";
}

// Custom Quiz Creation Logic
function addQuestion() {
    const question = document.getElementById('question').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document.getElementById('option4').value;
    const correct = document.getElementById('correct').value;
    const explanation = document.getElementById('explanation').value;

    if(!question || !option1 || !option2 || !option3 || !option4 || !correct) {
        alert("Please fill out all required fields.");
        return;
    }

    const questionObj = {
        question,
        options: [option1, option2, option3, option4],
        correct: parseInt(correct),
        explanation: explanation || "Custom explanation not provided."
    };

    customQuestionsDraft.push(questionObj);
    
    // Update UI
    const list = document.getElementById('question-list');
    const li = document.createElement('li');
    li.innerHTML = `<span>Q${customQuestionsDraft.length}: ${question}</span> <span style="color: var(--success);">✓ Added</span>`;
    list.appendChild(li);
    
    document.getElementById('draft-count').textContent = customQuestionsDraft.length;
    
    // Clear form
    document.getElementById('question').value = '';
    document.getElementById('option1').value = '';
    document.getElementById('option2').value = '';
    document.getElementById('option3').value = '';
    document.getElementById('option4').value = '';
    document.getElementById('correct').value = '';
    document.getElementById('explanation').value = '';
}

function publishCustomQuiz() {
    if (customQuestionsDraft.length === 0) {
        alert("Please add at least one question to the draft before publishing.");
        return;
    }
    
    const quizName = `Custom Quiz ${Object.keys(csQuizzes).length - 3}`;
    csQuizzes[quizName] = [...customQuestionsDraft];
    
    // Clear draft
    customQuestionsDraft = [];
    document.getElementById('question-list').innerHTML = '';
    document.getElementById('draft-count').textContent = '0';
    
    alert(`${quizName} has been successfully created!`);
    showDashboard();
}

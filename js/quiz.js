/**
 * BrainBox: Engaging E-Learning System
 * Quiz Logic (js/quiz.js)
 * Manages the timed challenge, scoring, and gamified feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Authentication Check
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // 2. Quiz Data Configuration
    const quizData = [
        {
            question: "Which of the following is NOT a fundamental principle of UX design?",
            options: ["Accessibility", "Consistency", "Complexity", "User-Centricity"],
            correct: 2
        },
        {
            question: "What does the 'A' in the SOLID principles of software design stand for?",
            options: ["Abstractions", "Accessibility", "Asynchronous", "Interface Segregation"],
            correct: 0
        },
        {
            question: "In React, what hook is primarily used for handling side effects?",
            options: ["useState", "useContext", "useEffect", "useMemo"],
            correct: 2
        },
        {
            question: "Which CSS property is used to create space around elements, outside of any defined borders?",
            options: ["Padding", "Margin", "Spacing", "Border-radius"],
            correct: 1
        },
        {
            question: "What is the primary purpose of a 'Daily Stand-up' in Agile methodology?",
            options: ["Long-term planning", "Code review", "Team alignment and blockers", "Performance evaluation"],
            correct: 2
        }
    ];

    // 3. State Management
    let currentQuestion = 0;
    let score = 0;
    let timerInterval = null;
    let timeLeft = 15;
    let selectedOption = null;

    // 4. UI Elements
    const introScreen = document.getElementById('intro-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    
    const questionText = document.getElementById('question-text');
    const optionsGrid = document.getElementById('options-grid');
    const nextBtn = document.getElementById('next-btn');
    
    const progressBar = document.getElementById('progress-bar');
    const questionNumText = document.getElementById('question-number');
    const timerText = document.getElementById('timer-text');
    const timerBg = document.getElementById('timer-bg');
    
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');

    /**
     * Resets and starts the question countdown timer
     */
    const startTimer = () => {
        clearInterval(timerInterval);
        timeLeft = 15;
        timerText.innerText = timeLeft;
        timerBg.style.height = '0%';
        
        timerInterval = setInterval(() => {
            timeLeft--;
            timerText.innerText = timeLeft;
            // Update visual fill based on time elapsed
            const percentage = ((15 - timeLeft) / 15) * 100;
            timerBg.style.height = `${percentage}%`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeOut();
            }
        }, 1000);
    };

    /**
     * Handles case where user doesn't select an answer in time
     */
    const handleTimeOut = () => {
        if (selectedOption === null) {
            showFeedback("Time's up!", false);
            // Highlight correct answer even if missed
            revealAnswer();
        }
    };

    /**
     * Renders the current question and options
     */
    const renderQuestion = () => {
        const data = quizData[currentQuestion];
        selectedOption = null;
        
        // Reset Button State
        nextBtn.disabled = true;
        nextBtn.classList.add('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
        nextBtn.classList.remove('bg-indigo-600', 'text-white', 'cursor-pointer');
        nextBtn.innerHTML = `<span>Check Answer</span> <i class="fas fa-chevron-right text-sm"></i>`;

        // Update Text
        questionText.innerText = data.question;
        questionNumText.innerText = `${currentQuestion + 1}/${quizData.length}`;
        
        // Update Progress Bar
        const progress = ((currentQuestion + 1) / quizData.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Render Options
        optionsGrid.innerHTML = '';
        data.options.forEach((option, index) => {
            const card = document.createElement('div');
            card.className = 'option-card bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-center gap-4 group cursor-pointer transition-all';
            card.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-indigo-50 transition-colors">${String.fromCharCode(65 + index)}</div>
                <span class="font-semibold text-slate-700">${option}</span>
            `;
            card.onclick = () => selectOption(index, card);
            optionsGrid.appendChild(card);
        });

        startTimer();
    };

    /**
     * Handles option selection
     */
    const selectOption = (index, element) => {
        // Prevent changing selection once answer is checked
        if (nextBtn.innerText.includes('Next') || nextBtn.innerText.includes('Finish')) return;

        selectedOption = index;
        
        // Update UI
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected', 'bg-indigo-50', 'border-indigo-600');
        });
        element.classList.add('selected', 'bg-indigo-50', 'border-indigo-600');

        // Enable Button
        nextBtn.disabled = false;
        nextBtn.classList.remove('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
        nextBtn.classList.add('bg-indigo-600', 'text-white', 'cursor-pointer');
    };

    /**
     * Reveals the correct and incorrect answers visually
     */
    const revealAnswer = () => {
        clearInterval(timerInterval);
        const correctIndex = quizData[currentQuestion].correct;
        const isCorrect = selectedOption === correctIndex;

        if (isCorrect) score++;

        const cards = document.querySelectorAll('.option-card');
        
        // Highlight Correct
        cards[correctIndex].classList.add('!border-emerald-500', '!bg-emerald-50');
        cards[correctIndex].querySelector('div').classList.add('!bg-emerald-500', '!text-white', '!border-emerald-500');

        // Highlight Wrong (if user selected wrong)
        if (!isCorrect && selectedOption !== null) {
            cards[selectedOption].classList.add('!border-red-400', '!bg-red-50');
            cards[selectedOption].querySelector('div').classList.add('!bg-red-400', '!text-white', '!border-red-400');
        }

        showFeedback(isCorrect ? "Correct! +50 XP" : "Not quite!", isCorrect);
        
        // Update Button for next step
        nextBtn.innerHTML = `<span>${currentQuestion === quizData.length - 1 ? 'Finish Challenge' : 'Next Question'}</span> <i class="fas fa-chevron-right text-sm"></i>`;
    };

    /**
     * Shows a temporary feedback toast
     */
    const showFeedback = (msg, isSuccess) => {
        if (!feedback) return;
        
        feedback.innerText = msg;
        feedback.style.backgroundColor = isSuccess ? '#10b981' : '#f43f5e';
        feedback.classList.remove('-translate-y-32');
        
        setTimeout(() => {
            feedback.classList.add('-translate-y-32');
        }, 2000);
    };

    /**
     * Transition to Results screen
     */
    const showResults = () => {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        const totalXP = score * 100;
        document.getElementById('final-score').innerText = `${score} / ${quizData.length}`;
        document.getElementById('earned-xp').innerText = `+${totalXP}`;

        // Save progress to global state
        window.brainbox.saveProgress(totalXP);

        // Dynamically update result message
        const title = document.getElementById('result-title');
        const subtitle = document.getElementById('result-subtitle');
        const icon = document.getElementById('result-icon');

        if (score === quizData.length) {
            title.innerText = "Perfect Streak!";
            subtitle.innerText = "Master-level performance! You earned the daily bonus.";
        } else if (score >= 3) {
            title.innerText = "Great Job!";
            subtitle.innerText = "You've got a solid grasp on these concepts.";
        } else {
            title.innerText = "Keep Practicing";
            subtitle.innerText = "Every challenge is a step toward mastery.";
            icon.classList.replace('bg-emerald-500', 'bg-amber-500');
            icon.innerHTML = '<i class="fas fa-redo"></i>';
        }
    };

    // 5. Event Listeners
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            introScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            renderQuestion();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (nextBtn.innerText.includes('Check')) {
                revealAnswer();
            } else {
                currentQuestion++;
                if (currentQuestion < quizData.length) {
                    renderQuestion();
                } else {
                    showResults();
                }
            }
        });
    }
});
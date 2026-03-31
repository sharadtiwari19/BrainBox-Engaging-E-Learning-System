/**
 * BrainBox: Engaging E-Learning System
 * Smart Video Player Logic (js/video.js)
 * Manages video simulation, interactive quiz triggers, and curriculum progress.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Authentication Check
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // 2. State Management
    let isPlaying = false;
    let quizTriggered = false;
    const user = window.brainbox.getUser();

    // 3. UI Elements
    const playBtn = document.getElementById('play-sim');
    const quizModal = document.getElementById('quiz-modal');
    const progressBar = document.querySelector('.video-container .bg-indigo-600.h-full');
    const curriculumItems = document.querySelectorAll('.curriculum-item');

    /**
     * Updates the header and sidebar based on user progress
     */
    const syncProgressUI = () => {
        const currentUser = window.brainbox.getUser();
        const xpDisplay = document.querySelector('.text-indigo-700');
        if (xpDisplay) xpDisplay.innerText = `+${currentUser.xp % 1000} XP`;
    };

    /**
     * Simulates the video play/pause behavior
     */
    const togglePlay = () => {
        if (!playBtn) return;

        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playBtn.innerHTML = '<i class="fas fa-pause text-2xl"></i>';
            window.brainbox.showToast("Video Resumed", "info");
            
            // Trigger interactive quiz simulation after 3 seconds if not already triggered
            if (!quizTriggered) {
                setTimeout(() => {
                    showInteractiveQuiz();
                }, 3000);
            }
        } else {
            playBtn.innerHTML = '<i class="fas fa-play text-2xl ml-1"></i>';
            window.brainbox.showToast("Video Paused", "info");
        }
    };

    /**
     * Shows the quiz overlay and pauses "playback"
     */
    const showInteractiveQuiz = () => {
        isPlaying = false;
        quizTriggered = true;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play text-2xl ml-1"></i>';
        
        if (quizModal) {
            quizModal.style.display = 'flex';
        }
    };

    /**
     * Global function for the HTML buttons to handle quiz answers
     */
    window.handleAnswer = (isCorrect) => {
        if (quizModal) quizModal.style.display = 'none';

        if (isCorrect) {
            window.brainbox.showToast("Correct! +50 XP Gained", "success");
            window.brainbox.saveProgress(50);
            syncProgressUI();
            
            // Visual feedback: Update progress bar to 100% for this lesson
            if (progressBar) progressBar.style.width = '100%';
        } else {
            window.brainbox.showToast("Incorrect. Let's review that section.", "error");
            // Reset trigger so they can try again
            quizTriggered = false; 
        }
        
        // Resume simulation state
        isPlaying = true;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause text-2xl"></i>';
    };

    /**
     * Handles switching between lessons in the curriculum sidebar
     */
    curriculumItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if locked
            if (item.querySelector('.fa-lock')) {
                window.brainbox.showToast("Complete previous lessons to unlock this!", "error");
                return;
            }

            // Update active state
            curriculumItems.forEach(i => {
                i.classList.remove('active', 'bg-f5f7ff', 'border-l-4', 'border-indigo-600');
                const title = i.querySelector('p.font-bold');
                if (title) title.classList.remove('text-indigo-700');
            });

            item.classList.add('active', 'bg-f5f7ff', 'border-l-4', 'border-indigo-600');
            const newTitle = item.querySelector('p.font-bold');
            if (newTitle) newTitle.classList.add('text-indigo-700');

            // Update Header Lesson Text
            const lessonTitle = item.querySelector('p.font-bold').innerText;
            const headerLesson = document.querySelector('header p.text-xs');
            if (headerLesson) headerLesson.innerText = `Currently Playing: ${lessonTitle}`;

            window.brainbox.showToast(`Loading ${lessonTitle}...`, "info");
            
            // Reset playback state for new lesson
            isPlaying = false;
            quizTriggered = false;
            if (playBtn) playBtn.innerHTML = '<i class="fas fa-play text-2xl ml-1"></i>';
        });
    });

    // 4. Initialization
    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
    }

    // Exit Course Button
    const exitBtn = document.querySelector('button[onclick*="login.html"]');
    if (exitBtn) {
        // Change logic to go to dashboard instead of login
        exitBtn.setAttribute('onclick', "window.location.href='dashboard.html'");
    }

    syncProgressUI();
});
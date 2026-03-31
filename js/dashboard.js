/**
 * BrainBox: Engaging E-Learning System
 * Dashboard Logic (js/dashboard.js)
 * Manages user data display, progress tracking, and interactive dashboard elements.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Authentication Check
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // 2. Load and Display User Data
    const renderUserData = () => {
        const user = window.brainbox.getUser();
        
        // Update Header and Welcome
        const welcomeName = document.querySelector('h1');
        const headerName = document.querySelector('.group p.text-sm');
        const headerLevel = document.querySelector('.group p.text-xs');
        const headerAvatar = document.querySelector('.group img');

        if (welcomeName) welcomeName.innerText = `Welcome Back, ${user.name}! 👋`;
        if (headerName) headerName.innerText = user.name;
        if (headerLevel) headerLevel.innerText = `Level ${user.level} Explorer`;
        
        // Update Stats Cards
        const totalXpDisplay = document.querySelector('.stat-card h3');
        const xpProgressFill = document.querySelector('.progress-bar-fill');
        const nextLevelText = document.querySelector('.stat-card p.text-\\[10px\\]');

        if (totalXpDisplay) totalXpDisplay.innerText = user.xp.toLocaleString();
        
        // Calculate Progress to Next Level (1000 XP per level)
        const xpInCurrentLevel = user.xp % 1000;
        const progressPercent = (xpInCurrentLevel / 1000) * 100;
        const xpNeeded = 1000 - xpInCurrentLevel;

        if (xpProgressFill) {
            // Delay for animation effect
            setTimeout(() => {
                xpProgressFill.style.width = `${progressPercent}%`;
            }, 300);
        }
        
        if (nextLevelText) {
            nextLevelText.innerText = `Next level: ${xpNeeded.toLocaleString()} XP needed`;
        }
    };

    // 3. Handle Search Functionality
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.brainbox.showToast(`Searching for "${query}"...`, 'info');
                    // In a real app, redirect to course.html with search params
                }
            }
        });
    }

    // 4. Interactive Elements (Continue Learning)
    const courseCards = document.querySelectorAll('.group.cursor-pointer');
    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            const courseTitle = card.querySelector('h4').innerText;
            window.brainbox.showToast(`Resuming: ${courseTitle}`, 'success');
            setTimeout(() => {
                window.location.href = 'video.html';
            }, 800);
        });
    });

    // 5. Daily Streak Interaction
    const streakCard = document.querySelector('.bg-white.p-2.rounded-2xl');
    if (streakCard) {
        streakCard.addEventListener('click', () => {
            window.brainbox.showToast("You're on fire! Keep the streak alive.", 'success');
        });
    }

    // 6. Notification Mockup
    const bellBtn = document.querySelector('.fa-bell').parentElement;
    if (bellBtn) {
        bellBtn.addEventListener('click', () => {
            const user = window.brainbox.getUser();
            window.brainbox.showToast(`You have 2 new achievements waiting, ${user.name}!`, 'info');
        });
    }

    // Initialize UI
    renderUserData();
});
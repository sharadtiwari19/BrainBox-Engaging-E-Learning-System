/**
 * BrainBox: Engaging E-Learning System
 * User Profile Logic (js/profile.js)
 * Manages user data, achievement visualization, activity charts, and settings.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Authentication Check
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // 2. Load User Data
    const renderProfile = () => {
        const user = window.brainbox.getUser();
        
        // Update Personal Info
        const nameDisplay = document.querySelector('h1.text-3xl');
        const xpDisplay = document.querySelector('.text-2xl.text-purple-600');
        const levelDisplay = document.querySelector('.text-right p.text-xs');
        const avatarImg = document.querySelector('img.rounded-3xl');
        const joinDate = document.querySelector('.fa-calendar-alt').parentElement;

        if (nameDisplay) nameDisplay.innerText = user.name;
        if (xpDisplay) xpDisplay.innerText = user.xp.toLocaleString();
        if (levelDisplay) levelDisplay.innerText = `Level ${user.level} Explorer`;
        if (joinDate) joinDate.innerHTML = `<i class="fas fa-calendar-alt mr-1"></i> Joined ${user.joined || 'March 2024'}`;
        
        if (avatarImg) {
            avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=128`;
        }

        // Update Stats Cards
        const statValues = document.querySelectorAll('.bg-white.p-6.text-center p.text-2xl');
        if (statValues.length >= 2) {
            statValues[1].innerText = user.xp.toLocaleString(); // Total XP
        }
    };

    // 3. Activity Chart Animation
    const animateChart = () => {
        const bars = document.querySelectorAll('.bg-indigo-500.rounded-t-lg');
        bars.forEach((bar, index) => {
            // Simulated data: vary heights slightly on each load
            const baseHeight = bar.style.height || '50%';
            bar.style.height = '0%';
            
            setTimeout(() => {
                bar.style.height = baseHeight;
            }, 100 * index);
        });
    };

    // 4. Edit Profile Simulation
    const editBtn = document.querySelector('.bg-indigo-50.text-indigo-600');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            window.brainbox.showToast("Profile editing will be available in the next update!", "info");
        });
    }

    // 5. Interest Tags Management
    const tagsContainer = document.querySelector('.flex.flex-wrap.gap-2');
    const addTagBtn = document.querySelector('button.bg-white\\/5');

    if (addTagBtn && tagsContainer) {
        addTagBtn.addEventListener('click', () => {
            const newTagText = prompt("Enter a new interest (e.g., TypeScript, SEO):");
            if (newTagText && newTagText.trim()) {
                const tag = document.createElement('span');
                tag.className = 'bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold border border-white/20 animate-pop';
                tag.innerText = newTagText.trim();
                tagsContainer.insertBefore(tag, addTagBtn);
                window.brainbox.showToast(`Added tag: ${newTagText}`, "success");
            }
        });
    }

    // 6. Settings Toggles
    const toggles = document.querySelectorAll('.w-10.h-5.rounded-full');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const dot = toggle.querySelector('div');
            const isActive = toggle.classList.contains('bg-indigo-600');

            if (isActive) {
                toggle.classList.replace('bg-indigo-600', 'bg-slate-300');
                dot.classList.replace('right-1', 'left-1');
                window.brainbox.showToast("Setting disabled", "info");
            } else {
                toggle.classList.replace('bg-slate-300', 'bg-indigo-600');
                dot.classList.replace('left-1', 'right-1');
                window.brainbox.showToast("Setting enabled", "success");
            }
        });
    });

    // 7. Badge Tooltips (Simple Mock)
    const badges = document.querySelectorAll('.badge-card');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            const title = badge.querySelector('p.font-bold').innerText;
            // You could create a custom tooltip here, for now we log
            console.log(`Viewing badge: ${title}`);
        });
    });

    // Initialize
    renderProfile();
    animateChart();
});
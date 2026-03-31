/**
 * BrainBox: Engaging E-Learning System
 * Global JavaScript (js/main.js)
 * Handles shared UI logic, navigation, and global utilities.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core UI Elements
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const landingMenuBtn = document.getElementById('menu-btn');
    const landingCloseBtn = document.getElementById('close-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // 2. Dashboard/App Sidebar Logic
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('-translate-x-full');
            // Prevent body scroll when sidebar is open on mobile
            if (!sidebar.classList.contains('-translate-x-full')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 1024 && 
                !sidebar.contains(e.target) && 
                !sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.add('-translate-x-full');
                document.body.style.overflow = '';
            }
        });
    }

    // 3. Landing Page Mobile Menu Logic
    if (landingMenuBtn && mobileMenu) {
        const toggleLandingMenu = () => {
            mobileMenu.classList.toggle('hidden-menu');
            document.body.classList.toggle('overflow-hidden');
        };

        landingMenuBtn.addEventListener('click', toggleLandingMenu);
        if (landingCloseBtn) landingCloseBtn.addEventListener('click', toggleLandingMenu);

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleLandingMenu);
        });
    }

    // 4. Global Notification System (Toast)
    window.brainbox = {
        /**
         * Shows a global toast notification
         * @param {string} message - The text to display
         * @param {string} type - 'success', 'error', or 'info'
         */
        showToast: (message, type = 'success') => {
            let toast = document.getElementById('global-toast');
            
            // Create toast element if it doesn't exist
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'global-toast';
                toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 transition-all duration-500 transform translate-y-32 text-white font-bold text-sm';
                document.body.appendChild(toast);
            }

            // Set colors based on type
            const colors = {
                success: 'bg-emerald-500',
                error: 'bg-red-500',
                info: 'bg-indigo-600'
            };
            
            toast.className = `${toast.className.split(' ').filter(c => !c.startsWith('bg-')).join(' ')} ${colors[type] || colors.info}`;
            toast.innerHTML = `<i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i> <span>${message}</span>`;
            
            // Show toast
            toast.classList.remove('translate-y-32');
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.add('translate-y-32');
            }, 3000);
        },

        // Mock User Data Helper
        getUser: () => {
            const user = localStorage.getItem('bb_user');
            return user ? JSON.parse(user) : { name: 'Guest', level: 1, xp: 0 };
        },

        // Save progress helper
        saveProgress: (xpGained) => {
            const user = window.brainbox.getUser();
            user.xp += xpGained;
            // Simple level up logic: every 1000 XP
            user.level = Math.floor(user.xp / 1000) + 1;
            localStorage.setItem('bb_user', JSON.stringify(user));
            return user;
        }
    };

    // 5. Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.sidebar-link, .nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            // If it's a sidebar link in tailwind
            if (link.classList.contains('sidebar-link')) {
                link.classList.add('bg-indigo-600', 'text-white');
                link.classList.remove('text-slate-500');
            }
        }
    });

    // 6. Global Hover Effects for Buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => btn.style.transform = 'scale(0.95)');
        btn.addEventListener('mouseup', () => btn.style.transform = 'scale(1)');
    });
});
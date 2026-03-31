/**
 * BrainBox: Engaging E-Learning System
 * Authentication Logic (js/auth.js)
 * Handles login, registration, and session management.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    /**
     * Helper to simulate a network request
     * @param {number} ms - Milliseconds to delay
     */
    const simulateRequest = (ms = 1500) => new Promise(resolve => setTimeout(resolve, ms));

    /**
     * Handle Login Logic
     */
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            // 1. Basic Validation
            if (!email || !password) {
                window.brainbox.showToast('Please fill in all fields', 'error');
                return;
            }

            // 2. Visual Loading State
            submitBtn.disabled = true;
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch animate-spin"></i> Authenticating...';

            try {
                // 3. Simulate API Call
                await simulateRequest(1500);

                // 4. Mock Success Logic
                // In a real app, you'd verify credentials against a database here.
                const userData = {
                    name: email.split('@')[0],
                    email: email,
                    xp: 12450,
                    level: 12,
                    joined: 'March 2024'
                };

                localStorage.setItem('bb_user', JSON.stringify(userData));
                localStorage.setItem('isLoggedIn', 'true');

                submitBtn.classList.replace('bg-indigo-600', 'bg-emerald-500');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Success! Redirecting...';

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);

            } catch (error) {
                window.brainbox.showToast('Login failed. Please check your credentials.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    /**
     * Handle Registration Logic
     */
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            const submitBtn = registerForm.querySelector('button[type="submit"]');

            // 1. Validation
            if (password !== confirmPassword) {
                window.brainbox.showToast('Passwords do not match', 'error');
                return;
            }

            if (!terms) {
                window.brainbox.showToast('You must agree to the Terms of Service', 'error');
                return;
            }

            // 2. Visual Loading State
            submitBtn.disabled = true;
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch animate-spin"></i> Creating Profile...';

            try {
                // 3. Simulate API Call
                await simulateRequest(2000);

                // 4. Mock Registration Success
                const newUser = {
                    name: fullName,
                    email: email,
                    xp: 0,
                    level: 1,
                    joined: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                };

                localStorage.setItem('bb_user', JSON.stringify(newUser));
                localStorage.setItem('isLoggedIn', 'true');

                submitBtn.classList.replace('bg-indigo-600', 'bg-emerald-500');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Welcome to BrainBox!';

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1200);

            } catch (error) {
                window.brainbox.showToast('Registration failed. Try again later.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    /**
     * Logout Helper (Can be used globally)
     */
    window.logout = () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    };
});
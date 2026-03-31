/**
 * BrainBox: Engaging E-Learning System
 * API Handler (js/api.js)
 * Centralizes data fetching and simulated backend communication.
 */

const API_CONFIG = {
    DELAY: 800, // Simulated network latency
    BASE_URL: '/api/v1'
};

const BrainBoxAPI = {
    /**
     * Helper to simulate a network request
     */
    _request: (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, API_CONFIG.DELAY);
        });
    },

    /**
     * AUTHENTICATION
     */
    login: async (credentials) => {
        // Mocking a successful login
        return BrainBoxAPI._request({
            status: 'success',
            user: {
                id: 'user_123',
                name: credentials.email.split('@')[0],
                email: credentials.email,
                xp: 12450,
                level: 12,
                joined: 'March 2024'
            }
        });
    },

    register: async (userData) => {
        return BrainBoxAPI._request({
            status: 'success',
            user: {
                ...userData,
                id: 'user_' + Date.now(),
                xp: 0,
                level: 1,
                joined: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            }
        });
    },

    /**
     * COURSE DATA
     */
    getCourses: async () => {
        const courses = [
            { id: 1, title: "Mastering Modern JavaScript (ES6+)", category: "Development", instructor: "Alex K.", rating: 4.9, xp: 500 },
            { id: 2, title: "UI Design Fundamentals", category: "Design", instructor: "Sarah J.", rating: 4.8, xp: 450 },
            { id: 3, title: "Intro to Python for Data", category: "Development", instructor: "David M.", rating: 4.7, xp: 400 },
            { id: 4, title: "Growth Hacking 101", category: "Marketing", instructor: "Emma W.", rating: 4.6, xp: 350 }
        ];
        return BrainBoxAPI._request(courses);
    },

    getCourseDetails: async (courseId) => {
        return BrainBoxAPI._request({
            id: courseId,
            description: "A deep dive into advanced concepts.",
            lessons: [
                { id: 1, title: "Introduction", duration: "10:00" },
                { id: 2, title: "Core Concepts", duration: "15:30" }
            ]
        });
    },

    /**
     * QUIZ & GAMIFICATION
     */
    getDailyQuiz: async () => {
        const questions = [
            {
                id: 'q1',
                question: "Which keyword is used for 'constant' variables in ES6?",
                options: ["var", "let", "const", "def"],
                correct: 2
            },
            {
                id: 'q2',
                question: "What does DOM stand for?",
                options: ["Data Object Model", "Document Object Model", "Digital Order Main"],
                correct: 1
            }
        ];
        return BrainBoxAPI._request(questions);
    },

    updateUserStats: async (xpGained) => {
        const currentUser = window.brainbox.getUser();
        const updatedUser = window.brainbox.saveProgress(xpGained);
        
        return BrainBoxAPI._request({
            status: 'success',
            newTotalXp: updatedUser.xp,
            newLevel: updatedUser.level
        });
    },

    /**
     * LEADERBOARD
     */
    getLeaderboard: async (filter = 'weekly') => {
        const rankings = [
            { name: "Alex K", xp: 14200, level: 30, avatar: "a855f7" },
            { name: "Maria G", xp: 13800, level: 28, avatar: "22c55e" },
            { name: "Ben H", xp: 13100, level: 25, avatar: "6366f1" }
        ];
        return BrainBoxAPI._request(rankings);
    }
};

// Export to global scope for prototype use
window.api = BrainBoxAPI;
/**
 * BrainBox: Engaging E-Learning System
 * Course Library Logic (js/course.js)
 * Handles filtering, searching, and dynamic rendering of the course catalog.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Authentication Check
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // 2. Mock Course Data
    const allCourses = [
        {
            id: 1,
            title: "Mastering Modern JavaScript (ES6+)",
            category: "Development",
            instructor: "Alex K.",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&h=400&fit=crop",
            progress: 75,
            duration: "15 Hours",
            lessons: 48,
            status: "In Progress"
        },
        {
            id: 2,
            title: "UI Design Fundamentals & UX Research",
            category: "Design",
            instructor: "Sarah Jenkins",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1541462608141-ad4d150ee10a?w=600&h=400&fit=crop",
            progress: 0,
            duration: "12.5 Hours",
            lessons: 48,
            status: "New"
        },
        {
            id: 3,
            title: "Intro to Python for Data Science",
            category: "Development",
            instructor: "David Miller",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
            progress: 0,
            duration: "8 Hours",
            lessons: 32,
            status: "Enrolled"
        },
        {
            id: 4,
            title: "Digital Marketing & Growth Hacking",
            category: "Marketing",
            instructor: "Emma Watson",
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
            progress: 0,
            duration: "10 Hours",
            lessons: 25,
            status: "Explore"
        },
        {
            id: 5,
            title: "Advanced Financial Analysis for Startups",
            category: "Business",
            instructor: "Mark Robinson",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            progress: 0,
            duration: "14 Hours",
            lessons: 40,
            status: "Explore"
        },
        {
            id: 6,
            title: "Node.js Backend Architecture",
            category: "Development",
            instructor: "Chris Evans",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=600&h=400&fit=crop",
            progress: 0,
            duration: "18 Hours",
            lessons: 55,
            status: "New"
        }
    ];

    // 3. UI Update for User Stats
    const renderUserHeader = () => {
        const user = window.brainbox.getUser();
        const xpDisplay = document.querySelector('.text-yellow-500 + span');
        const userAvatar = document.querySelector('header img');
        
        if (xpDisplay) xpDisplay.innerText = `${user.xp.toLocaleString()} XP`;
        if (userAvatar) userAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`;
    };

    // 4. Render Course Cards
    const courseGrid = document.getElementById('course-grid');

    const renderCourses = (filter = 'All Courses', searchQuery = '') => {
        if (!courseGrid) return;
        courseGrid.innerHTML = '';

        const filtered = allCourses.filter(course => {
            const matchesCategory = filter === 'All Courses' || course.category === filter;
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            courseGrid.innerHTML = `
                <div class="col-span-full py-20 text-center">
                    <i class="fas fa-search text-4xl text-slate-200 mb-4"></i>
                    <p class="text-slate-500 font-bold">No courses found matching your criteria.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(course => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 flex flex-col group course-card';
            
            card.innerHTML = `
                <div class="relative overflow-hidden h-48">
                    <img src="${course.image}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${course.title}">
                    ${course.status !== 'Explore' ? `<div class="absolute top-4 left-4 ${course.status === 'In Progress' ? 'bg-indigo-600' : 'bg-purple-600'} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">${course.status}</div>` : ''}
                    <button class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="p-6 flex flex-grow flex-col">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-bold ${course.category === 'Design' ? 'text-purple-600 bg-purple-50' : 'text-indigo-600 bg-indigo-50'} px-2 py-1 rounded">${course.category}</span>
                        <div class="flex items-center text-yellow-500 text-xs">
                            <i class="fas fa-star mr-1"></i>
                            <span class="font-bold text-slate-700">${course.rating}</span>
                        </div>
                    </div>
                    <h3 class="text-xl font-800 text-slate-900 mb-4">${course.title}</h3>
                    <div class="flex items-center gap-3 mb-6">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=random" class="w-6 h-6 rounded-full" alt="instr">
                        <span class="text-xs font-semibold text-slate-500">${course.instructor}</span>
                    </div>
                    <div class="mt-auto">
                        ${course.progress > 0 ? `
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-[10px] font-bold text-slate-400">${course.progress}% Complete</span>
                            </div>
                            <div class="w-full bg-slate-100 h-1.5 rounded-full mb-6">
                                <div class="bg-indigo-600 h-full rounded-full" style="width: ${course.progress}%"></div>
                            </div>
                            <button class="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition resume-btn">Continue Learning</button>
                        ` : `
                            <div class="grid grid-cols-2 gap-3 mb-6">
                                <div class="flex flex-col">
                                    <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Duration</span>
                                    <span class="text-sm font-bold">${course.duration}</span>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lessons</span>
                                    <span class="text-sm font-bold">${course.lessons} Videos</span>
                                </div>
                            </div>
                            <button class="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition enroll-btn">Enroll Course</button>
                        `}
                    </div>
                </div>
            `;

            // Button actions
            const resumeBtn = card.querySelector('.resume-btn');
            const enrollBtn = card.querySelector('.enroll-btn');

            if (resumeBtn) {
                resumeBtn.onclick = () => {
                    window.brainbox.showToast(`Resuming ${course.title}...`);
                    setTimeout(() => window.location.href = 'video.html', 800);
                };
            }

            if (enrollBtn) {
                enrollBtn.onclick = () => {
                    window.brainbox.showToast(`Enrolled in ${course.title}!`, 'success');
                    // Simulation: change status and re-render
                    course.status = 'In Progress';
                    course.progress = 1;
                    renderCourses(filter, searchQuery);
                };
            }

            courseGrid.appendChild(card);
        });
    };

    // 5. Category Filtering Logic
    const categoryPills = document.querySelectorAll('.category-pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            categoryPills.forEach(p => p.classList.remove('active', 'bg-indigo-600', 'text-white'));
            pill.classList.add('active', 'bg-indigo-600', 'text-white');
            
            const category = pill.innerText;
            const searchQuery = document.getElementById('course-search')?.value || '';
            renderCourses(category, searchQuery);
        });
    });

    // 6. Search Bar Logic
    const searchInput = document.getElementById('course-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeCategory = document.querySelector('.category-pill.active')?.innerText || 'All Courses';
            renderCourses(activeCategory, e.target.value);
        });
    }

    // Initialize
    renderUserHeader();
    renderCourses();
});
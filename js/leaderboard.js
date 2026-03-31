/**
 * BrainBox: Engaging E-Learning System
 * Leaderboard Logic (js/leaderboard.js)
 * Manages ranking data, podium rendering, and time-based filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Authentication Check
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // 2. Mock Rankings Data
    const rankingsData = {
        weekly: [
            { id: 101, name: "Alex K", xp: 14200, level: 30, growth: 15, avatar: "a855f7", handle: "alex_dev" },
            { id: 102, name: "Maria G", xp: 13800, level: 28, growth: 10, avatar: "22c55e", handle: "maria_ux" },
            { id: 103, name: "Ben H", xp: 13100, level: 25, growth: 8, avatar: "6366f1", handle: "ben_codes" },
            { id: 104, name: "Sarah Lane", xp: 12100, level: 28, growth: 5, avatar: "f43f5e", handle: "sarah_l" },
            { id: 105, name: "Michael Taylor", xp: 11850, level: 25, growth: 0, avatar: "3b82f6", handle: "mike_t" },
            { id: 106, name: "Jessica Parker", xp: 10920, level: 22, growth: -2, avatar: "ec4899", handle: "jess_p" },
            { id: 107, name: "David Chen", xp: 10400, level: 24, growth: 8, avatar: "10b981", handle: "dchen" }
        ],
        monthly: [
            { id: 201, name: "Maria G", xp: 52400, level: 28, growth: 20, avatar: "22c55e", handle: "maria_ux" },
            { id: 202, name: "Alex K", xp: 51200, level: 30, growth: 12, avatar: "a855f7", handle: "alex_dev" },
            { id: 203, name: "David Chen", xp: 48900, level: 24, growth: 25, avatar: "10b981", handle: "dchen" },
            { id: 204, name: "Ben H", xp: 45000, level: 25, growth: 12, avatar: "6366f1", handle: "ben_codes" },
            { id: 205, name: "Sarah Lane", xp: 44200, level: 28, growth: 5, avatar: "f43f5e", handle: "sarah_l" }
        ],
        alltime: [
            { id: 301, name: "Alex K", xp: 450200, level: 30, growth: 2, avatar: "a855f7", handle: "alex_dev" },
            { id: 302, name: "Sarah Lane", xp: 420100, level: 28, growth: 4, avatar: "f43f5e", handle: "sarah_l" },
            { id: 303, name: "Maria G", xp: 398500, level: 28, growth: 6, avatar: "22c55e", handle: "maria_ux" },
            { id: 304, name: "Michael Taylor", xp: 380400, level: 25, growth: -1, avatar: "3b82f6", handle: "mike_t" }
        ]
    };

    // 3. UI Selectors
    const tableBody = document.querySelector('tbody');
    const podiumItems = {
        1: document.querySelector('.order-1.md\\:order-2'), // Center (Rank 1)
        2: document.querySelector('.order-2.md\\:order-1'), // Left (Rank 2)
        3: document.querySelector('.order-3.md\\:order-3')  // Right (Rank 3)
    };

    /**
     * Updates the podium visualization
     * @param {Array} topThree - Array of user objects
     */
    const updatePodium = (topThree) => {
        if (!topThree) return;

        topThree.forEach((user, index) => {
            const rank = index + 1;
            const container = podiumItems[rank];
            if (!container) return;

            const img = container.querySelector('img');
            const name = container.querySelector('p.font-bold');
            const xp = container.querySelector('p.text-indigo-600');

            if (img) img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=${user.avatar}&color=fff`;
            if (name) name.innerText = user.name;
            if (xp) xp.innerText = `${(user.xp / 1000).toFixed(1)}k XP`;
        });
    };

    /**
     * Renders the ranking table
     * @param {Array} list - Array of user objects
     */
    const renderTable = (list) => {
        if (!tableBody) return;
        tableBody.innerHTML = '';

        const currentUser = window.brainbox.getUser();

        list.forEach((user, index) => {
            const isMe = user.name === currentUser.name;
            const row = document.createElement('tr');
            row.className = `rank-row transition-colors ${isMe ? 'bg-indigo-50/30 current-user' : ''}`;
            
            const growthIcon = user.growth > 0 ? 'fa-arrow-up' : user.growth < 0 ? 'fa-arrow-down' : 'fa-minus';
            const growthClass = user.growth > 0 ? 'text-emerald-500' : user.growth < 0 ? 'text-red-400' : 'text-slate-400';

            row.innerHTML = `
                <td class="px-8 py-4">
                    <span class="text-sm font-800 ${isMe ? 'text-indigo-600' : 'text-slate-400'}">${index + 1}</span>
                </td>
                <td class="px-8 py-4">
                    <div class="user-cell flex items-center space-x-3">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=${user.avatar}&color=fff" class="w-10 h-10 rounded-xl" alt="${user.name}">
                        <div>
                            <p class="text-sm font-bold text-slate-900">${user.name} ${isMe ? '(You)' : ''}</p>
                            <p class="text-[10px] font-semibold text-slate-400">@${user.handle}</p>
                        </div>
                    </div>
                </td>
                <td class="px-8 py-4 text-sm font-bold text-slate-600">Lvl ${user.level}</td>
                <td class="px-8 py-4">
                    <span class="text-xs font-bold ${growthClass} flex items-center gap-1">
                        <i class="fas ${growthIcon}"></i> ${Math.abs(user.growth)}%
                    </span>
                </td>
                <td class="px-8 py-4 text-right font-800 ${isMe ? 'text-indigo-600' : 'text-slate-700'}">${user.xp.toLocaleString()}</td>
            `;
            
            tableBody.appendChild(row);
        });
    };

    // 4. Tab Switching Logic
    const filterTabs = document.querySelectorAll('.flex.bg-white.p-1 button');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // UI Toggle
            filterTabs.forEach(t => {
                t.classList.remove('bg-indigo-600', 'text-white');
                t.classList.add('text-slate-500', 'hover:text-indigo-600');
            });
            tab.classList.remove('text-slate-500', 'hover:text-indigo-600');
            tab.classList.add('bg-indigo-600', 'text-white');

            // Data Logic
            const filter = tab.innerText.toLowerCase().replace(' ', '');
            const data = rankingsData[filter] || rankingsData.weekly;
            
            updatePodium(data.slice(0, 3));
            renderTable(data);
            
            window.brainbox.showToast(`Showing ${tab.innerText} Rankings`, 'info');
        });
    });

    // 5. Search Functionality
    const searchInput = document.querySelector('input[placeholder*="learner"]');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const activeTabBtn = document.querySelector('button.bg-indigo-600.text-white');
            const activeTab = activeTabBtn ? activeTabBtn.innerText.toLowerCase().replace(' ', '') : 'weekly';
            
            const filtered = (rankingsData[activeTab] || []).filter(user => 
                user.name.toLowerCase().includes(query) || 
                user.handle.toLowerCase().includes(query)
            );
            
            renderTable(filtered);
        });
    }

    // 6. Initialization
    const initialData = rankingsData.weekly;
    updatePodium(initialData.slice(0, 3));
    renderTable(initialData);
});
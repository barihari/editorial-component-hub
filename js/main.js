document.addEventListener('DOMContentLoaded', () => {
    // Command+K Search Handler
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }
    });

    // Close search with Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearch();
        }
    });

    // Smooth scroll for "On this page" navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const element = document.querySelector(this.getAttribute('href'));
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

function toggleSearch() {
    const searchModal = document.getElementById('search-modal');
    searchModal.classList.toggle('hidden');
    if (!searchModal.classList.contains('hidden')) {
        searchModal.querySelector('input').focus();
    }
}

function closeSearch() {
    const searchModal = document.getElementById('search-modal');
    searchModal.classList.add('hidden');
} 
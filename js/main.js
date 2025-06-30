// Search functionality
document.addEventListener('keydown', function(e) {
    // Check if CMD+K (Mac) or CTRL+K (Windows)
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearchModal();
    }
});

// Close search modal when clicking outside
document.addEventListener('click', function(e) {
    const searchModal = document.getElementById('search-modal');
    if (e.target === searchModal) {
        searchModal.classList.add('hidden');
    }
});

function toggleSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
        modal.classList.toggle('hidden');
        if (!modal.classList.contains('hidden')) {
            modal.querySelector('input').focus();
        }
    }
}

// Horizontal tab switching (Docs/Usage)
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const docsTab = document.getElementById('docs-tab');
    const usageTab = document.getElementById('usage-tab');
    const docsView = document.getElementById('docs-view');
    const usageView = document.getElementById('usage-view');

    // BR Press and Fantasia elements
    const brPressTab = document.getElementById('br-press-tab');
    const brPressTabUsage = document.getElementById('br-press-tab-usage');
    const fantasiaTab = document.getElementById('fantasia-tab');
    const fantasiaTabUsage = document.getElementById('fantasia-tab-usage');
    const brPressContent = document.getElementById('br-press-content');
    const brPressContentUsage = document.getElementById('br-press-content-usage');
    const fantasiaContent = document.getElementById('fantasia-content');
    const fantasiaContentUsage = document.getElementById('fantasia-content-usage');
    const brPressDirectory = document.getElementById('br-press-directory');
    const brPressDirectoryUsage = document.getElementById('br-press-directory-usage');
    const blockquoteDocs = document.getElementById('blockquote-docs');
    const blockquoteUsage = document.getElementById('blockquote-usage');

    // Track current states
    let isUsageView = false;
    let currentSection = 'br-press'; // 'br-press' or 'fantasia'
    let currentComponent = null; // Track the currently viewed component

    // Docs/Usage tab switching
    docsTab.addEventListener('click', () => {
        isUsageView = false;
        docsTab.classList.add('text-gray-900', 'border-gray-900');
        docsTab.classList.remove('text-gray-500', 'border-transparent');
        usageTab.classList.remove('text-gray-900', 'border-gray-900');
        usageTab.classList.add('text-gray-500', 'border-transparent');
        docsView.classList.remove('hidden');
        usageView.classList.add('hidden');

        // If viewing a component, maintain that view
        if (currentComponent) {
            showComponentDocs(currentComponent);
        } else {
            // Otherwise show the appropriate directory
            if (currentSection === 'br-press') {
                handleBrPressTabClick(false);
            } else {
                handleFantasiaTabClick(false);
            }
        }
    });

    usageTab.addEventListener('click', () => {
        isUsageView = true;
        usageTab.classList.add('text-gray-900', 'border-gray-900');
        usageTab.classList.remove('text-gray-500', 'border-transparent');
        docsTab.classList.remove('text-gray-900', 'border-gray-900');
        docsTab.classList.add('text-gray-500', 'border-transparent');
        usageView.classList.remove('hidden');
        docsView.classList.add('hidden');

        // If viewing a component, maintain that view
        if (currentComponent) {
            showComponentDocs(currentComponent);
        } else {
            // Otherwise show the appropriate directory
            if (currentSection === 'br-press') {
                handleBrPressTabClick(true);
            } else {
                handleFantasiaTabClick(true);
            }
        }
    });

    // Function to show component documentation
    const showComponentDocs = (componentName) => {
        currentComponent = componentName; // Track current component

        // Remove active state from all sidebar links
        document.querySelectorAll('#br-press-content a, #br-press-content-usage a, #fantasia-content a, #fantasia-content-usage a').forEach(link => {
            link.classList.remove('bg-gray-100', 'text-gray-900');
            link.classList.add('text-gray-700');
        });

        // Find and activate the corresponding sidebar links in both views
        const docsLink = Array.from(document.querySelectorAll('#br-press-content a, #fantasia-content a')).find(
            link => link.textContent.trim().startsWith(componentName)
        );
        const usageLink = Array.from(document.querySelectorAll('#br-press-content-usage a, #fantasia-content-usage a')).find(
            link => link.textContent.trim().startsWith(componentName)
        );

        if (docsLink) {
            docsLink.classList.add('bg-gray-100', 'text-gray-900');
            docsLink.classList.remove('text-gray-700');
        }
        if (usageLink) {
            usageLink.classList.add('bg-gray-100', 'text-gray-900');
            usageLink.classList.remove('text-gray-700');
        }

        // Hide directories
        brPressDirectory.classList.add('hidden');
        brPressDirectoryUsage.classList.add('hidden');
        
        // Show appropriate content based on current view
        if (isUsageView) {
            blockquoteUsage.classList.remove('hidden');
            blockquoteDocs.classList.add('hidden');
        } else {
            blockquoteDocs.classList.remove('hidden');
            blockquoteUsage.classList.add('hidden');
        }
    };

    // BR Press tab click handler
    const handleBrPressTabClick = (isUsage) => {
        currentSection = 'br-press';
        currentComponent = null; // Reset current component
        const activeTab = isUsage ? brPressTabUsage : brPressTab;
        const inactiveTab = isUsage ? fantasiaTabUsage : fantasiaTab;
        
        activeTab.classList.add('text-gray-800');
        activeTab.classList.remove('text-gray-500');
        inactiveTab.classList.add('text-gray-500');
        inactiveTab.classList.remove('text-gray-800');
        
        // Show appropriate directory page, hide component pages
        if (isUsage) {
            brPressDirectoryUsage.classList.remove('hidden');
            brPressDirectory.classList.add('hidden');
            fantasiaContentUsage.classList.add('hidden');
        } else {
            brPressDirectory.classList.remove('hidden');
            brPressDirectoryUsage.classList.add('hidden');
            fantasiaContent.classList.add('hidden');
        }
        blockquoteDocs.classList.add('hidden');
        blockquoteUsage.classList.add('hidden');

        // Show BR Press content, hide Fantasia content
        if (isUsage) {
            brPressContentUsage.classList.remove('hidden');
            fantasiaContentUsage.classList.add('hidden');
        } else {
            brPressContent.classList.remove('hidden');
            fantasiaContent.classList.add('hidden');
        }
    };

    // Fantasia tab click handler
    const handleFantasiaTabClick = (isUsage) => {
        currentSection = 'fantasia';
        currentComponent = null; // Reset current component
        const activeTab = isUsage ? fantasiaTabUsage : fantasiaTab;
        const inactiveTab = isUsage ? brPressTabUsage : brPressTab;
        
        activeTab.classList.add('text-gray-800');
        activeTab.classList.remove('text-gray-500');
        inactiveTab.classList.add('text-gray-500');
        inactiveTab.classList.remove('text-gray-800');
        
        // Hide BR Press content, show Fantasia content
        if (isUsage) {
            fantasiaContentUsage.classList.remove('hidden');
            brPressContentUsage.classList.add('hidden');
            brPressDirectoryUsage.classList.add('hidden');
        } else {
            fantasiaContent.classList.remove('hidden');
            brPressContent.classList.add('hidden');
            brPressDirectory.classList.add('hidden');
        }
        blockquoteDocs.classList.add('hidden');
        blockquoteUsage.classList.add('hidden');
    };

    // Add click event listeners
    brPressTab.addEventListener('click', () => handleBrPressTabClick(false));
    brPressTabUsage.addEventListener('click', () => handleBrPressTabClick(true));
    fantasiaTab.addEventListener('click', () => handleFantasiaTabClick(false));
    fantasiaTabUsage.addEventListener('click', () => handleFantasiaTabClick(true));

    // Handle component clicks from sidebar
    const componentLinks = document.querySelectorAll('#br-press-content a, #br-press-content-usage a');
    componentLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const componentName = e.target.textContent.trim();
            showComponentDocs(componentName);
        });
    });

    // Handle component card clicks
    const componentCards = document.querySelectorAll('#br-press-directory .group, #br-press-directory-usage .group');
    componentCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const componentName = card.querySelector('h3').textContent.trim();
            showComponentDocs(componentName);
        });
    });

    // Copy shortcode functionality
    const copyButtons = ['decorative', 'default', 'styled'].map(variant => ({
        button: document.getElementById(`copy-shortcode-${variant}`),
        textSpan: document.getElementById(`copy-text-${variant}`)
    }));

    copyButtons.forEach(({button, textSpan}) => {
        if (button && textSpan) {
            button.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(`[blockquote variant="${button.dataset.variant}"]Your quote here[/blockquote]`);
                    textSpan.textContent = 'Copied!';
                    setTimeout(() => {
                        textSpan.textContent = 'Copy shortcode';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        }
    });
});

function initializeSectionSwitching() {
    // Docs view section switching
    const brPressTab = document.getElementById('br-press-tab');
    const fantasiaTab = document.getElementById('fantasia-tab');
    const brPressContent = document.getElementById('br-press-content');
    const fantasiaContent = document.getElementById('fantasia-content');

    // Usage view section switching
    const brPressTabUsage = document.getElementById('br-press-tab-usage');
    const fantasiaTabUsage = document.getElementById('fantasia-tab-usage');
    const brPressContentUsage = document.getElementById('br-press-content-usage');
    const fantasiaContentUsage = document.getElementById('fantasia-content-usage');

    // Setup Docs view switching
    if (brPressTab && fantasiaTab && brPressContent && fantasiaContent) {
        brPressTab.addEventListener('click', () => {
            brPressTab.classList.remove('text-gray-500');
            brPressTab.classList.add('text-gray-800');
            fantasiaTab.classList.remove('text-gray-800');
            fantasiaTab.classList.add('text-gray-500');

            brPressContent.classList.remove('hidden');
            fantasiaContent.classList.add('hidden');
        });

        fantasiaTab.addEventListener('click', () => {
            fantasiaTab.classList.remove('text-gray-500');
            fantasiaTab.classList.add('text-gray-800');
            brPressTab.classList.remove('text-gray-800');
            brPressTab.classList.add('text-gray-500');

            fantasiaContent.classList.remove('hidden');
            brPressContent.classList.add('hidden');
        });
    }

    // Setup Usage view switching
    if (brPressTabUsage && fantasiaTabUsage && brPressContentUsage && fantasiaContentUsage) {
        brPressTabUsage.addEventListener('click', () => {
            brPressTabUsage.classList.remove('text-gray-500');
            brPressTabUsage.classList.add('text-gray-800');
            fantasiaTabUsage.classList.remove('text-gray-800');
            fantasiaTabUsage.classList.add('text-gray-500');

            brPressContentUsage.classList.remove('hidden');
            fantasiaContentUsage.classList.add('hidden');
        });

        fantasiaTabUsage.addEventListener('click', () => {
            fantasiaTabUsage.classList.remove('text-gray-500');
            fantasiaTabUsage.classList.add('text-gray-800');
            brPressTabUsage.classList.remove('text-gray-800');
            brPressTabUsage.classList.add('text-gray-500');

            fantasiaContentUsage.classList.remove('hidden');
            brPressContentUsage.classList.add('hidden');
        });
    }
}

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

function closeSearch() {
    const searchModal = document.getElementById('search-modal');
    searchModal.classList.add('hidden');
} 
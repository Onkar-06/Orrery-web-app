//Adding logic to webpage's options
document.addEventListener('DOMContentLoaded', () => {    
    // 1. MENU INTERACTIVITY
    const hamburger = document.querySelector('.hamburger-menu');
    const dropdown = document.querySelector('.dropdown-content');

    // Toggle dropdown menu when hamburger is clicked
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up to window
        dropdown.classList.toggle('show');
    });

    // Close dropdown menu when clicking outside
    window.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

   
    // 2. SEARCH FUNCTIONALITY    
    const searchBox = document.getElementById('searchbox');
    const searchButton = document.getElementById('searchbutton');
    const resultsDiv = document.getElementById('results');

    const celestialBodies = {
        mercury: document.querySelector('.mercury'),
        venus: document.querySelector('.venus'),
        earth: document.querySelector('.earth'),
        moon: document.querySelector('.moon'),
        mars: document.querySelector('.mars'),
        jupiter: document.querySelector('.jupiter'),
        saturn: document.querySelector('.saturn'),
        uranus: document.querySelector('.uranus'),
        neptune: document.querySelector('.neptune'),
        pluto: document.querySelector('.pluto'),
        neo: document.querySelector('.neo')
    };

    // Function to capitalize the first letter
    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Handle search button click
searchButton.addEventListener('click', () => {
    const query = searchBox.value.trim().toLowerCase();
    if (celestialBodies[query]) {
        // Highlight the celestial body
        celestialBodies[query].classList.add('highlight');
        resultsDiv.textContent = `Found: ${capitalize(query)}`;
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            celestialBodies[query].classList.remove('highlight');
            resultsDiv.textContent = '';
        }, 2000);
    } else {
        resultsDiv.textContent = 'No results found.';
        resultsDiv.style.color = 'white'; // Change to your preferred color
    }
});


    // Handle Enter key for search
    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

     // 3. FILTERS FUNCTIONALITY
    const filterCheckboxes = document.querySelectorAll('.filters-content input[type="checkbox"]');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    function applyFilters() {
        const selectedFilters = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.toLowerCase());

        // Show or hide celestial bodies based on filters
        for (let body in celestialBodies) {
            const element = celestialBodies[body];
            let shouldShow = false;

            if (selectedFilters.length === 0) {
                shouldShow = true; // No filters selected, show all
            } else {
                switch(body) {
                    case 'mercury':
                    case 'venus':
                    case 'earth':
                    case 'mars':
                    case 'jupiter':
                    case 'saturn':
                    case 'uranus':
                    case 'neptune':
                    case 'pluto':
                        if (selectedFilters.includes('planets')) shouldShow = true;
                        break;
                    case 'moon':
                    case 'neo':
                        if (selectedFilters.includes('satellites')) shouldShow = true;
                        break;
                    // Add more cases if needed
                }

                // Additional filters
                if (selectedFilters.includes('asteroids') && body === 'asteroids') shouldShow = true;
                if (selectedFilters.includes('comets') && body === 'comets') shouldShow = true;
                if (selectedFilters.includes('orbits')) shouldShow = true;
                if (selectedFilters.includes('stars')) shouldShow = true;
            }

            // Apply the visibility
            if (shouldShow) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        }
    }

   
// 4. FUNCTION KEYS INTERACTIVITY    
    const functionKeys = document.querySelectorAll('.functionkeys .keys');

    functionKeys.forEach(key => {
        key.addEventListener('click', () => {
            const action = key.textContent.trim();
            switch(action) {
                case '⛶':
                    toggleFullscreen();
                    break;
                case '🗖':
                    resetView();
                    break;
                case '+':
                    zoom(1.2);
                    break;
                case '-':
                    zoom(0.8);
                    break;
                case '👁':
                    toggleOrbits();
                    break;
                default:
                    break;
            }
        });
    });

    // Fullscreen Toggle Function
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                // Optionally, add an active class or any other visual feedback
                const fullscreenButton = document.getElementById('fullscreenButton');
                if (fullscreenButton) {
                    fullscreenButton.classList.add('active');
                }
            }).catch(err => {
                alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen().then(() => {
                // Optionally, remove the active class or any other visual feedback
                const fullscreenButton = document.getElementById('fullscreenButton');
                if (fullscreenButton) {
                    fullscreenButton.classList.remove('active');
                }
            }).catch(err => {
                alert(`Error attempting to disable fullscreen mode: ${err.message} (${err.name})`);
            });
        }
    }

    // Reset View Function
    function resetView() {
        const container = document.querySelector('.container');
        if (container) {
            container.style.transform = 'scale(1)';
        }
    }

    // Zoom Function
    function zoom(factor) {
        const container = document.querySelector('.container');
        if (container) {
            const currentTransform = window.getComputedStyle(container).transform;
            let currentScale = 1; // Default scale

            if (currentTransform && currentTransform !== 'none') {
                const matrix = new WebKitCSSMatrix(currentTransform);
                currentScale = matrix.a; 
            }

            const newScale = currentScale * factor;
            container.style.transform = `scale(${newScale})`;
        }
    }

    // Toggle Orbits Function
    function toggleOrbits() {
        const orbits = document.querySelectorAll('.container > div');
        orbits.forEach(element => {
            element.classList.toggle('hide-orbits');
        });
    }

    
    // 5. OPTIONAL: GRID TOGGLE STYLE    
    const style = document.createElement('style');
    style.innerHTML = `
        .show-grid::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            pointer-events: none;
            z-index: -1;
        }
        .hide-orbits::before {
            display: none;
        }
    `;
    document.head.appendChild(style);

//fullscreen changes
    document.addEventListener('fullscreenchange', () => {
        const fullscreenButton = document.getElementById('fullscreenButton');
        if (!document.fullscreenElement) {
            if (fullscreenButton) {
                fullscreenButton.classList.remove('active');
            }
        } else {
            if (fullscreenButton) {
                fullscreenButton.classList.add('active');
            }
        }
    });

    
});

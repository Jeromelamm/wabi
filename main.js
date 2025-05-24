// Main JavaScript file for the interactive love story experience
// Track current section for navigation
let currentSection = 'landing';
let previousMemorySection = 'initial-memory-lane';
        
// Audio elements
const backgroundMusic = document.getElementById('background-music');
let isMusicPlaying = false;
let playerContainer = null;
let songItems = null;
        
function setupVolumeControl() {
    // Create volume control container
    const volumeControl = document.createElement('div');
    volumeControl.className = 'volume-control';
    volumeControl.innerHTML = `
        <div class="volume-slider-container">
            <input type="range" min="0" max="100" value="30" class="volume-slider" id="volume-slider">
            <div class="volume-level">30%</div>
        </div>
    `;
    
    // Add it next to audio control
    const audioControl = document.querySelector('.audio-control');
    document.body.appendChild(volumeControl);
    
    // Position it near the audio control
    function positionVolumeControl() {
        const audioRect = audioControl.getBoundingClientRect();
        volumeControl.style.bottom = (window.innerHeight - audioRect.top + 10) + 'px';
        volumeControl.style.right = (window.innerWidth - audioRect.right + 70) + 'px';
    }
    
    positionVolumeControl();
    window.addEventListener('resize', positionVolumeControl);
    
    // Initially hide it
    volumeControl.style.display = 'none';
    
    // Toggle volume control when audio control is right-clicked or long-pressed
    let longPressTimer;
    
    audioControl.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        toggleVolumeControl();
    });
    
    audioControl.addEventListener('touchstart', function() {
        longPressTimer = setTimeout(function() {
            toggleVolumeControl();
        }, 800); // Long press time in ms
    });
    
    audioControl.addEventListener('touchend', function() {
        clearTimeout(longPressTimer);
    });
    
    // Function to toggle volume control visibility
    function toggleVolumeControl() {
        if (volumeControl.style.display === 'none') {
            volumeControl.style.display = 'block';
            // Show a hint about how to use
            showSpeechBubble(audioControl, 'Adjust volume!');
        } else {
            volumeControl.style.display = 'none';
        }
    }
    
    // Handle volume changes
    const volumeSlider = document.getElementById('volume-slider');
    const volumeLevel = document.querySelector('.volume-level');
    
    volumeSlider.addEventListener('input', function() {
        const volumeValue = this.value / 100;
        backgroundMusic.volume = volumeValue;
        volumeLevel.textContent = this.value + '%';
        
        // Also adjust sound effect volumes proportionally
        window.soundEffectVolume = volumeValue;
    });
    }
        
        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize loading screen
            const loadingScreen = document.querySelector('.loading-screen');
            const loadingHeart = document.querySelector('.loading-heart');
            
            // Skip loading on click
            loadingHeart.addEventListener('click', function() {
                hideLoadingScreen();
            });

            setupVolumeControl();
            
            // Auto hide loading screen after 3 seconds
            setTimeout(hideLoadingScreen, 3000);
            
            // Setup love meter animation
            animateLoveMeter();
            
            // Setup floating hearts
            createFloatingHearts();
            
            // Show navigation helper after a delay
            setTimeout(function() {
                document.querySelector('.navigation-helper').classList.add('show');
                
                // Hide navigation helper after 5 seconds
                setTimeout(function() {
                    document.querySelector('.navigation-helper').classList.remove('show');
                }, 20000);
            }, 5000);
            
            // Highlight the heart after a delay if no interaction
            setTimeout(function() {
                if (currentSection === 'landing') {
                    document.getElementById('landing-heart').classList.add('highlight-heart');
                    // Add speech bubble
                    showSpeechBubble(document.getElementById('landing-heart'), 'Click me!');
                }
            }, 8000);
            
            // Custom cursor setup
            const customCursor = document.querySelector('.custom-cursor');
            document.addEventListener('mousemove', function(e) {
                customCursor.style.display = 'block';
                customCursor.style.left = e.clientX + 'px';
                customCursor.style.top = e.clientY + 'px';
            });
        });
        
        // Hide loading screen
        function hideLoadingScreen() {
            const loadingScreen = document.querySelector('.loading-screen');
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        // Create floating hearts background
        function createFloatingHearts() {
            const container = document.getElementById('floating-hearts-container');
            const heartSizes = ['1rem', '1.5rem', '2rem', '2.5rem'];
            const heartCount = 20;
            
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.bottom = '-2rem';
                heart.style.fontSize = heartSizes[Math.floor(Math.random() * heartSizes.length)];
                heart.style.animationDuration = 15 + Math.random() * 30 + 's';
                heart.style.animationDelay = Math.random() * 5 + 's';
                heart.style.opacity = 0.1 + Math.random() * 0.3;
                heart.style.transform = `scale(${0.5 + Math.random() * 0.5})`;
                container.appendChild(heart);
            }
        }
        
        // Navigation function - Show a specific section
        function showSection(sectionId) {
            // Hide current section
            document.getElementById(currentSection).classList.remove('active');
            
            // Show new section
            document.getElementById(sectionId).classList.add('active');
            
            // Update current section
            currentSection = sectionId;
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
        
        // Show memory detail page
        function showMemoryDetail(memoryId) {
            // Hide current section
            document.getElementById(currentSection).classList.remove('active');
            
            // Remember previous section for back button
            previousMemorySection = currentSection;
            
            // Show memory detail page
            document.getElementById(memoryId).classList.add('active');
            
            // Update current section
            currentSection = memoryId;
            
            // Scroll to top
            window.scrollTo(0, 0);
        }

function showMemoryDetailWithCustomBack(memoryId, backDestination) {
    // Simple version - just use the existing showMemoryDetail logic
    showMemoryDetail(memoryId);
    
    // Override the back destination
    previousMemorySection = backDestination;
}
        
        // Go back to memory lane
        function goBackToMemoryLane() {
            // Hide current section
            document.getElementById(currentSection).classList.remove('active');
            
            // Show memory lane section
            document.getElementById(previousMemorySection).classList.add('active');
            
            // Update current section
            currentSection = previousMemorySection;
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
        
        // Heart click effect
        function heartClickEffect(event) {
            // Remove highlight and speech bubble if present
            event.target.classList.remove('highlight-heart');
            const bubble = event.target.querySelector('.speech-bubble');
            if (bubble) bubble.remove();
            
            // Create mini hearts burst effect
            for (let i = 0; i < 10; i++) {
                createMiniHeart(event.clientX, event.clientY);
            }
            
            // Navigate to next section
            if (currentSection === 'landing') {
                showSection('initial-memory-lane');
                playHeartbeatSound();
            } else {
                createRainbowHearts();
            }
        }
        
        // Create mini heart for burst effect
        function createMiniHeart(x, y) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = Math.random() * 1 + 0.5 + 'rem';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const duration = Math.random() * 1 + 0.5;
            
            heart.style.transition = `all ${duration}s ease-out`;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
                heart.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                document.body.removeChild(heart);
            }, duration * 1000);
        }
        
        // Create rainbow hearts animation
        function createRainbowHearts() {
            const colors = ['#ff6b6b', '#4ecdc4', '#f9d423', '#fc913a', '#a696c8'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.innerText = '❤';
                    heart.style.position = 'fixed';
                    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
                    heart.style.left = Math.random() * 100 + 'vw';
                    heart.style.top = '100vh';
                    heart.style.fontSize = Math.random() * 2 + 1 + 'rem';
                    heart.style.zIndex = '1000';
                    heart.style.pointerEvents = 'none';
                    
                    const animation = heart.animate([
                        { transform: 'translateY(0)', opacity: 1 },
                        { transform: `translateY(-${100 + Math.random() * 200}vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                    ], {
                        duration: 4000 + Math.random() * 3000,
                        easing: 'cubic-bezier(0.1, 0.8, 0.9, 0.2)'
                    });
                    
                    document.body.appendChild(heart);
                    
                    animation.onfinish = () => {
                        document.body.removeChild(heart);
                    };
                }, i * 100);
            }
            
            playSpecialSound();
        }
        
        // Toggle background music
        function toggleAudio() {
            if (isMusicPlaying) {
                backgroundMusic.pause();
                document.querySelector('.audio-icon').innerHTML = '♪';
            } else {
                backgroundMusic.play();
                document.querySelector('.audio-icon').innerHTML = '♫';
            }
            isMusicPlaying = !isMusicPlaying;
        }
        
        // Play sound effects
        // Make sure playButtonSound is properly defined
function playButtonSound() {
    try {
        const audio = new Audio('https://assets.codepen.io/4358584/click1.mp3');
        audio.volume = (window.soundEffectVolume || 0.7) * 0.6;
        audio.play().catch(e => console.log("Button sound prevented:", e));
    } catch (e) {
        console.log("Could not play button sound:", e);
    }
}

        function playHeartbeatSound() {
            const audio = new Audio('https://assets.codepen.io/4358584/heartbeat.mp3');
            audio.volume = soundEffectVolume * 0.8; // Slightly quieter
            audio.play().catch(e => console.log("Heartbeat sound prevented:", e));
        }

        function playSpecialSound() {
            const audio = new Audio('https://assets.codepen.io/4358584/success.mp3');
            audio.volume = soundEffectVolume; // Use the global volume setting
            audio.play().catch(e => console.log("Special sound prevented:", e));
        }
        
        // Animate love meter
        function animateLoveMeter() {
            const loveFill = document.getElementById('love-fill');
            const lovePercentage = document.getElementById('love-percentage');
            
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                } else {
                    width++;
                    loveFill.style.width = width + '%';
                    lovePercentage.textContent = width + '%';
                    
                    if (width > 50) {
                        lovePercentage.style.color = 'white';
                    }
                }
            }, 20);
        }
        
        // Tilt card effect
        function tiltCard(event, card) {
            const cardRect = card.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            
            const maxRotation = 15;
            
            const rotateX = ((centerY - mouseY) / (cardRect.height / 2)) * maxRotation;
            const rotateY = ((mouseX - centerX) / (cardRect.width / 2)) * maxRotation;
            
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        }
        
        function resetTilt(card) {
            card.style.transform = 'rotateX(0) rotateY(0) translateY(-10px)';
        }
        
        
        function closeModal() {
            document.getElementById('image-modal').style.display = 'none';
        }
        

        // Function to add date bubbles to all memories
document.addEventListener('DOMContentLoaded', function() {
    // Date data for all memories
    const memoryDates = {
        // Initial memory lane
        'first-taym': 'May 2022',
        'second-taym': 'August 2022',
        'third-taym': 'November/December 2022',
        'bohol': 'March 2023',
        'fourth-taym': 'May 2023',
        'fifth-taym': 'July/August 2023',
        'bohol2': 'October 2023',
        'sixth-taym': 'January 2024',
        'thailand': 'February 2024',
        'tswift': 'March 2024',
        'seventh': 'June 2024',
        'vietnam': 'June 2024',
        'danang': 'June 2024',
        'sg8': 'June 2024',
        'krabi': 'July 2024',
        'sg9': 'August 2024',
        'bangkok': 'August 2024',
        'sg10': 'August 2024',
        'sg11': 'October 2024',
        'sg12': 'December 2024',
        'el-nido': 'January 2024',
        'bohol3': 'January 2024',
        'sg13': 'March 2024',
        'hanoi': 'March 2024',
        'sapa': 'March 2024',
        'sg14': 'April 2024',
        
        // Additional memories in memory lane
        'first-kiss': 'Summer 2022',
        'anniversary': 'Spring 2023',
        'support': 'Fall 2023',
        'celebration': 'Winter 2023',
        'roadtrip': 'Spring 2024'
    };
    
    // Add date bubbles to initial memory lane
    const initialMemoryItems = document.querySelectorAll('#initial-memory-lane .memory-item');
    initialMemoryItems.forEach(item => {
        // Find which memory this is by checking the onclick attribute of its button
        const button = item.querySelector('.memory-btn');
        if (button) {
            const onclickText = button.getAttribute('onclick');
            // Extract memory ID from the onclick text
            const matches = onclickText.match(/showMemoryDetail\('(.+?)'\)/);
            if (matches && matches[1]) {
                const memoryId = matches[1];
                const date = memoryDates[memoryId];
                
                if (date) {
                    // Create date bubble
                    const dateBubble = document.createElement('div');
                    dateBubble.className = 'date-bubble';
                    dateBubble.textContent = date;
                    
                    // Insert at the beginning of the memory item
                    item.insertBefore(dateBubble, item.firstChild);
                }
            }
        }
    });
    
    // Add date bubbles to year-based memories
    const yearSections = ['year-2022', 'year-2023', 'year-2024', 'year-2025'];
    yearSections.forEach(yearId => {
        const memoryItems = document.querySelectorAll(`#${yearId} .memory-item`);
        memoryItems.forEach(item => {
            // Similar approach as above
            const button = item.querySelector('.memory-btn');
            if (button) {
                const onclickText = button.getAttribute('onclick');
                const matches = onclickText.match(/showMemoryDetail\('(.+?)'\)/);
                if (matches && matches[1]) {
                    const memoryId = matches[1];
                    const date = memoryDates[memoryId];
                    
                    if (date) {
                        // For year sections, just show the month
                        const month = date.split(' ')[0];
                        
                        // Create date bubble
                        const dateBubble = document.createElement('div');
                        dateBubble.className = 'date-bubble';
                        dateBubble.textContent = month;
                        
                        // Insert at the beginning of the memory item
                        item.insertBefore(dateBubble, item.firstChild);
                    }
                }
            }
        });
    });
    
    // Add date headers to memory detail pages
    for (const [memoryId, date] of Object.entries(memoryDates)) {
        const detailPage = document.getElementById(memoryId);
        if (detailPage && detailPage.classList.contains('memory-detail-page')) {
            const heading = detailPage.querySelector('h1');
            if (heading) {
                // Create date header
                const dateHeader = document.createElement('div');
                dateHeader.className = 'memory-header-date';
                dateHeader.textContent = date;
                
                // Insert after the heading
                heading.parentNode.insertBefore(dateHeader, heading.nextSibling);
            }
        }
    }
});
        
        // Show proposal section
        function showProposalSection() {
            showSection('proposal');
            createConfetti();
        }
        
        // Start proposal experience
        function startProposal() {
            showSection('memory-lane');
        }
        
        // Show yes response
        function showYesResponse() {
            document.getElementById('yes-response').classList.remove('hidden');
            document.querySelector('#proposal .btn-container').classList.add('hidden');
            createConfetti();
        }
        
        // Show no response
        function showNoResponse() {
            document.getElementById('no-response').classList.remove('hidden');
            document.querySelector('#proposal .btn-container').classList.add('hidden');
        }
        
        // Reset proposal
        function resetProposal() {
            document.getElementById('no-response').classList.add('hidden');
            document.querySelector('#proposal .btn-container').classList.remove('hidden');
        }
        
        // Create confetti
        function createConfetti() {
            const container = document.getElementById('confetti-container');
            const colors = ['#ff6b6b', '#4ecdc4', '#f9d423', '#fc913a', '#a696c8', '#ffffff'];
            const confettiCount = 200;
            
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                confetti.style.opacity = Math.random() + 0.5;
                confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
                
                container.appendChild(confetti);
                
                // Remove confetti after animation completes
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }
        }
        
        // Dream hover effect
        function dreamHover(dreamElement) {
            dreamElement.style.transform = 'scale(1.05)';
            dreamElement.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
            
            setTimeout(() => {
                dreamElement.style.transform = 'scale(1)';
                dreamElement.style.boxShadow = 'none';
            }, 500);
        }
        
        // Play video
        function playVideo(videoId) {
            // This would normally create a video modal, but we're using placeholders
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-img');
            
            modalImg.src = '/api/placeholder/800/450';
            modal.style.display = 'flex';
        }
        
        // Show speech bubble
        function showSpeechBubble(element, text) {
            // Remove existing bubbles
            const existingBubble = element.querySelector('.speech-bubble');
            if (existingBubble) existingBubble.remove();
            
            const bubble = document.createElement('div');
            bubble.className = 'speech-bubble';
            bubble.textContent = text;
            bubble.style.opacity = '0';
            element.appendChild(bubble);
            
            setTimeout(() => {
                bubble.style.opacity = '1';
                bubble.style.transform = 'translateX(-50%) translateY(0)';
            }, 10);
            
            setTimeout(() => {
                bubble.style.opacity = '0';
                bubble.style.transform = 'translateX(-50%) translateY(10px)';
                
                setTimeout(() => {
                    if (bubble.parentNode === element) {
                        element.removeChild(bubble);
                    }
                }, 300);
            }, 3000);
        }

        // Add these functions to your existing JavaScript

// Update the showSection function to handle the year navigation
function showSection(sectionId) {
    // Hide current section
    document.getElementById(currentSection).classList.remove('active');
    
    // Show new section
    document.getElementById(sectionId).classList.add('active');
    
    // Update current section
    currentSection = sectionId;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Play transition sound
    if (sectionId.startsWith('year-')) {
        playSpecialSound();
    } else {
        playButtonSound();
    }
}

// Function to navigate from memory detail back to the correct year
function goBackToYear(yearId) {
    // Hide current section
    document.getElementById(currentSection).classList.remove('active');
    
    // Show year section
    document.getElementById(yearId).classList.add('active');
    
    // Update current section
    currentSection = yearId;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Play button sound
    playButtonSound();
}

// Update the landing page navigation to include the year selection option
function updateInitialNavigation() {
    // Add a button to the landing section to navigate to years
    const landingSection = document.getElementById('landing');
    const btnContainer = landingSection.querySelector('.btn-container') || landingSection;
    
    const yearsButton = document.createElement('button');
    yearsButton.className = 'btn btn-3d';
    yearsButton.textContent = 'Browse Memowies by Yeaw!';
    yearsButton.onclick = function() { showSection('year-selection'); };
    
    // Add the button to the landing page
    btnContainer.appendChild(yearsButton);
}


 // Check password function with direct song selection and album art update
function checkPassword() {
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Check if password is correct (matching 18/08/2021)
    if (password === '18/08/2021' || password === '18/8/2021') {
        // Show the special message section
        document.getElementById('special-section').classList.remove('active');
        document.getElementById('special-message').classList.add('active');
        
        // Update current section
        previousSection = currentSection;
        currentSection = 'special-message';
        
        // Create celebratory confetti
        createConfetti();
        
        // Play specifically CAS - Opera House
        const backgroundMusic = document.getElementById('background-music');
        if (backgroundMusic) {
            // Set the source directly to Opera House
            backgroundMusic.src = "Opera House.mp3"; // Make sure this matches the actual file path
            
            // Play the music
            backgroundMusic.play().then(() => {
                // Update the audio control icon if needed
                const audioIcon = document.querySelector('.audio-icon');
                if (audioIcon) audioIcon.innerHTML = '♫';
                
                // Flag that music is playing
                window.isMusicPlaying = true;
                
                // Add any heart animation class if it exists
                const audioHeart = document.querySelector('.audio-heart');
                if (audioHeart) audioHeart.classList.add('beating');
                
                // Update tooltip if it exists
                const audioTooltip = document.querySelector('.audio-tooltip');
                if (audioTooltip) audioTooltip.textContent = 'Pause Our Song';
            }).catch(error => {
                console.error("Error playing music:", error);
            });
            
            // Try to update music player UI if it exists
            try {
                // Update song title display if it exists
                const songTitle = document.querySelector('.song-title');
                if (songTitle) songTitle.textContent = "CAS - Opera House";
                
                // Update album art
                const albumImg = document.querySelector('.album-cover-img');
                const albumFallback = document.querySelector('.album-fallback');
                
                if (albumImg) {
                    // Set src to CAS album art
                    albumImg.src = 'covers/CAS.jpg'; // Make sure this path is correct
                    albumImg.style.display = 'block';
                    
                    // Handle image loading errors
                    albumImg.onerror = function() {
                        albumImg.style.display = 'none';
                        if (albumFallback) albumFallback.style.display = 'flex';
                        console.log(`Failed to load album art for CAS - Opera House`);
                    };
                    
                    // Hide fallback if it exists
                    if (albumFallback) albumFallback.style.display = 'none';
                }
                
                // Update active song in playlist if it exists
                const songItems = document.querySelectorAll('.song-item');
                if (songItems && songItems.length > 0) {
                    songItems.forEach((item, i) => {
                        if (i === 1) { // Index 1 is CAS - Opera House
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
                
                // Reset progress bar if it exists
                const progressFill = document.querySelector('.progress-fill');
                if (progressFill) progressFill.style.width = '0%';
                
                // Update time displays if they exist
                const currentTimeDisplay = document.querySelector('.current-time');
                if (currentTimeDisplay) currentTimeDisplay.textContent = '0:00';
                
                const totalTimeDisplay = document.querySelector('.total-time');
                if (totalTimeDisplay) totalTimeDisplay.textContent = '6:05'; // Duration of Opera House
                
                // Update play/pause button icons if they exist
                const playIcon = document.querySelector('.play-icon');
                const pauseIcon = document.querySelector('.pause-icon');
                if (playIcon && pauseIcon) {
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');
                }
                
                // Update current song index if it's a global variable
                if (typeof window.currentSongIndex !== 'undefined') {
                    window.currentSongIndex = 1;
                }
                
                // If we have direct access to the loadSong function, use it as a backup
                if (typeof window.loadSong === 'function') {
                    try {
                        window.loadSong(1); // Try to load song at index 1 (CAS - Opera House)
                    } catch (loadErr) {
                        console.log("Could not use loadSong function:", loadErr);
                        // We've already handled UI updates manually, so this is just a backup
                    }
                }
            } catch (err) {
                console.log("Non-critical UI update error:", err);
                // Continue even if UI updates fail
            }
        }
    } else {
        // Show error message
        errorMessage.style.display = 'block';
        
        // Shake the form to indicate error
        const form = document.querySelector('.special-message-box');
        form.style.animation = 'none';
        setTimeout(() => {
            form.style.animation = 'shake 0.5s';
        }, 10);
    }
}
        
        // Add shake animation for incorrect password
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                    20%, 40%, 60%, 80% { transform: translateX(10px); }
                }
            </style>
        `);



const playlist = [
    { 
        title: "Ruth B. - Dandelions",
        src: "Ruth B. - Dandelions (Lyrics).mp3",
        cover: "covers/dandelions.jpg",
        duration: "3:48"
    },
    { 
        title: "Sofia Mills - Coffee Breath",
        src: "coffee-breath.mp3",
        cover: "covers/coffee-breath.png",
        duration: "2:42"
    },
    { 
        title: "CAS - Opera House",
        src: "Opera House.mp3",
        cover: "covers/CAS.jpg",
        duration: "6:05" 
    },
    { 
        title: "The Marias - No one noticed",
        src: "no-one-noticed.mp3",
        cover: "covers/no-one-noticed.jpg",
        duration: "3:48"
    },
    { 
        title: "Christina Perri - A Thousand Years",
        src: "a-thousand-years.mp3",
        cover: "covers/thousand-years.jpg",
        duration: "4:46"
    },
    { 
        title: "John Legend - All of Me",
        src: "all-of-me.mp3",
        cover: "covers/all-of-me.jpg",
        duration: "4:30"
    },
    { 
        title: "beabadoobee - Glue Song ft. Clairo",
        src: "glue-song.mp3",
        cover: "covers/glue-song.jpg",
        duration: "2:17"
    },
    { 
        title: "Sombr - Back to friends",
        src: "back-to-friends.mp3",
        cover: "covers/BTF.jpeg",
        duration: "3:18"
    }
];

// Current song index
let currentSongIndex = 0;
let isPlayerVisible = false;

// Create the music player elements
function createMusicPlayer() {
    // Update player styling to better match the website theme
    const playerContainer = document.createElement('div');
    playerContainer.className = 'music-player';
    playerContainer.innerHTML = `
        <div class="player-header">
            <span class="player-title">Songs that are dedicated to you ❤️</span>
            <button class="close-player">×</button>
        </div>
        <div class="now-playing">
            <img class="album-cover-img" style="width: 100%; height: 100%; object-fit: cover; display: none;">
            </div>
            <div class="song-info">
                <div class="song-title">Ruth B. - Dandelions</div>
                <div class="song-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="time-info">
                        <span class="current-time">0:00</span>
                        <span class="total-time">3:30</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="player-controls">
            <button class="control-btn prev-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
            </button>
            <button class="control-btn play-btn">
                <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <svg class="pause-icon hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            </button>
            <button class="control-btn next-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
            </button>
        </div>
        <!-- NEW: Volume control slider section -->
        <div class="volume-control-container">
            <div class="volume-icon-wrapper">
                <svg class="volume-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path class="volume-wave" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path class="volume-wave" d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
            </div>
            <div class="volume-slider-container">
                <input type="range" min="0" max="100" value="70" class="volume-slider" id="volume-slider">
                <div class="volume-level">70%</div>
            </div>
        </div>
        <div class="playlist-section">
            <ul class="songs-list"></ul>
        </div>
    `;
    
    document.body.appendChild(playerContainer);
    
    // Create the audio toggle button - make it heart shaped to match the site's theme
    const audioToggle = document.createElement('div');
    audioToggle.className = 'audio-control';
    audioToggle.innerHTML = `
        <div class="audio-heart">❤️</div>
        <div class="audio-tooltip">Play Our Song</div>
    `;
    document.body.appendChild(audioToggle);
    
    // Populate the playlist
    const songsList = playerContainer.querySelector('.songs-list');
    playlist.forEach((song, index) => {
        const songElement = document.createElement('li');
        songElement.className = index === 0 ? 'song-item active' : 'song-item';
        songElement.dataset.index = index;
        songElement.innerHTML = `
            <div class="song-item-info">
                <span class="song-number">${index + 1}</span>
                <span class="song-title">${song.title}</span>
            </div>
            <span class="song-duration">${song.duration}</span>
        `;
        songsList.appendChild(songElement);
    });
    
    return { playerContainer, audioToggle };
}

// Initialize the player and set up event listeners
function initMusicPlayer() {
    const { playerContainer: container, audioToggle } = createMusicPlayer();
    playerContainer = container; // Store globally
    const backgroundMusic = document.getElementById('background-music');
    const progressFill = playerContainer.querySelector('.progress-fill');
    const currentTimeDisplay = playerContainer.querySelector('.current-time');
    const totalTimeDisplay = playerContainer.querySelector('.total-time');
    const volumeSlider = playerContainer.querySelector('#volume-slider');
    const volumeLevel = playerContainer.querySelector('.volume-level');
    songItems = playerContainer.querySelectorAll('.song-item'); // Store globally
    const volumeIcon = playerContainer.querySelector('.volume-icon');
    
    // Set initial state
    playerContainer.style.display = 'none';
    
    // Add close button functionality
    playerContainer.querySelector('.close-player').addEventListener('click', () => {
        playerContainer.style.animation = 'slideOutRight 0.3s forwards';
        setTimeout(() => {
            playerContainer.style.display = 'none';
            isPlayerVisible = false;
        }, 300);
    });
    
// Toggle player visibility
    audioToggle.addEventListener('click', () => {
        isPlayerVisible = !isPlayerVisible;
        
        if (isPlayerVisible) {
            playerContainer.style.display = 'block';
            playerContainer.style.animation = 'slideInRight 0.3s forwards';
        } else {
            toggleAudio(); // Toggle music play/pause when clicking the heart directly
        }
    });
    
    // Play/Pause button
    const playBtn = playerContainer.querySelector('.play-btn');
    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');
    
    playBtn.addEventListener('click', () => {
        toggleAudio();
    });
    
// Function to toggle audio playing state
    function toggleAudio() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            audioToggle.querySelector('.audio-heart').classList.remove('beating');
            audioToggle.querySelector('.audio-tooltip').textContent = 'Play Our Song';
        } else {
            backgroundMusic.play();
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            audioToggle.querySelector('.audio-heart').classList.add('beating');
            audioToggle.querySelector('.audio-tooltip').textContent = 'Pause Our Song';
        }
        isMusicPlaying = !isMusicPlaying;
    }
    
    // Next button
    playerContainer.querySelector('.next-btn').addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
    });
    
    // Previous button
    playerContainer.querySelector('.prev-btn').addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
    });
    
// Song progress
    backgroundMusic.addEventListener('timeupdate', () => {
        const currentTime = backgroundMusic.currentTime;
        const duration = backgroundMusic.duration || 1;
        const progressPercent = (currentTime / duration) * 100;
        
        progressFill.style.width = `${progressPercent}%`;
        
        // Update time displays
        currentTimeDisplay.textContent = formatTime(currentTime);
        if (!isNaN(duration)) {
            totalTimeDisplay.textContent = formatTime(duration);
        }
    });
    
// Click on progress bar to seek
    playerContainer.querySelector('.progress-bar').addEventListener('click', (e) => {
        const progressBar = e.currentTarget;
        const clickPosition = e.offsetX;
        const totalWidth = progressBar.offsetWidth;
        const seekPercentage = clickPosition / totalWidth;
        
        if (backgroundMusic.duration) {
            backgroundMusic.currentTime = seekPercentage * backgroundMusic.duration;
        }
    });
    
 // Volume control
    volumeSlider.addEventListener('input', function() {
        const volumeValue = this.value / 100;
        backgroundMusic.volume = volumeValue;
        volumeLevel.textContent = `${this.value}%`;
        
        // Update the slider's filled portion using CSS variable
        this.style.setProperty('--volume-percent', `${this.value}%`);
        
        // Also adjust sound effect volumes proportionally
        window.soundEffectVolume = volumeValue;
        
        // Update volume icon based on volume level
        updateVolumeIcon(volumeValue);
    });
    
 // Set initial volume slider filled portion
    volumeSlider.style.setProperty('--volume-percent', `${volumeSlider.value}%`);
    
    // Volume icon click to toggle mute
    volumeIcon.addEventListener('click', () => {
        if (backgroundMusic.volume > 0) {
            // Store current volume before muting
            volumeIcon.dataset.prevVolume = backgroundMusic.volume;
            backgroundMusic.volume = 0;
            volumeSlider.value = 0;
            volumeSlider.style.setProperty('--volume-percent', '0%');
            volumeLevel.textContent = "0%";
            updateVolumeIcon(0);
        } else {
            // Restore previous volume
            const prevVolume = parseFloat(volumeIcon.dataset.prevVolume || 0.7);
            backgroundMusic.volume = prevVolume;
            volumeSlider.value = prevVolume * 100;
            volumeSlider.style.setProperty('--volume-percent', `${prevVolume * 100}%`);
            volumeLevel.textContent = `${Math.round(prevVolume * 100)}%`;
            updateVolumeIcon(prevVolume);
        }
    });
    
    // Clicking on a playlist item
    songItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            if (index !== currentSongIndex) {
                currentSongIndex = index;
                loadSong(currentSongIndex);
            }
        });
    });
    
    // Initial song load
    loadSong(currentSongIndex);
    
 // Function to update volume icon based on volume level
    function updateVolumeIcon(volume) {
        const volumeWaves = volumeIcon.querySelectorAll('.volume-wave');
        
        if (volume === 0) {
            volumeIcon.classList.add('muted');
            volumeWaves.forEach(wave => wave.style.display = 'none');
        } else {
            volumeIcon.classList.remove('muted');
            
            if (volume < 0.3) {
                volumeWaves[0].style.display = 'none';
                volumeWaves[1].style.display = 'none';
            } else if (volume < 0.7) {
                volumeWaves[0].style.display = '';
                volumeWaves[1].style.display = 'none';
            } else {
                volumeWaves[0].style.display = '';
                volumeWaves[1].style.display = '';
            }
        }
    }
    
    // Set initial volume icon state
    updateVolumeIcon(backgroundMusic.volume);

    // Format time in MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Return the control elements for further customization if needed
    return {
        playerContainer,
        audioToggle,
        backgroundMusic,
        volumeSlider
    };

    
// Updated loadSong function - now it can access the global songItems
function loadSong(index) {
    const song = playlist[index];
    const backgroundMusic = document.getElementById('background-music');
    
    backgroundMusic.src = song.src;
    
    // Update song title if player exists
    if (playerContainer) {
        playerContainer.querySelector('.song-title').textContent = song.title;
        
        // Update album art
        const albumImg = playerContainer.querySelector('.album-cover-img');
        const albumFallback = playerContainer.querySelector('.album-fallback');
        
        if (song.cover) {
            albumImg.src = song.cover;
            albumImg.style.display = 'block';
            if (albumFallback) albumFallback.style.display = 'none';
            
            // Handle image loading errors
            albumImg.onerror = function() {
                albumImg.style.display = 'none';
                if (albumFallback) albumFallback.style.display = 'flex';
                console.log(`Failed to load album art for: ${song.title}`);
            };
        } else {
            albumImg.style.display = 'none';
            if (albumFallback) albumFallback.style.display = 'flex';
        }
        
        // Update active song in playlist - THIS IS THE KEY FIX
        if (songItems && songItems.length > 0) {
            songItems.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
        
        // Reset progress
        const progressFill = playerContainer.querySelector('.progress-fill');
        const currentTimeDisplay = playerContainer.querySelector('.current-time');
        const totalTimeDisplay = playerContainer.querySelector('.total-time');
        
        if (progressFill) progressFill.style.width = '0%';
        if (currentTimeDisplay) currentTimeDisplay.textContent = '0:00';
        
        // Update total time display
        if (song.duration && totalTimeDisplay) {
            totalTimeDisplay.textContent = song.duration;
        }
        
        // Update play/pause button icons
        const playIcon = playerContainer.querySelector('.play-icon');
        const pauseIcon = playerContainer.querySelector('.pause-icon');
        
        // If music was playing, start the new song
        if (isMusicPlaying) {
            backgroundMusic.play();
            if (playIcon && pauseIcon) {
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            }
        }
    }
}



// Make loadSong globally accessible
window.loadSong = loadSong;
}

// Call this function after the DOM has loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the music player
    const playerControls = initMusicPlayer();
    
    // Set global volume variable for other sound effects
    window.soundEffectVolume = 0.7;
});



// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Other initialization code...
    
    // Add the year navigation button
    updateInitialNavigation();
});

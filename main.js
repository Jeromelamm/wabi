        // Main JavaScript file for the interactive love story experience
        // Track current section for navigation
        let currentSection = 'landing';
        let previousMemorySection = 'initial-memory-lane';
        
        // Audio elements
        const backgroundMusic = document.getElementById('background-music');
        let isMusicPlaying = false;
        
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
                }, 5000);
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
        
    // Modify the goBackToMemoryLane function to optionally accept a specific destination
    function goBackToMemoryLane(specificDestination) {
    // Hide current section
    document.getElementById(currentSection).classList.remove('active');
    
    // Show specified section or default to previously stored section
    const destination = specificDestination || previousMemorySection;
    document.getElementById(destination).classList.add('active');
    
    // Update current section
    currentSection = destination;
    
    // Scroll to top
    window.scrollTo(0, 0);
}
        

    // Let's add a function that will let us specify where the back button should take us
    function showMemoryDetailWithCustomBack(memoryId, customBackSection) {
    // Hide current section
    document.getElementById(currentSection).classList.remove('active');
    
    // Set custom back destination
    previousMemorySection = customBackSection || currentSection;
    
    // Show memory detail page
    document.getElementById(memoryId).classList.add('active');
    
    // Update current section
    currentSection = memoryId;
    
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
        function playButtonSound() {
            const audio = new Audio('https://assets.codepen.io/4358584/click1.mp3');
            audio.volume = soundEffectVolume * 0.6; // Even quieter for button clicks
            audio.play().catch(e => console.log("Button sound prevented:", e));
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
        
        // Quiz functionality
        function checkAnswer(questionNum, answer) {
            const feedbackElement = document.getElementById(`feedback-${questionNum}`);
            feedbackElement.classList.remove('hidden');
            
            if (answer === correctAnswers[questionNum]) {
                feedbackElement.textContent = 'Correct! 💕';
                feedbackElement.style.color = 'green';
                quizScore++;
            } else {
                feedbackElement.textContent = 'Not quite... the correct answer is highlighted 💜';
                feedbackElement.style.color = 'red';
            }
            
            // Highlight correct answer
            const options = document.querySelectorAll(`#question-${questionNum} .quiz-option`);
            options.forEach(option => {
                option.disabled = true;
                if (option.textContent.toLowerCase().charAt(0) === correctAnswers[questionNum]) {
                    option.style.backgroundColor = 'rgba(78, 205, 196, 0.7)';
                    option.style.fontWeight = 'bold';
                }
            });
            
            // Move to next question or show results
            setTimeout(() => {
                if (questionNum < 3) {
                    document.getElementById(`question-${questionNum}`).classList.add('hidden');
                    document.getElementById(`question-${questionNum + 1}`).classList.remove('hidden');
                } else {
                    // Show results
                    document.querySelectorAll('.quiz-question').forEach(q => q.classList.add('hidden'));
                    const resultsElement = document.getElementById('quiz-results');
                    resultsElement.classList.remove('hidden');
                    
                    document.getElementById('score-display').textContent = `Your score: ${quizScore}/3`;
                    
                    const messageElement = document.getElementById('score-message');
                    if (quizScore === 3) {
                        messageElement.textContent = 'Perfect score! You know me so well! ❤️';
                        messageElement.style.color = 'green';
                    } else if (quizScore >= 1) {
                        messageElement.textContent = 'Not bad! There\'s always more to learn about each other! 💕';
                        messageElement.style.color = 'orange';
                    } else {
                        messageElement.textContent = 'That\'s okay! Let\'s keep creating memories together! 💜';
                        messageElement.style.color = 'purple';
                    }
                }
            }, 1500);
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


 // Check password function
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
                
                // Play music
                if (!isMusicPlaying) {
                    toggleAudio();
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




// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Other initialization code...
    
    // Add the year navigation button
    updateInitialNavigation();
});

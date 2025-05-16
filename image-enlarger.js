// Enhanced Image Enlargement Function
function enlargeImage(imgElement) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    
    // Check if image is an actual img element or a placeholder div
    if (imgElement.tagName.toLowerCase() === 'img') {
        // If it's an actual image, use its src
        modalImg.src = imgElement.src;
        modalImg.alt = imgElement.alt || 'Enlarged image';
        
        // Set max-width and max-height to maintain aspect ratio
        modalImg.style.maxWidth = '90%';
        modalImg.style.maxHeight = '90%';
        modalImg.style.objectFit = 'contain';
    } else {
        // For placeholder divs, check if they have background image
        const bgImage = window.getComputedStyle(imgElement).backgroundImage;
        if (bgImage && bgImage !== 'none') {
            // Extract URL from background-image style
            const url = bgImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
            modalImg.src = url;
        } else {
            // If no background image, use a colored background that matches the placeholder
            modalImg.src = '/api/placeholder/800/500';
            
            // If the div has any text, display it in the modal
            if (imgElement.textContent) {
                modalImg.alt = imgElement.textContent;
            }
        }
    }
    
    // Display the modal
    modal.style.display = 'flex';
    
    // Add animation class
    modalImg.classList.add('zoom-in');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        modalImg.classList.remove('zoom-in');
    }, 300);
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    
    // Add closing animation
    modalImg.classList.add('zoom-out');
    
    // Wait for animation to complete before hiding modal
    setTimeout(() => {
        modal.style.display = 'none';
        modalImg.classList.remove('zoom-out');
    }, 200);
}

// Event handler for clicking anywhere on the modal to close it
function setupModalClose() {
    const modal = document.getElementById('image-modal');
    
    modal.addEventListener('click', function(event) {
        // Close only if clicking on the modal background, not the image itself
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Also setup keyboard listener to close on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}

// Function to add click listeners to all images and photo placeholders
function setupImageEnlargement() {
    // Target actual images
    const images = document.querySelectorAll('.photo, .gallery-item img, .collage-img');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            enlargeImage(this);
        });
    });
    
    // Target photo placeholders
    const placeholders = document.querySelectorAll('.photo-placeholder');
    placeholders.forEach(placeholder => {
        placeholder.style.cursor = 'pointer';
        // Only add event listener if it doesn't already have one
        if (!placeholder.getAttribute('onclick')) {
            placeholder.addEventListener('click', function() {
                enlargeImage(this);
            });
        }
    });
}

// Run setup when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    setupModalClose();
    setupImageEnlargement();
    
    // Make sure the modal exists, create it if not
    if (!document.getElementById('image-modal')) {
        const modalHTML = `
            <div class="modal" id="image-modal">
                <span class="close-modal" onclick="closeModal()">&times;</span>
                <img class="modal-content" id="modal-img">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Add additional CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .zoom-in {
            animation: zoomIn 0.3s ease-out;
        }
        
        .zoom-out {
            animation: zoomOut 0.2s ease-in;
        }
        
        @keyframes zoomIn {
            from {
                transform: scale(0.5);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes zoomOut {
            from {
                transform: scale(1);
                opacity: 1;
            }
            to {
                transform: scale(0.5);
                opacity: 0;
            }
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.85);
            z-index: 2000;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(255,255,255,0.3);
            cursor: default;
        }
        
        .close-modal {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 2.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 2001;
        }
        
        .close-modal:hover {
            transform: scale(1.2);
            text-shadow: 0 0 10px rgba(255,255,255,0.8);
        }
    `;
    document.head.appendChild(style);
});
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox img');
    const lightboxThumbnailsContainer = document.querySelector('.lightbox-thumbnails');
    const caption = document.querySelector('.lightbox .caption');
    const closeBtn = document.querySelector('.lightbox .close');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const lightboxLeftArrow = document.querySelector('.lightbox-left-arrow');
    const lightboxRightArrow = document.querySelector('.lightbox-right-arrow');

    let currentImageIndex = 0;
    const imageSources = Array.from(thumbnails).map(thumb => thumb.src);

    // Populate lightbox thumbnails
    imageSources.forEach((src, index) => {
        let img = document.createElement('img');
        img.src = src;
        img.alt = `Thumbnail ${index + 1}`;
        img.addEventListener('click', () => {
            updateMainImage(index);
            lightbox.style.display = 'flex';
        });
        lightboxThumbnailsContainer.appendChild(img);
    });

    const updateMainImage = (index) => {
        mainImage.src = imageSources[index];
        lightboxImage.src = imageSources[index];
        caption.textContent = thumbnails[index].alt;
        currentImageIndex = index;
    };

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateMainImage(index);
        });
    });

    mainImage.addEventListener('dblclick', () => {
        lightbox.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    const navigateImages = (direction) => {
        if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % imageSources.length;
        } else {
            currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
        }
        updateMainImage(currentImageIndex);
    };
    

    leftArrow.addEventListener('click', () => navigateImages('prev'));
    rightArrow.addEventListener('click', () => navigateImages('next'));
    lightboxLeftArrow.addEventListener('click', () => navigateImages('prev'));
    lightboxRightArrow.addEventListener('click', () => navigateImages('next'));
});


function moveImagesToTopOnMobile() {
    // Define the mobile width breakpoint (typically 768px for tablets and below)
    const mobileWidthBreakpoint = 768;

    // Only run the script if the window width is less than the breakpoint
    if (window.innerWidth < mobileWidthBreakpoint) {
      // Select all the 'col-lg-4 col-sm-12' divs which contain the background images
      const imageDivs = document.querySelectorAll('.col-lg-4.col-sm-12.d-flex');

      // Loop through all image divs
      imageDivs.forEach((div) => {
        // Get the parent row element
        const parentRow = div.closest('.row');

        // Move the image div to the start of the row
        parentRow.prepend(div);
      });
    }
  }

  // Helper function to throttle events
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  // Run the function on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', moveImagesToTopOnMobile);

  // Run the function on window resize, throttled to prevent excessive calls
  window.addEventListener('resize', throttle(moveImagesToTopOnMobile, 100));
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



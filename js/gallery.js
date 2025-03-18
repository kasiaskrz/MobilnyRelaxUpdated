document.addEventListener("DOMContentLoaded", function () {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;
    const radius = 300; // Increased distance to avoid overlap

    console.log("Total Items Found:", totalItems);

    if (totalItems === 0) {
        console.error("No images found in carousel!");
        return;
    }

    // Arrange items in a circular formation
    carouselItems.forEach((item, i) => {
        const angle = (360 / totalItems) * i;
        item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        item.style.position = "absolute";
    });

    // Function to rotate the carousel
    function rotateCarousel() {
        const angle = (360 / totalItems) * currentIndex;
        carouselInner.style.transform = `rotateY(-${angle}deg)`;
    }

    // Next button functionality
    document.getElementById('next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        rotateCarousel();
    });

    // Previous button functionality
    document.getElementById('prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        rotateCarousel();
    });

    // Ensure visibility on load
    rotateCarousel();
});

let index = 0;
        const totalSlides = 5;
        const carousel = document.getElementById("carousel");
        function updateCarousel() {
            carousel.style.transform = `translateX(-${index * 100}%)`;
        }
        function nextSlide() {
            index = (index + 1) % totalSlides;
            updateCarousel();
        }
        function prevSlide() {
            index = (index - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        setInterval(nextSlide, 3000); // Auto-slide every 3 sec
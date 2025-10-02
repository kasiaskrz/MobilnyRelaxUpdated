document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("scrollUpBtn");

    // Show the button when user scrolls down 100px
    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });

    // Scroll to top smoothly on click
    btn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

  
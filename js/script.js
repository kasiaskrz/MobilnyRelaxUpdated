// scroll to the 'about' section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// Click effect
document.addEventListener("click", function (event) {
    let effect = document.createElement("div");
    effect.classList.add("click-effect");
    effect.style.left = `${event.clientX - 10}px`;
    effect.style.top = `${event.clientY - 10}px`;
    document.body.appendChild(effect);
    setTimeout(() => {
        effect.remove();
    }, 500);
});

$(document).ready(function () {
    var $sm = 480;
    var $md = 768;

    function resizeThis() {
        $imgH = $('.middle img').width();
        if ($(window).width() >= $sm) {
            $('.left,.right,.section').css('height', $imgH);
        } else {
            $('.left,.right,.section').css('height', 'auto');
        }
    }

    resizeThis();

    $(window).resize(function () {
        resizeThis();
    });

    $(window).scroll(function () {
        $('.section').each(function () {
            var $elementPos = $(this).offset().top;
            var $scrollPos = $(window).scrollTop();
            var $sectionH = $(this).height();
            var $h = $(window).height();
            var $sectionVert = (($h / 2) - ($sectionH / 4));

            if (($elementPos - $sectionVert) <= $scrollPos &&
                ($elementPos - $sectionVert) + $sectionH > $scrollPos) {
                $(this).addClass('animate');
            } else {
                $(this).removeClass('animate');
            }
        });
    });
});

const galleryImages = [
    "img/photos/5.jpeg",
    "img/photos/1.jpeg",
    "img/photos/3.jpeg",
    "img/photos/6.jpeg",
    "img/photos/7.jpeg",
    "img/photos/sauna_rocks.jpg"
];

let currentImage = 0;
    const galleryImage = document.getElementById("galleryImage");
    const thumbnailElements = document.querySelectorAll(".thumbnails img");

    function showImage(index) {
        currentImage = (index + galleryImages.length) % galleryImages.length;
        galleryImage.src = galleryImages[currentImage];

        // Update thumbnail highlight
        thumbnailElements.forEach((thumb, i) => {
            thumb.classList.toggle("active", i === currentImage);
        });
    }

    function nextSlide() {
        showImage(currentImage + 1);
    }

    function prevSlide() {
        showImage(currentImage - 1);
    }

    // Initialize highlight on page load
    showImage(0);


    







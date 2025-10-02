const questions = document.querySelectorAll(".faq-question");

questions.forEach((btn) => {
    btn.addEventListener("click", () => {
        const answer = btn.nextElementSibling;

        // Toggle visibility
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
        } else {
            // Close other open items
            document.querySelectorAll(".faq-answer").forEach((el) => {
                el.style.maxHeight = null;
            });

            // Open this one
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});


// Function to create the effect
document.addEventListener("click", function(event) {
    // Create a new element for the effect
    let effect = document.createElement("div");
    effect.classList.add("click-effect");

    // Set position based on mouse click
    effect.style.left = `${event.clientX - 10}px`; // Adjust to center
    effect.style.top = `${event.clientY - 10}px`;

    // Append to the body
    document.body.appendChild(effect);

    // Remove element after animation
    setTimeout(() => {
        effect.remove();
    }, 500);
});
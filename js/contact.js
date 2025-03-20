document.addEventListener("DOMContentLoaded", function () {
    let startDateInput = document.getElementById("startDate");
    let endDateInput = document.getElementById("endDate");
    let serviceInput = document.getElementById("service");
    let dateMessage = document.getElementById("dateMessage");
    let submitBtn = document.getElementById("submitBtn");
    let bookingForm = document.getElementById("contactForm");

    // Check availability when the start date changes
    startDateInput.addEventListener("change", function () {
        let selectedStartDate = this.value;
        if (!selectedStartDate || !serviceInput.value) return;

        fetch(`php/check_availability.php?date=${selectedStartDate}&service=${serviceInput.value}`)
        .then(response => response.text())
        .then(data => {
            console.log("Availability Response:", data);
            if (data.trim() === "unavailable") {
                dateMessage.textContent = "Sorry, this date is already booked. Please choose another.";
                submitBtn.disabled = true;
            } else {
                dateMessage.textContent = "";
                submitBtn.disabled = false;
            }
        })
        .catch(error => console.error("Fetch Error:", error));
    });

    // Handle form submission
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        let formData = new FormData(this);

        fetch("php/process_booking.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            console.log("Booking Response:", data); // Debugging

            if (data.status === "success") {
                // Fill the modal with booking details
                document.getElementById("modalService").textContent = serviceInput.value;
                document.getElementById("modalStartDate").textContent = startDateInput.value;
                document.getElementById("modalEndDate").textContent = endDateInput.value;
                document.getElementById("modalName").textContent = document.getElementById("name").value;
                document.getElementById("modalLocation").textContent = document.getElementById("location").value;
                document.getElementById("modalEmail").textContent = document.getElementById("email").value;

                // Show the modal after submitting
                let modal = new bootstrap.Modal(document.getElementById("bookingModal"));
                modal.show();
            } else {
                alert("Error: " + data.message); // Show specific error
            }
        })
        .catch(error => console.error("Submit Error:", error));
    });

    // Handle "Proceed to Payment" button click in the modal
    document.getElementById("proceedToPayment").addEventListener("click", function () {
        document.getElementById("bookingSummary").style.display = "none"; // Hide booking summary
        document.getElementById("paymentSection").style.display = "block"; // Show payment section
    });

    // Handle "Confirm Payment" button click
    document.getElementById("confirmPayment").addEventListener("click", function () {
        alert("Payment successful! Thank you for your booking.");
        window.location.href = "confirmation.html"; // Redirect to confirmation page after payment
    });
});

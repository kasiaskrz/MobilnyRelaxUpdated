document.addEventListener("DOMContentLoaded", function () {

    let startDateInput = document.getElementById("startDate");
    let endDateInput = document.getElementById("endDate");
    let serviceInput = document.getElementById("service");
    let submitBtn = document.getElementById("submitBtn");
    let bookingForm = document.getElementById("contactForm");

    let modalElement = document.getElementById("bookingModal");
    let modal = new bootstrap.Modal(modalElement);
    let proceedToPaymentBtn = document.getElementById("proceedToPayment");
    let confirmPaymentBtn = document.getElementById("confirmPayment");

    // Elements to show user info in modal
    let modalService = document.getElementById("modalService");
    let modalStartDate = document.getElementById("modalStartDate");
    let modalEndDate = document.getElementById("modalEndDate");
    let modalName = document.getElementById("modalName");
    let modalLocation = document.getElementById("modalLocation");
    let modalEmail = document.getElementById("modalEmail");

    console.log("Submit Button Found:", submitBtn !== null);
    console.log("Modal Element Found:", modalElement !== null);

    // 📅 Set min (2 days before) and max (4 months ahead) date restrictions
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 4);

    const formattedMin = minDate.toISOString().split("T")[0];
    const formattedMax = maxDate.toISOString().split("T")[0];

    startDateInput.min = formattedMin;
    startDateInput.max = formattedMax;
    endDateInput.min = formattedMin;
    endDateInput.max = formattedMax;

    startDateInput.addEventListener("change", function () {
        let selectedStartDate = this.value;
        console.log("Selected Date:", selectedStartDate);

        // Update endDateInput's min to selected start date
        endDateInput.min = selectedStartDate;

        fetch(`php/check_availability.php?date=${selectedStartDate}&service=${serviceInput.value}`)
            .then(response => response.text())
            .then(data => {
                console.log("Availability Response:", data);
                if (data.trim() === "unavailable") {
                    document.getElementById("dateMessage").textContent = "Sorry, this date is already booked.";
                    submitBtn.disabled = true;
                } else {
                    document.getElementById("dateMessage").textContent = "";
                    submitBtn.disabled = false;
                }
            })
            .catch(error => console.error("Fetch Error:", error));
    });

    // Handle form submission
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("📩 Booking form submitted!");

        let formData = new FormData(this);

        fetch("php/process_booking.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log("Booking Response:", data);

                if (data.status === "success") {
                    console.log("✅ Booking successful, opening modal...");

                    // Fill modal with user input
                    modalService.textContent = serviceInput.value;
                    modalStartDate.textContent = startDateInput.value;
                    modalEndDate.textContent = endDateInput.value;
                    modalName.textContent = document.getElementById("name").value;
                    modalLocation.textContent = document.getElementById("location").value;
                    modalEmail.textContent = document.getElementById("email").value;

                    modal.show();
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(error => console.error("Submit Error:", error));
    });

    proceedToPaymentBtn.addEventListener("click", function () {
        console.log("🟢 Proceed to Payment clicked!");
        document.getElementById("bookingSummary").style.display = "none";
        document.getElementById("paymentSection").style.display = "block";
    });

    confirmPaymentBtn.addEventListener("click", function () {
        console.log("🟢 Confirm Payment clicked!");

        // Replace the payment section with a success message
        document.getElementById("paymentSection").innerHTML = `
            <div class="text-center">
                <h5 class="text-success">✅ Payment Successful!</h5>
                <p>Thank you for your booking. We will contact you shortly.</p>
            </div>
        `;
        // Reset the booking form after payment
        bookingForm.reset();
    });
});

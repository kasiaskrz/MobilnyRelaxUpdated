document.addEventListener("DOMContentLoaded", function () {
    let startDateInput = document.getElementById("startDate");
    let endDateInput = document.getElementById("endDate");
    let serviceInput = document.getElementById("service");
    let dateMessage = document.getElementById("dateMessage");
    let submitBtn = document.getElementById("submitBtn");

    let today = new Date();
    let minDate = new Date(today);
    minDate.setDate(today.getDate() + 2); // Min: 2 days later
    let maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 4); // Max: 4 months later

    let formattedMinDate = minDate.toISOString().split("T")[0];
    let formattedMaxDate = maxDate.toISOString().split("T")[0];

    startDateInput.setAttribute("min", formattedMinDate);
    startDateInput.setAttribute("max", formattedMaxDate);
    endDateInput.setAttribute("min", formattedMinDate);
    endDateInput.setAttribute("max", formattedMaxDate);

    startDateInput.addEventListener("change", function () {
        let selectedStartDate = new Date(this.value);
        
        if (selectedStartDate < minDate || selectedStartDate > maxDate) {
            this.value = "";
            alert("Please select a date at least 2 days from today and within the next 4 months.");
            return;
        }

        // Set min end date based on start date
        endDateInput.setAttribute("min", this.value);

        // Check availability only if a service is selected
        if (serviceInput.value) {
            checkAvailability(this.value, serviceInput.value);
        }
    });

    serviceInput.addEventListener("change", function () {
        if (startDateInput.value) {
            checkAvailability(startDateInput.value, this.value);
        }
    });

    function checkAvailability(date, service) {
        fetch(`/php/check_availability.php?date=${date}&service=${service}`)
        .then(response => response.text())
        .then(data => {
            if (data === "unavailable") {
                dateMessage.textContent = "Sorry, this date is already booked. Please choose another.";
                submitBtn.disabled = true;
            } else {
                dateMessage.textContent = "";
                submitBtn.disabled = false;
            }
        })
        .catch(error => console.error('Error:', error));
    }
});

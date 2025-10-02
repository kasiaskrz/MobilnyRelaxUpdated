// Function to get query parameters from the URL
function getQueryParams() {
    let params = new URLSearchParams(window.location.search);
    document.getElementById("bookingId").textContent = params.get("booking_id");
    document.getElementById("service").textContent = params.get("service");
    document.getElementById("startDate").textContent = params.get("startDate");
    document.getElementById("endDate").textContent = params.get("endDate");
    document.getElementById("name").textContent = params.get("name");
    document.getElementById("location").textContent = params.get("location");
    document.getElementById("email").textContent = params.get("email");
}

// Function to proceed to payment (Modify for Stripe, PayPal, etc.)
function proceedToPayment() {
    alert("Redirecting to payment gateway...");
    let bookingId = document.getElementById("bookingId").textContent;
    
    // payment gateway URL
    window.location.href = `https://yourpaymentgateway.com?booking_id=${bookingId}`;
}

// Run getQueryParams on page load
document.addEventListener("DOMContentLoaded", getQueryParams);

<?php
header("Content-Type: application/json"); // Ensure JSON response

include 'db_connect.php';

// Check if database connection failed
if ($connection->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $connection->connect_error]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $service = $_POST["service"] ?? '';
    $start_date = $_POST["startDate"] ?? '';
    $end_date = $_POST["endDate"] ?? '';
    $name = $_POST["name"] ?? '';
    $location = $_POST["location"] ?? '';
    $phone = $_POST["phone"] ?? '';
    $email = $_POST["email"] ?? '';

    // Validate required fields
    if (empty($service) || empty($start_date) || empty($end_date) || empty($name) || empty($location) || empty($phone) || empty($email)) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit;
    }

    $sql = "INSERT INTO bookings (service, start_date, end_date, name, location, phone, email, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')";

    $stmt = $connection->prepare($sql);

    if (!$stmt) {
        echo json_encode(["status" => "error", "message" => "SQL error: " . $connection->error]);
        exit;
    }

    $stmt->bind_param("sssssss", $service, $start_date, $end_date, $name, $location, $phone, $email);

    if ($stmt->execute()) {
        $booking_id = $stmt->insert_id; // Get the newly inserted booking ID
        echo json_encode(["status" => "success", "booking_id" => $booking_id]);
    } else {
        echo json_encode(["status" => "error", "message" => "Execution failed: " . $stmt->error]);
    }

    $stmt->close();
    $connection->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>

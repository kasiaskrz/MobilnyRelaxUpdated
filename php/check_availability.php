<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db_connect.php';

if (!isset($_GET['date']) || !isset($_GET['service'])) {
    die("Missing required parameters");
}

$date = $_GET['date'];
$service = $_GET['service'];

$sql = "SELECT * FROM bookings WHERE ('$date' BETWEEN start_date AND end_date) 
        AND service = ? 
        AND status = 'confirmed'";

$stmt = $connection->prepare($sql);
$stmt->bind_param("s", $service);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "unavailable";
} else {
    echo "available";
}

$stmt->close();
$connection->close();
?>

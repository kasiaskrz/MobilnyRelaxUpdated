<?php
include 'db_connect.php';

if (isset($_GET['date']) && isset($_GET['service'])) {
    $date = $_GET['date'];
    $service = $_GET['service'];

    $sql = "SELECT * FROM bookings WHERE ('$date' BETWEEN start_date AND end_date) AND service='$service' AND status='confirmed'";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        echo "unavailable";
    } else {
        echo "available";
    }
}
?>

<?php
$host = "localhost";
$username = "stkptr6_kasia"; // Use your cPanel MySQL username
$password = "8nL5^bFUhMzO"; // Use your cPanel MySQL password
$database = "stkptr6_mobilny_relax"; // Use your database name

$connection = new mysqli($host, $username, $password, $database);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
?>

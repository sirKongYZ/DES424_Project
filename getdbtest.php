<?php
// Database connection parameters
$host = 'fooddb.cdgwjbduasis.us-east-1.rds.amazonaws.com'; // e.g., localhost
$port = '5432'; // Default PostgreSQL port
$dbname = 'mydb';
$user = 'postgres';
$password = 'password';

// Establish a connection to the PostgreSQL database

// Check if the connection was successful
try {
    // Create a PDO database connection
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password");

    // Set PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL query
    $sql = "SELECT * FROM employees;";

    // Execute the query
    $stmt = $conn->query($sql);

    // Fetch and display the results
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "ID: " . $row['id'] . ", Name: " . $row['name'] . "<br>";
    }
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>

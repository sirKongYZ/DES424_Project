<?php
// Database connection parameters
$host = 'fooddb.cdgwjbduasis.us-east-1.rds.amazonaws.com'; // e.g., localhost
$port = '5432'; // Default PostgreSQL port
$dbname = 'mydb';
$user = 'postgres';
$password = 'password';

// Establish a connection to the PostgreSQL database
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

// Check if the connection was successful
if (!$conn) {
    die("Connection failed: " . pg_last_error());
}

// Perform database operations here...

// Close the database connection
pg_close($conn);
?>

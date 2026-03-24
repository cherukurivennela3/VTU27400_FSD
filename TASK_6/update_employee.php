<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $emp_id = $_POST['emp_id'];
    $emp_name = $_POST['emp_name'];
    $department = $_POST['department'];
    $salary = $_POST['salary'];

    $sql = "UPDATE employees 
            SET emp_name='$emp_name', department='$department', salary='$salary'
            WHERE emp_id='$emp_id'";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

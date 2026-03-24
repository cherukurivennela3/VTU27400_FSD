<?php
include 'db.php';

$employees = $conn->query("SELECT * FROM employees ORDER BY emp_id ASC");
$auditLogs = $conn->query("SELECT * FROM employee_audit_log ORDER BY log_id DESC");
$dailyReport = $conn->query("SELECT * FROM daily_activity_report");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automated Logging using Triggers & Views</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Automated Logging using Triggers & Views</h1>
        <p class="subtitle">Audit logging for INSERT and UPDATE operations</p>

        <div class="forms-section">
            <div class="form-card">
                <h2>Add Employee</h2>
                <form action="add_employee.php" method="POST">
                    <input type="text" name="emp_name" placeholder="Employee Name" required>
                    <input type="text" name="department" placeholder="Department" required>
                    <input type="number" step="0.01" name="salary" placeholder="Salary" required>
                    <button type="submit">Add Employee</button>
                </form>
            </div>

            <div class="form-card">
                <h2>Update Employee</h2>
                <form action="update_employee.php" method="POST">
                    <input type="number" name="emp_id" placeholder="Employee ID" required>
                    <input type="text" name="emp_name" placeholder="New Employee Name" required>
                    <input type="text" name="department" placeholder="New Department" required>
                    <input type="number" step="0.01" name="salary" placeholder="New Salary" required>
                    <button type="submit">Update Employee</button>
                </form>
            </div>
        </div>

        <h2>Employees Table</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Updated At</th>
            </tr>
            <?php while($row = $employees->fetch_assoc()) { ?>
            <tr>
                <td><?php echo $row['emp_id']; ?></td>
                <td><?php echo $row['emp_name']; ?></td>
                <td><?php echo $row['department']; ?></td>
                <td>₹<?php echo number_format($row['salary'], 2); ?></td>
                <td><?php echo $row['updated_at']; ?></td>
            </tr>
            <?php } ?>
        </table>

        <h2>Audit Log Table</h2>
        <table>
            <tr>
                <th>Log ID</th>
                <th>Emp ID</th>
                <th>Action</th>
                <th>Old Name</th>
                <th>New Name</th>
                <th>Old Dept</th>
                <th>New Dept</th>
                <th>Old Salary</th>
                <th>New Salary</th>
                <th>Action Time</th>
            </tr>
            <?php while($log = $auditLogs->fetch_assoc()) { ?>
            <tr>
                <td><?php echo $log['log_id']; ?></td>
                <td><?php echo $log['emp_id']; ?></td>
                <td><?php echo $log['action_type']; ?></td>
                <td><?php echo $log['old_name']; ?></td>
                <td><?php echo $log['new_name']; ?></td>
                <td><?php echo $log['old_department']; ?></td>
                <td><?php echo $log['new_department']; ?></td>
                <td><?php echo $log['old_salary']; ?></td>
                <td><?php echo $log['new_salary']; ?></td>
                <td><?php echo $log['action_time']; ?></td>
            </tr>
            <?php } ?>
        </table>

        <h2>Daily Activity Report (View)</h2>
        <table>
            <tr>
                <th>Activity Date</th>
                <th>Action Type</th>
                <th>Total Actions</th>
            </tr>
            <?php while($report = $dailyReport->fetch_assoc()) { ?>
            <tr>
                <td><?php echo $report['activity_date']; ?></td>
                <td><?php echo $report['action_type']; ?></td>
                <td><?php echo $report['total_actions']; ?></td>
            </tr>
            <?php } ?>
        </table>
    </div>
</body>
</html>

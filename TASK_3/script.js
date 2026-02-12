document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let valid = true;

    // Clear errors
    document.getElementById("userError").innerText = "";
    document.getElementById("passError").innerText = "";
    document.getElementById("serverError").innerText = "";

    // Validation
    if (username === "") {
        document.getElementById("userError").innerText = "Username is required";
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById("passError").innerText = "Password must be 6+ characters";
        valid = false;
    }

    if (!valid) return;

    // Send to backend
    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
        alert("Login Successful!");
    } else {
        document.getElementById("serverError").innerText = data.message;
    }
});

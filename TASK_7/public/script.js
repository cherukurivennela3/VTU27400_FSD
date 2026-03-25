const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const result = document.getElementById("result");

// 🔁 Reusable validation functions
function validateName(name) {
    return name.length >= 3;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMessage(msg) {
    return msg.length >= 5;
}

// ⌨️ Keypress validation
nameInput.addEventListener("keyup", () => {
    nameError.textContent = validateName(nameInput.value)
        ? ""
        : "Name must be at least 3 characters";
});

emailInput.addEventListener("keyup", () => {
    emailError.textContent = validateEmail(emailInput.value)
        ? ""
        : "Invalid email format";
});

messageInput.addEventListener("keyup", () => {
    messageError.textContent = validateMessage(messageInput.value)
        ? ""
        : "Message too short";
});

// 🖱️ Double-click submit
submitBtn.addEventListener("dblclick", submitForm);

function submitForm() {
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    if (!validateName(name) || !validateEmail(email) || !validateMessage(message)) {
        result.textContent = "Please fix errors before submitting.";
        return;
    }

    fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(res => res.json())
    .then(data => {
        result.textContent = data.message;
    })
    .catch(err => {
        result.textContent = "Error submitting form.";
    });
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    console.log("working");
    e.preventDefault(); // Prevent form submission by default

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    let isValid = true;

    isValid &= validateEmail(emailInput, emailError, "Invalid email format");
    isValid &= validatePassword(passwordInput, passwordError, "Password must be at least 8 characters");

    if (isValid) {
        loginForm.submit(); // Submit the form if all validations pass
    }
});

function validateField(input, errorElement, errorMessage) {
    if (!input.value || input.value.length <= 2) {
        showErrorAndHide(errorElement, errorMessage);
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

function validateUsername(input, errorElement, errorMessage) {
    const usernameRegex = /^[a-zA-Z\-\.]+$/; // Regular expression to match alphabets, hyphens, and periods

    if (!input.value || input.value.length < 4) {
        showErrorAndHide(errorElement, errorMessage);
        return false;
    } else if (!usernameRegex.test(input.value)) {
        showErrorAndHide(errorElement, "Only alphabets, . and - are allowed");
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

function validateEmail(input, errorElement, errorMessage) {
    if (!input.value || !isValidGmail(input.value)) {
        showErrorAndHide(errorElement, errorMessage);
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

function validatePassword(input, errorElement, errorMessage) {
    if (!input.value || input.value.length < 8) {
        showErrorAndHide(errorElement, errorMessage);
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

function validateMatch(input1, input2, errorElement, errorMessage) {
    if (input1.value !== input2.value) {
        showErrorAndHide(errorElement, errorMessage);
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

function isValidGmail(email) {
    return /^.+@gmail\.com$/.test(email);
}

function showErrorAndHide(element, message) {
    element.textContent = message;
    element.style.display = "block";
    setTimeout(() => {
        element.style.display = "none";
    }, 3000);
}

function hideError(element) {
    element.style.display = "none";
}
v;

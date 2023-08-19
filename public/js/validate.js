const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginForm.addEventListener("submit", (e) => {
    const emailInput = document.getElementById("emailValidation"); // Correct the ID
    const passwordInput = document.getElementById("passwordValidation"); // Correct the ID
    const emailError = document.getElementById("emailError"); // Define emailError
    const passwordError = document.getElementById("passwordError"); // Define passwordError

    let isValid = true;

    if (!emailInput.value || !isValidGmail(emailInput.value)) {
        showErrorAndHide(emailError, "Invalid email format");
        isValid = false;
    } else {
        hideError(emailError);
    }

    if (!passwordInput.value || passwordInput.value.length < 8) {
        showErrorAndHide(passwordError, "Password must be at least 8 characters");
        isValid = false;
    } else {
        hideError(passwordError);
    }

    if (!isValid) {
        e.preventDefault();
    }
});

registerForm.addEventListener("submit", (e) => {
    const nameInput = document.getElementById("registerName");
    const userNameInput = document.getElementById("registerUsername");
    const emailInput = document.getElementById("registerEmail");
    const passwordInput = document.getElementById("registerPassword");
    const confirmPasswordInput = document.getElementById("registerRepeatPassword");
    const nameError = document.getElementById("nameError"); // Define nameError
    const usernameError = document.getElementById("usernameError"); // Define usernameError
    const emailError = document.getElementById("emailError"); // Define emailError
    const passwordError = document.getElementById("passwordError"); // Define passwordError
    const confirmPasswordError = document.getElementById("registerRepeatPasswordMsg"); // Define confirmPasswordError

    let isValid = true;

    if (!validateField(nameInput, nameError, "Enter a valid name")) {
        isValid = false;
    }

    if (!validateField(userNameInput, usernameError, "Enter a valid username")) {
        isValid = false;
    }

    if (!validateEmail(emailInput, emailError, "Invalid email format")) {
        isValid = false;
    }

    if (!validatePassword(passwordInput, passwordError, "Password must be at least 8 characters")) {
        isValid = false;
    }

    if (!validateMatch(passwordInput, confirmPasswordInput, confirmPasswordError, "Passwords do not match")) {
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
});

function validateField(input, errorElement, errorMessage) {
    if (!input.value || input.value.length < 2) {
        showErrorAndHide(errorElement, errorMessage);
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
    // Check if the email is of the form "@gmail.com"
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

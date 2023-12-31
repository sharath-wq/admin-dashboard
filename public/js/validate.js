const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginForm.addEventListener("submit", (e) => {
    const emailInput = document.getElementById("emailValidation");
    const passwordInput = document.getElementById("passwordValidation");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

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
    const nameError = document.getElementById("nameError");
    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("registerRepeatPasswordMsg");

    let isValid = true;

    if (!validateField(nameInput, nameError, "Enter a valid name")) {
        isValid = false;
    }

    if (!validateUsername(userNameInput, usernameError, "Enter a valid username")) {
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

function validateUsername(input, errorElement, errorMessage) {
    const usernameRegex = /^[a-zA-Z\-\.]+$/;

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

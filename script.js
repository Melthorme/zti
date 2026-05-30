const userName = document.querySelector('input#name');
const email = document.querySelector('input#email');
const pass1 = document.querySelector('input#password1');
const pass2 = document.querySelector('input#password2');
const resetBtn = document.querySelector('input#reset');
const submitBtn = document.querySelector('input#submit');


function showOrHideErrorMessage(input, text, color = "black") {
    const box = input.parentElement;
    const errMess = box.querySelector('p.err_message');
    errMess.textContent = text;
    errMess.style.color = text ? color : "";
}

function checkInputsLength(input, minLength) {
    if (input.value.length < minLength) {
        showOrHideErrorMessage(input, `Pole ${input.previousElementSibling.textContent.toLowerCase().replace("*", "").replace(":", "")} powinno zawierać minimum ${minLength} znaki`, "red");
    } else {
        console.log('OK');
    }
}

function checkPassword() {
    if (pass1.value !== pass2.value) {
        showOrHideErrorMessage(pass2, "Hasła są różne");
    } else {
        showOrHideErrorMessage(pass2, "");
    }
}

function checkEmail() {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(email.value)) {
        showOrHideErrorMessage(email, "Adres email jest niepoprawny", "red");
    } else {
        showOrHideErrorMessage(email, "");
    }
}

function checkPasswordStrength(input) {
    const password = input.value;

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasLetter || !hasNumber || !hasSpecial) {
        showOrHideErrorMessage(
            input,
            "Hasło musi zawierać literę, cyfrę i znak specjalny", "red"
        );
    } else {
        showOrHideErrorMessage(input, "");
    }
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    checkInputsLength(userName, 3);
    checkInputsLength(pass1, 8);
    checkPasswordStrength(pass1);
    checkPassword();
    checkEmail();

    // sprawdzenie czy nie ma błędów
    const errors = document.querySelectorAll('.err_message');

    let hasError = false;

    errors.forEach(el => {
        if (el.textContent !== "") {
            hasError = true;
        }
    });

    // jeśli wszystko OK → przejdź dalej
    if (!hasError) {
        window.location.href = "./movies.html";
    }
});

resetBtn.addEventListener('click', () => {

})
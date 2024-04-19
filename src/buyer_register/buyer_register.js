let nickInput = document.getElementById('nick');
let nickDisplay = document.getElementById('nick-display');

nickInput.addEventListener('keyup', () => {
    if (nickInput.value !== '') {
        nickDisplay.innerText = nickInput.value;
    } else {
        nickDisplay.innerText = '';
    }
})

const form = document.getElementById("user-register-form");
const registryErrorModal = document.getElementById("error-modal");
const modalContent = document.getElementById("modal-content");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validation checks
    const nick = document.getElementById("nick").value.trim();
    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailRepeat = document.getElementById("email-repeat").value.trim();
    const password = document.getElementById("password").value.trim();
    const passwordRepeat = document.getElementById("password-repeat").value.trim();

    let errorMessage = "";

    if (!nick || !name || !lastname || !email || !emailRepeat || !password || !passwordRepeat) {
        errorMessage += "Todos los campos son obligatorios!<br>";
    }

    if (email !== emailRepeat) {
        errorMessage += "Los correos no coinciden!<br>";
    }

    if (password !== passwordRepeat) {
        errorMessage += "Las contraseñas no coinciden!";
    }

    if (errorMessage !== "") {
        modalContent.innerHTML = errorMessage;
        registryErrorModal.style.display = "block";

        setTimeout(function() {
            fadeOut(registryErrorModal);
        }, 1250);
    } else {
        // If all validations pass, you can submit the form here
        // form.submit(); // Uncomment this line to submit the form
    }
});

function fadeOut(element) {
    let opacity = 1;
    let fadeInterval = setInterval(function () {
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            element.style.display = "none";
        } else {
            opacity -= 0.1;
            element.style.opacity = opacity;
        }
    }, 100);
}

// Close the modal when the user clicks anywhere outside of it
window.addEventListener("click", function (event) {
    if (event.target === registryErrorModal) {
        registryErrorModal.style.display = "none";
    }
});
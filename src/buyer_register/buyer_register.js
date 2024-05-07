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

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Validation checks
    const nick = document.getElementById("nick").value.trim();
    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailRepeat = document.getElementById("email-repeat").value.trim();
    const password = document.getElementById("password").value.trim();
    const passwordRepeat = document.getElementById("password-repeat").value.trim();
    const spendLimit = document.getElementById("spendLimit").value.trim();

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
        }, 1500);
    } else {
        console.log('awaiting');
        await fetch(`http://localhost:5237/api/Api/registroglobal/${name}/${nick}/${password}/${email}/18/${spendLimit}`, {
            method: 'POST'
        }).then((res) => {
            if (res.ok) {
                window.location.href = 'http://localhost:63342/SpringCarrot/src/landing_page/landing_page.html';
            }
        })
    }
});

function fadeOut(element) {
    let opacity = 1;
    let fadeInterval = setInterval(function () {
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            element.style.display = "none";
        } else {
            opacity -= 0.01;
            element.style.opacity = opacity;
        }
    }, 10);
}

// Close the modal when the user clicks anywhere outside of it
window.addEventListener("click", function (event) {
    if (event.target === registryErrorModal) {
        registryErrorModal.style.display = "none";
    }
});
let nickInput = document.getElementById('nick');
let nickDisplay = document.getElementById('nick-display');

nickInput.addEventListener('keyup', () => {
    if (nickInput.value !== '') {
        nickDisplay.innerText = nickInput.value;
    } else {
        nickDisplay.innerText = '';
    }
})

let passInput = document.getElementById('password');
let passRepInput = document.getElementById('password-repeat');


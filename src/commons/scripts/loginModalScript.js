const userIcon = document.getElementById('userIcon');
const userModal = document.getElementById('login-modal');
const closeUserModal = document.getElementById('closeUserModal');

updateUserIconListener();

// Close modal when close button is clicked
closeUserModal.addEventListener('click', function() {
    userModal.classList.add('hidden');
});

// Close modal if click outside modal
document.body.addEventListener('click', function(event) {
    if (!userModal.contains(event.target) && event.target !== userIcon) {
        userModal.classList.add('hidden');
    }
});

let nickInput = document.getElementById('login-nick-input');
let passwordInput = document.getElementById('login-password-input');
let loginButton = document.getElementById('login-modal-login-button');

loginButton.addEventListener('click', async () => {
    await fetch(new Request(`http://localhost:5237/api/Api/login/${nickInput.value}/${passwordInput.value}`))
        .then(res=> {
            if (res.status < 200 || (res.status >= 300 && res.status < 700)) {
                //document.getElementById('login-modal-error').innerText = 'Datos incorrectos!!'
            } else if (res.ok) {
                //document.getElementById('login-modal-error').innerText = '';
                return res.json();
            }
        })
        .then((json) => {
           if (json !== undefined) {
               sessionStorage.setItem('logged-user', JSON.stringify(json));
               updateUserIconListener();
               userModal.classList.add('hidden');
           }
        })
})

function updateUserIconListener() {
    let loggedUser = sessionStorage.getItem('logged-user');
    if (loggedUser === null) {
        // Open login modal if no logged-user-id
        userIcon.addEventListener('click', openModalListener);
    } else {
        userIcon.removeEventListener('click', openModalListener);
        userIcon.addEventListener('click', function() {
            window.location.href = "../buyer_profile/buyer_profile.html";
        });
    }
}

function openModalListener (event) {
    event.stopPropagation(); // Prevent click event from propagating to document
    userModal.classList.remove('hidden');
    cartModal.classList.add('hidden');
}

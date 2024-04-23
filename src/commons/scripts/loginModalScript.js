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

let emailInput = document.getElementById('login-email-input');
let passwordInput = document.getElementById('login-password-input');

//  TODO IMPLEMENT TOKEN IF POSSIBLE

async function loginConfirm() {
    // TODO RETURN TRUE IF LOGIN SUCCESS FALSE IF NOT
    return false;
}

function loginUser() {
    // TODO SAVE ID AND PASS IF SUCCESS
}

// TODO UPDATE LOCAL STORAGE WITH USERID

function updateUserIconListener() {
    let loggedId = localStorage.getItem('logged-user-id');
    let loggedHash = localStorage.getItem('logged-user-hash');
    if ((loggedId === null || loggedId === undefined) && (loggedHash === null || loggedHash === undefined)) {
        // Open login modal if no logged-user-id
        userIcon.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent click event from propagating to document
            userModal.classList.remove('hidden');
            cartModal.classList.add('hidden');
        });
    } else {
        if (loginConfirm()) {
            userIcon.addEventListener('click', function() {
                window.location.href = "../buyer_profile/buyer_profile.html";
            });
        } else {
            // Open login modal if login invalid
            userIcon.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent click event from propagating to document
                userModal.classList.remove('hidden');
            });
        }
    }
}

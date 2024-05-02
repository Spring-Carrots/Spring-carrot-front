// TODO LINK API
let loggedUser;

function loadUserData () {
    loggedUser = sessionStorage.getItem('logged-user');
    loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

    if (loggedUser !== null) {
        document.getElementById('user-nick-display').innerText = loggedUser.nick_name;
        document.getElementById('user-name-display').innerText = loggedUser.nombre;
        //document.getElementById('user-lastname-display').innerText = loggedUser.apellido;
        document.getElementById('user-email-display').innerText = loggedUser.email;
    }
}



// HARD CODED EXAMPLES

loadUserData();

appendUserAddressCard({
    street: 'Avinguda dels Tarongers S/n Edificio 1H Planta baja',
    province: 'Valencia',
    country: 'España',
    postCode: '46021'
});

appendUserAddressCard({
    street: 'Carrer Pepe Alba 14 P1-4',
    province: 'Valencia',
    country: 'España',
    postCode: '46033'
});

appendPaymentMethodCard({
    type: "Debito",
    holder: "Josefa Manolo",
    cardNumber: "ES** **** **** **** 1234",
    expiryDate: "03/28"
})
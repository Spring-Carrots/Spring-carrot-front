// TODO LINK API

function loadUserData (user) {
    document.getElementById('user-nick-display').innerText = user.nickname;
    document.getElementById('user-name-display').innerText = user.name;
    document.getElementById('user-lastname-display').innerText = user.lastname;
    document.getElementById('user-email-display').innerText = user.email;
}



// HARD CODED EXAMPLES

loadUserData({
    nickname: "Admin of Super Admins",
    name: "Spring Carrot",
    lastname: "Admin Rabbit",
    email: "admin-rabbit@spring-carrot.com"
})

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
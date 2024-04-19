
let addressCardsWrapper = document.getElementById('address-cards-wrapper');
let paymentCardsWrapper = document.getElementById('payment-cards-wrapper');

// TODO LINK API

function appendUserAddressCard(addressInfo) {
    let addressCard = document.createElement('div');
    updateClasses(addressCard);

    addressCard.style.borderRadius = "1.5rem";
    addressCard.style.backgroundColor = "white";

    addressCard.innerHTML = `
    <div class="flex flex-row mt-5">
        <p class="address-info-text">Calle:</p><p class="address-info-display">${addressInfo.street}</p>
    </div>
    <div class="flex flex-row mt-5">
        <div class="flex flex-row">
            <p class="address-info-text">Provincia:</p><p class="address-info-display">${addressInfo.province}</p>
        </div>
        <div class="flex flex-row ml-6">
            <p class="address-info-text">País:</p><p class="address-info-display">${addressInfo.country}</p>
        </div>
    </div>
    <div class="flex flex-row mt-5">
        <p class="address-info-text">Cod. Postal:</p><p class="address-info-display">${addressInfo.postCode}</p>
    </div>
    `;

    addressCardsWrapper.append(addressCard);
}

function appendPaymentMethodCard(cardInfo) {
    let paymentCard = document.createElement('div');
    updateClasses(paymentCard);

    paymentCard.style.borderRadius = "1.5rem";
    paymentCard.style.backgroundColor = "white";

    paymentCard.innerHTML = `
    <div class="flex flex-row mt-5">
        <div class="flex flex-row">
            <p class="card-info-text">Tipo:</p><p id="number-info-display" class="card-info-display">${cardInfo.type}</p>
        </div>
        <div class="flex flex-row ml-6">
            <p class="card-info-text">Titular:</p><p id="name-info-display" class="card-info-display">${cardInfo.holder}</p>
        </div>
    </div>
    <div class="flex flex-row mt-5">
        <p class="card-info-text">Numero:</p><p id="type-info-display" class="card-info-display">${cardInfo.cardNumber}</p>
    </div>
    <div class="flex flex-row mt-5">
        <p class="card-info-text">Caducidad:</p><p id="date-info-display" class="card-info-display">${cardInfo.expiryDate}</p>
    </div>
    `;

    paymentCardsWrapper.append(paymentCard);
}

function updateClasses(htmlElement) {
    htmlElement.classList.add('shadow-lg');
    htmlElement.classList.add('flex');
    htmlElement.classList.add('flex-col');
    htmlElement.classList.add('p-5');
    htmlElement.classList.add('w-full');
    htmlElement.classList.add('mb-8');
}

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
const address1 = {
    addressId: 'address1',
    street: 'Avinguda dels Tarongers S/n Edificio 1H Planta baja',
    province: 'Valencia',
    country: 'España',
    postCode: '46021'
};
appendUserAddressCard(address1);
localStorage.setItem('address1', JSON.stringify(address1));

const address2 = {
    addressId: 'address2',
    street: 'Carrer Pepe Alba 14 P1-4',
    province: 'Valencia',
    country: 'España',
    postCode: '46033'
};
appendUserAddressCard(address2);
localStorage.setItem('address2', JSON.stringify(address2));

const card1 = {
    paymentId: "card1",
    type: "Debito",
    holder: "Josefa Manolo",
    cardNumber: "ES** **** **** **** 1234",
    expiryDate: "03-28"
}
appendPaymentMethodCard(card1);
localStorage.setItem('card1', JSON.stringify(card1));


const paypal1 = {
    paymentId: "paypal1",
    type: "PayPal",
    holder: "Josefa Manolo",
    cardNumber: "jomanolo@manolo.manolo",
};
appendPaymentMethodPaypal(paypal1);
localStorage.setItem('paypal1', JSON.stringify(paypal1));

let total = 0;

let deleteButtons = document.getElementsByClassName('profile-listing-trash-button');
let addButtons = document.getElementsByClassName('profile-listing-add-button');
let substractButtons = document.getElementsByClassName('profile-listing-substract-button');

let orderItemsWrapper = document.getElementById('order-items-wrapper');

let loggedUser = sessionStorage.getItem('logged-user');
loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

reloadOrderList();

async function orderListingUpdate() {
    orderItemsWrapper.innerHTML = '';
    total = 0;

    await fetch(`http://localhost:5237/api/Api/obtener-carrito/${loggedUser.id}`)
        .then(res=> res.json())
        .then((json) => {
            if (json !== undefined) {
                if (json.length <= 0) {
                    let emptyElement = addEmpty(document.createElement('div'), '20rem', '1.5rem');
                    profileListsListingWrapper.append(emptyElement);
                } else {
                    for (let i = 0; i < json.length; i++) {
                        let listing = getListingsCart(document.createElement('div'), json[i]);
                        orderItemsWrapper.append(listing);
                        total += json[i].item1.precio * json[i].item2;
                    }

                    document.getElementById('total-amount-text').innerText = `Total: ${total.toFixed(2)} €`;

                    loadMakeOrderListener();
                }
            }
        })
}

function getListingsCart(cardElement, listing) {
    cardElement.classList.add('rounded-lg');
    cardElement.classList.add('shadow-lg');
    cardElement.style.margin = '2rem 0';
    cardElement.style.width = '100%';
    cardElement.innerHTML = `
        <div class="grid grid-cols-12 gap-2 listing-card" data-product-id="${listing.id}">
            <div class="h-80 col-span-4" style="overflow: hidden; display: flex; justify-content: center; align-items: center">
              <img class="w-full object-cover rounded-l-lg" src="${listing.item1.foto1}" alt="White T-shirt" style="width: auto; height: 100%; object-fit: cover">
            </div>
            <div class="px-6 py-4 col-span-6" style="min-height: 15rem">
              <div class="font-bold text-xl mb-2 truncate-lines-2">${listing.item1.nombre}</div>
              <p class="text-gray-700 text-base truncate-lines-9">
              ${listing.item1.descripcion}
              </p>
            </div>
            <div class="flex flex-col col-span-2 mt-6 items-center">
              <p style="font-size: 1.15rem; font-weight: bold; text-align: center; margin-right: 0.5rem; overflow-wrap: break-word">Cantidad: ${listing.item2}</p>
              <p style="font-size: 1.15rem; font-weight: bold; text-align: center; margin-right: 0.5rem; overflow-wrap: break-word">${listing.item1.precio}€</p>
              <button class="inline-block mb-2 justify-center items-center order-trash-button" data-value="${listing.item1.id}" style="width: 50%;  z-index: 3"><i class="fa-solid fa-trash" style="color: white" data-value="${listing.item1.id}"></i></button>
              <div class="flex flex-row items-center justify-center content-center" style="width: 50%">
                <button class="inline-block mb-2 justify-center items-center order-substract-button" data-value="${listing.item1.id}" style=z-index: 3"><i class="fa-solid fa-square-minus" style="color: #A98467" data-value="${listing.item1.id}"></i></button>
                <button class="inline-block mb-2 justify-center items-center order-add-button" data-value="${listing.item1.id}" style="z-index: 3"><i class="fa-solid fa-square-plus" style="color: #adc178" data-value="${listing.item1.id}"></i></button>
              </div>
              <!--<p style="font-size: 1.15rem; font-weight: bold; text-align: center; margin-right: 0.5rem; overflow-wrap: break-word">Total: ${listing.item2 * listing.item1.precio}€</p>-->
              <!--<button class="inline-block mb-2 order-listing-to-trash justify-center items-center profile-listing-trash-button" data-value="${listing.item1.id}" style="width: 50%;  z-index: 3"><i class="fa-solid fa-trash" style="color: white" data-value="${listing.item1.id}"></i></button>-->
            </div>
        </div>`;

    return cardElement;
}

function loadMakeOrderListener() {
    let makeOrderButton = document.getElementById('make-order-button');

    makeOrderButton.addEventListener('click', async () => {
        let url;
        if (sessionStorage.getItem('payment-selection') == 'card1') {
            url = `http://localhost:5237/api/Api/realizar-pedido/${loggedUser.id}/123456/${card1.holder.replaceAll(' ', '')}/${card1.expiryDate}/tarjeta/${parseInt(total)}`;
        } else {
            url = `http://localhost:5237/api/Api/realizar-pedido/${loggedUser.id}/0/${paypal1.cardNumber}/${paypal1.holder}/paypal/${parseInt(total)}`;
        }
        await fetch(url, {
            method: 'POST'
        })
            .then(res=> res.ok)
            .then((status) => {
                if (status === true) {
                    let orderDataWrapper = document.getElementById('order-data-wrapper');
                    orderDataWrapper.innerHTML = ''

                    let successMessage = document.createElement('div');
                    successMessage.classList.add('flex');
                    successMessage.classList.add('flex-col');
                    successMessage.classList.add('items-center');
                    successMessage.style.margin = '10rem 0';

                    successMessage.innerHTML = `
                        <img src="https://img.freepik.com/free-vector/box-carrots-white-background_1308-38269.jpg" style="width: 30rem; height: 25rem; margin: 2rem">
                        <h1 style="font-weight: lighter; font-size: 2rem; margin: 2rem 0">Pedido realizado correctamente!</h1>
                    `

                    orderDataWrapper.append(successMessage);
                }
            })
    })
}

function addOrderListeners() {
    deleteButtons = document.getElementsByClassName('order-trash-button');
    addButtons = document.getElementsByClassName('order-add-button');
    substractButtons = document.getElementsByClassName('order-substract-button');

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', async (event) => {
            let loggedUser = sessionStorage.getItem('logged-user');
            loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

            let listingId = event.target.getAttribute('data-value');

            await fetch(`http://localhost:5237/api/Api/eliminar-producto-a-carrito/${loggedUser.id}/${listingId}`, {
                method: 'POST'
            }).then(res => {
                if (res.ok) {
                    reloadOrderList();
                }
            })
        });

        addButtons[i].addEventListener('click', async (event) => {
            let loggedUser = sessionStorage.getItem('logged-user');
            loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

            let listingId = event.target.getAttribute('data-value');

            await fetch(`http://localhost:5237/api/Api/agregar-producto-a-carrito/${loggedUser.id}/${listingId}/1`, {
                method: 'POST'
            }).then(res => {
                if (res.ok) {
                    reloadOrderList();
                }
            })
        })

        substractButtons[i].addEventListener('click', async (event) => {
            let loggedUser = sessionStorage.getItem('logged-user');
            loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

            let listingId = event.target.getAttribute('data-value');

            await fetch(`http://localhost:5237/api/Api/agregar-producto-a-carrito/${loggedUser.id}/${listingId}/-1`, {
                method: 'POST'
            }).then(res => {
                if (res.ok) {
                    reloadOrderList();
                }
            })
        })
    }
}

async function reloadOrderList() {
    await orderListingUpdate();
    addOrderListeners();
    addPaymentCardsListeners();
    addAddressCardsListeners();
}

function addPaymentCardsListeners() {
    let paymentCards = document.getElementsByClassName('payment-info-card');

    for (let i = 0; i < paymentCards.length; i++) {
        paymentCards[i].addEventListener('click', () => {
            for (let j = 0; j < paymentCards.length; j++) {
                paymentCards[j].classList.remove('selected-payment-card');
            }

            paymentCards[i].classList.add('selected-payment-card');
            sessionStorage.setItem('payment-selection', paymentCards[i].getAttribute('data-payment-id'));
        });
    }
}

function addAddressCardsListeners() {
    let addressCards = document.getElementsByClassName('address-info-card');

    for (let i = 0; i < addressCards.length; i++) {
        addressCards[i].addEventListener('click', () => {
            for (let j = 0; j < addressCards.length; j++) {
                addressCards[j].classList.remove('selected-address-card');
            }

            addressCards[i].classList.add('selected-address-card');
            sessionStorage.setItem('address-selection', addressCards[i].getAttribute('data-address-id'));
        });
    }
}
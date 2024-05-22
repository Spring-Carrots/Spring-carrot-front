let deleteButtons = document.getElementsByClassName('profile-listing-trash-button');
let addButtons = document.getElementsByClassName('profile-listing-add-button');
let substractButtons = document.getElementsByClassName('profile-listing-substract-button');

async function loadCart() {
    if (loggedUser !== null) {
        profileListsListingWrapper.innerHTML = '';
        mainProfileSection.hidden = true;
        listsHeaderWrapper.innerHTML = `
            <i class="fa-solid fa-cart-shopping" style="color: #adc178; font-size: 2rem; margin-right: 1rem"></i>
            <h2 id="catalog-section-header" style="font-weight: bold">Carrito</h2>
        `;
        let makeOrderButtonWrapper = document.getElementById('make-order-button-wrapper');
        makeOrderButtonWrapper.innerHTML = '';
        profileListsWrapper.hidden = false;
        try {
            await fetch(`http://localhost:5237/api/Api/obtener-carrito/${loggedUser.id}`)
                .then(res=> res.json())
                .then((json) => {
                    if (json !== undefined) {
                        if (json.length <= 0) {
                            let emptyElement = addEmpty(document.createElement('div'), '20rem', '1.5rem');
                            profileListsListingWrapper.append(emptyElement);
                        } else {
                            let totalAmount = 0;
                            for (let i = 0; i < json.length; i++) {
                                totalAmount += json[i].item1.precio * json[i].item2;
                                let listing = createCartListing(document.createElement('div'), json[i], 'cart');
                                profileListsListingWrapper.append(listing);
                            }

                            let cartTotalElement = document.getElementById('total-amount');
                            cartTotalElement.innerText = `Total: ${totalAmount} €`;

                            let makeOrderButton = document.createElement('button');
                            makeOrderButton.innerText = 'Realizar pedido';
                            makeOrderButton.id = 'make-order-button';

                            makeOrderButtonWrapper.append(makeOrderButton);

                            makeOrderButton.addEventListener('click', () => {
                                window.location.href = '../order_view/user_order.html';
                            })
                        }
                    }
                })
        } catch (error) {
            console.log(error)
            let emptyElement = addEmpty(document.createElement('div'), '20rem', '1.5rem');
            profileListsListingWrapper.append(emptyElement);
        }

    }
}

function createCartListing(cardElement, listing, sectionName) {
    cardElement.classList.add('rounded-lg');
    cardElement.classList.add('shadow-lg');
    cardElement.classList.add('mb-2');
    cardElement.classList.add('mt-2');
    cardElement.style.width = '100%';
    cardElement.innerHTML = `
        <div class="grid grid-cols-12 gap-2 listing-card" data-href="http://localhost:63342/SpringCarrot/src/product_detail/listingDetail.html?_ijt=l9b8sppmmoqv4418ujei8ivt66&_ij_reload=RELOAD_ON_SAVE&id=${listing.id}">
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
              <button class="inline-block mb-2 ${sectionName}-to-trash justify-center items-center profile-listing-trash-button" data-value="${listing.item1.id}" style="width: 50%;  z-index: 3"><i class="fa-solid fa-trash" style="color: white" data-value="${listing.item1.id}"></i></button>
              <div class="flex flex-row items-center justify-center content-center" style="width: 50%">
                <button class="inline-block mb-2 ${sectionName}-substract justify-center items-center profile-listing-substract-button" data-value="${listing.item1.id}" style=z-index: 3"><i class="fa-solid fa-square-minus" style="color: #A98467" data-value="${listing.item1.id}"></i></button>
                <button class="inline-block mb-2 ${sectionName}-add justify-center items-center profile-listing-add-button" data-value="${listing.item1.id}" style="z-index: 3"><i class="fa-solid fa-square-plus" style="color: #adc178" data-value="${listing.item1.id}"></i></button>
              </div>
            </div>
        </div>`;

    return cardElement;
}

function addProfileCartListeners() {
    deleteButtons = document.getElementsByClassName('profile-listing-trash-button');
    addButtons = document.getElementsByClassName('profile-listing-add-button');
    substractButtons = document.getElementsByClassName('profile-listing-substract-button');

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', async (event) => {
            let loggedUser = sessionStorage.getItem('logged-user');
            loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

            let listingId = event.target.getAttribute('data-value');

            await fetch(`http://localhost:5237/api/Api/eliminar-producto-a-carrito/${loggedUser.id}/${listingId}`, {
                method: 'POST'
            }).then(res => {
                if (res.ok) {
                    reloadList();
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
                    reloadList();
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
                    reloadList();
                }
            })
        })
    }
}

async function reloadList() {
    await loadCart();
    addProfileCartListeners();
}
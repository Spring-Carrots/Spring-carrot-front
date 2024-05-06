async function loadCart() {
    if (loggedUser !== null) {
        profileListsListingWrapper.innerHTML = '';
        mainProfileSection.hidden = true;
        listsHeaderWrapper.innerHTML = `
            <i class="fa-solid fa-cart-shopping" style="color: #adc178; font-size: 2rem; margin-right: 1rem"></i>
            <h2 id="catalog-section-header" style="font-weight: bold">Carrito</h2>
        `;
        let makeOrderButtonWrapper = document.getElementById('make-order-button-wrapper');
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
                            for (let i = 0; i < json.length; i++) {
                                let listing = createCartListing(document.createElement('div'), json[i], 'cart');
                                profileListsListingWrapper.append(listing);
                            }

                            let makeOrderButton = document.createElement('button');
                            makeOrderButton.innerText = 'Realizar pedido';
                            makeOrderButton.id = 'make-order-button';

                            makeOrderButtonWrapper.append(makeOrderButton);

                            makeOrderButton.addEventListener('click', () => {
                                window.location.href = 'http://localhost:63342/SpringCarrot/src/order_view/user_order.html?_ijt=3h663rvnvi6icovpat08qu0tl0&_ij_reload=RELOAD_ON_SAVE';
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
    cardElement.style.margin = '2rem';
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
              <p style="font-size: 1.15rem; font-weight: bold; text-align: center; margin-right: 0.5rem; overflow-wrap: break-word">${listing.item1.precio}€</p>
              <button class="inline-block mb-2 ${sectionName}-to-trash justify-center items-center profile-listing-trash-button" data-value="${listing.item1.id}" style="width: 50%;  z-index: 3"><i class="fa-solid fa-trash" style="color: white" data-value="${listing.item1.id}"></i></button>
            </div>
        </div>`;

    return cardElement;
}
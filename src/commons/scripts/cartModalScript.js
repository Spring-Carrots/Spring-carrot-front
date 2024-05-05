const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCartModal = document.getElementById('closeCartModal');
const emptyCartMessage = document.getElementById('empty-cart-message');
let cartItemsWrapper = document.getElementById('cart-items-wrapper');

cartIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    updateCartModal();
    cartModal.classList.remove('hidden');
    userModal.classList.add('hidden');
})

closeCartModal.addEventListener('click', function () {
    cartModal.classList.add('hidden');
});

document.body.addEventListener('click', function (event) {
    if(!cartModal.contains(event.target)
            && event.target !== cartIcon
            && !event.target.classList.contains('cart-modal-listing-delete')
            && !event.target.classList.contains('cart-modal-listing-trash-can')
        ) {
        cartModal.classList.add('hidden');
    }
});

async function updateCartModal() {
    let loggedUser = sessionStorage.getItem('logged-user');
    loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

    cartItemsWrapper.innerHTML = '';

    if (loggedUser !== null) {
        try {
            await fetch(`http://localhost:5237/api/Api/obtener-carrito/${loggedUser.id}`)
                .then(res => res.json())
                .then(json => {
                    if (json !== undefined) {
                        if (json.length <= 0) {
                            let emptyElement = addEmpty(document.createElement('div'), '14rem', '1.25rem');
                            cartItemsWrapper.append(emptyElement);
                        } else {
                            for (let i = 0; i < 3 && i < json.length; i++) {
                                let listingCard = cartModalCard(json[i]);
                                console.log(listingCard);
                                cartItemsWrapper.append(listingCard);
                            }

                            updateCartListingDelete();
                        }
                    }
            })
        } catch (error) {
            let emptyElement = addEmpty(document.createElement('div'), '14rem', '1.25rem');
            cartItemsWrapper.append(emptyElement);
        }
    } else {
        let emptyElement = addEmpty(document.createElement('div'), '14rem', '1.25rem');
        cartItemsWrapper.append(emptyElement);
    }
}

function cartModalCard(listing) {
    let listingElement = document.createElement('div');
    listingElement.id = `listing-${listing.item1.id}-card`;
    cartModalCardClasses(listingElement);

    listingElement.innerHTML = `
        <div class="object-cover rounded-l-lg col-span-1" style="object-position: 50% 50%">
          <img class="rounded-l-lg" src="${listing.item1.foto1}">
        </div>
        <div class="mt-2 mb-2 grid grid-cols-3 col-span-3">
           <div class="flex flex-col col-span-2">
              <h6 class="font-bold">${listing.item1.nombre}</h6>
              <p class="truncate-lines-2">${listing.item1.descripcion}</p>
            </div>
            <div class="flex flex-row items-center ml-1 mr-2">
              <input type="number" class="cart-listing block border-0 w-10 h-6" min="0" value="${listing.item2}">
              <button class="inline-block ml-2 justify-center items-center w-8 h-8 rounded-lg cart-modal-listing-delete" data-listing-id="${listing.item1.id}" style="background-color: #f50538">
                <i class="fa-solid fa-trash-can cart-modal-listing-trash-can" data-listing-id="${listing.item1.id}" style="color: #ffffff;"></i>
              </button>
            </div>
        </div>
    `;

    return listingElement;
}

function cartModalCardClasses(htmlElement) {
    htmlElement.classList.add('rounded-lg');
    htmlElement.classList.add('shadow-lg');
    htmlElement.classList.add('grid');
    htmlElement.classList.add('grid-cols-4');
    htmlElement.classList.add('gap-2');
    htmlElement.classList.add('overflow-hidden');
    htmlElement.classList.add('mb-1');
    htmlElement.classList.add('mt-1');
}

function updateCartListingDelete() {
    let loggedUser = sessionStorage.getItem('logged-user');
    loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

    let deleteButtons = document.getElementsByClassName('cart-modal-listing-delete');

    for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', async () => {
            let listingId = event.target.getAttribute('data-listing-id');

            await fetch(`http://localhost:5237/api/Api/eliminar-producto-a-carrito/${loggedUser.id}/${listingId}`, {
                method: 'POST'
            }).then(res => {
                if (res.ok) {
                    updateCartModal();
                }
            })
        });
    }
}



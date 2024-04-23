const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCartModal = document.getElementById('closeCartModal');
const emptyCartMessage = document.getElementById('empty-cart-message');
let cartItemsWrapper = document.getElementById('cart-items-wrapper');

cartIcon.addEventListener('click', (event) => {
    event.stopPropagation();
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

function updateCartModal(listings) {
    if (listings.length <= 0) {
        emptyCartMessage.hidden = false;
    } else {
        emptyCartMessage.hidden = true;
        for (let i = 0; i < 3 && i < listings.length; i++) {
            let listingCard = document.createElement('div');
            listingCard.id = `listing-${listings[i].id}-card`;
            cartModalCardClasses(listingCard);

            listingCard.innerHTML = `
            <div class="object-cover rounded-l-lg col-span-1" style="object-position: 50% 50%">
              <img class="rounded-l-lg" src="${listings[i].image}">
            </div>
            <div class="mt-2 mb-2 grid grid-cols-3 col-span-3">
               <div class="flex flex-col col-span-2">
                  <h6 class="font-bold">${listings[i].title}</h6>
                  <p class="truncate-lines-2">${listings[i].description}</p>
                </div>
                <div class="flex flex-row items-center ml-1 mr-2">
                  <input type="number" class="cart-listing block border-0 w-10 h-6" min="0" value="${listings[i].amount}">
                  <button class="inline-block ml-2 justify-center items-center w-8 h-8 rounded-lg cart-modal-listing-delete" style="background-color: #f50538">
                    <i class="fa-solid fa-trash-can cart-modal-listing-trash-can" style="color: #ffffff;"></i>
                  </button>
                </div>
            </div>
        `;

            cartItemsWrapper.append(listingCard);
        }
    }
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

let testCardListings = {
    1: {
        id: 1,
            image: 'https://cdn.dummyjson.com/product-images/2/1.jpg',
        title: 'iPhone X',
        description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with a new generation of Apple Silicon',
        amount: 1
    },
    2: {
        id: 2,
            image: 'https://cdn.dummyjson.com/product-images/4/1.jpg',
        title: 'OPPOF19',
        description: 'New OPPO F19 unveiled in 2023, with the newest Tensor cores and Snapdragon 898',
        amount: 1
    },
    3: {
        id: 3,
            image: 'https://cdn.dummyjson.com/product-images/8/1.jpg',
        title: 'Microsoft Surface Laptop 4',
        description: 'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
        amount: 2
    }
}; // TODO REMOVE WHEN CONNECTED TO BD

function updateCartListingDelete() {
    let deleteButtons = document.getElementsByClassName('cart-modal-listing-delete');

    for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', () => {
            let listingCard = deleteButton.parentElement.parentElement.parentElement;
            let listingId = Number(listingCard.id.replace('listing-', '').replace('-card', ''));

            // TODO CONNECT WITH SERVER AND UPDATE THE CART USING LISTINGID

            cartItemsWrapper.innerHTML = '';
            delete testCardListings[listingId];
            updateCartModal(Object.values(testCardListings));
            updateCartListingDelete();
        });
    }
}

updateCartModal(Object.values(testCardListings));
updateCartListingDelete();

function cartListPost() {
    // TODO POST FUNCTION TO UPDATE THE CART IN DB
}

function cartListGet() {
    // TODO GET FUNCTION TO RETRIEVE THE CART FROM BD
}



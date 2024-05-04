let showCartButton = document.getElementById('cart-list');
let showLaterButton = document.getElementById('later-list');
let showWantedButton = document.getElementById('wanted-list');



let listsHeaderWrapper = document.getElementById('lists-header-wrapper');
let profileListsListingWrapper = document.getElementById('listings-wrapper');
let profileListsWrapper = document.getElementById('lists-wrapper');

let mainProfileSection = document.getElementById('main-profile-section');
let closeListButton = document.getElementById('close-list-button');

loggedUser = sessionStorage.getItem('logged-user');
loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

showCartButton.addEventListener('click', async () => {
    if (loggedUser !== null) {
        profileListsListingWrapper.innerHTML = '';
        mainProfileSection.hidden = true;
        listsHeaderWrapper.innerHTML = `
            <i class="fa-solid fa-cart-shopping" style="color: #adc178; font-size: 2rem; margin-right: 1rem"></i>
            <h2 id="catalog-section-header" style="font-weight: bold">Carrito</h2>
        `;
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
                                let listing = createListing(document.createElement('div'), json[i], 'cart');
                                profileListsListingWrapper.append(listing);
                            }
                        }
                    }
                })
        } catch (error) {
            let emptyElement = addEmpty(document.createElement('div'), '20rem', '1.5rem');
            profileListsListingWrapper.append(emptyElement);
        }

    }
})

showLaterButton.addEventListener('click', loadLater);
showWantedButton.addEventListener('click', loadWanted);

closeListButton.addEventListener('click', () => {
    profileListsWrapper.hidden = true;
    profileListsListingWrapper.innerHTML = '';
    listsHeaderWrapper.innerHTML = '';
    mainProfileSection.hidden = false;
})

function createListing(cardElement, listing, sectionName) {
    cardElement.classList.add('rounded-lg');
    cardElement.classList.add('shadow-lg');
    cardElement.style.margin = '2rem';
    cardElement.style.width = '100%';
    cardElement.innerHTML = `
        <div class="grid grid-cols-12 gap-2 listing-card" data-href="http://localhost:63342/SpringCarrot/src/product_detail/listingDetail.html?_ijt=l9b8sppmmoqv4418ujei8ivt66&_ij_reload=RELOAD_ON_SAVE&id=${listing.id}">
            <div class="h-80 col-span-4" style="overflow: hidden; display: flex; justify-content: center; align-items: center">
              <img class="w-full object-cover rounded-l-lg" src="${listing.foto1}" alt="White T-shirt" style="width: auto; height: 100%; object-fit: cover">
            </div>
            <div class="px-6 py-4 col-span-6" style="min-height: 15rem">
              <div class="font-bold text-xl mb-2 truncate-lines-2">${listing.nombre}</div>
              <p class="text-gray-700 text-base truncate-lines-9">
              ${listing.descripcion}
              </p>
            </div>
            <div class="flex flex-col col-span-2 mt-6 items-center">
              <p style="font-size: 1.15rem; font-weight: bold; text-align: center; margin-right: 0.5rem; overflow-wrap: break-word">${listing.precio}€</p>
              <button class="inline-block mb-2 ${sectionName}-to-trash justify-center items-center profile-listing-trash-button" data-value="${listing.id}" style="width: 50%;  z-index: 3"><i class="fa-solid fa-trash" style="color: white" data-value="${listing.id}"></i></button>
              <button class="inline-block mb-2 ${sectionName}-to-cart justify-center items-center profile-listing-to-cart-button" data-value="${listing.id}" style="width: 50%; z-index: 3"><i class="fa-solid fa-cart-shopping" style="color: white" data-value="${listing.id}"></i></button>
            </div>
        </div>`;

    return cardElement;
}
let showCartButton = document.getElementById('cart-list');
let showLaterButton = document.getElementById('later-list');



let listsHeaderWrapper = document.getElementById('lists-header-wrapper');
let profileListsListingWrapper = document.getElementById('listings-wrapper');
let profileListsWrapper = document.getElementById('lists-wrapper');

let mainProfileSection = document.getElementById('main-profile-section');
let closeListButton = document.getElementById('close-list-button');

showCartButton.addEventListener('click', async () => {
    loggedUser = sessionStorage.getItem('logged-user');
    loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);


    //TODO RESPONSE TYPE AND DATA?????

    if (loggedUser !== null) {
        mainProfileSection.hidden = true;
        listsHeaderWrapper.innerHTML = `
            <i class="fa-solid fa-cart-shopping" style="color: #adc178; font-size: 2rem; margin-right: 1rem"></i>
            <h2 id="catalog-section-header" style="font-weight: bold">Carrito</h2>
        `;
        profileListsWrapper.hidden = false;
        await fetch(`http://localhost:5237/api/Api/obtener-carrito/${loggedUser.id}`)
            .then(res => {
                console.log(res);
                return res.json();
            }).then(json => {
                console.log(json);
                if (json !== undefined) {

                }
            })
    }
})

showLaterButton.addEventListener('click', async () => {
    loggedUser = sessionStorage.getItem('logged-user');
    loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

    if (loggedUser !== null) {
        mainProfileSection.hidden = true;
        listsHeaderWrapper.innerHTML = `
            <i class="fa-solid fa-list" style="color: #adc178; font-size: 2rem; margin-right: 1rem"></i>
            <h2 id="catalog-section-header" style="font-weight: bold">Guardado para más tarde</h2>
        `;
        profileListsWrapper.hidden = false;
        await fetch(`http://localhost:5237/api/Api/obtener-guardados/${loggedUser.id}`)
            .then(res=> res.json())
            .then((json) => {
                console.log(json);
                if (json !== undefined) {
                    for (let i = 0; i < json.length; i++) {
                        let listing = document.createElement('div');
                        listing.classList.add('rounded-lg');
                        listing.classList.add('shadow-lg');
                        listing.style.margin = '2rem';
                        listing.style.width = '100%';
                        listing.innerHTML = `
                            <a class="grid grid-cols-12 gap-2" href="http://localhost:63342/SpringCarrot/src/product_detail/listingDetail.html?_ijt=l9b8sppmmoqv4418ujei8ivt66&_ij_reload=RELOAD_ON_SAVE&id=${json[i].id}">
                                <div class="h-80 col-span-4" style="overflow: hidden; display: flex; justify-content: center; align-items: center">
                                  <img class="w-full object-cover rounded-t-lg" src="${json[i].foto1}" alt="White T-shirt" style="width: auto; height: 100%; object-fit: cover">
                                </div>
                                <div class="px-6 py-4 col-span-6" style="min-height: 15rem">
                                  <div class="font-bold text-xl mb-2 truncate-lines-2">${json[i].nombre}</div>
                                  <p class="text-gray-700 text-base truncate-lines-9">
                                  ${json[i].descripcion}
                                  </p>
                                </div>
                                <div class="flex flex-col col-span-2 mt-6">
                                    <p style="font-size: 1.15rem; font-weight: bold; text-align: center; margin-right: 0.5rem; overflow-wrap: break-word">${json[i].precio}€</p>
                                  <button class="inline-block mr-2 mb-2 later-to-trash justify-center items-center profile-listing-trash-button" value="${json[i].id}"><i class="fa-solid fa-trash" style="color: white"></i></button>
                                  <button class="inline-block mr-2 mb-2 later-to-cart justify-center items-center profile-listing-to-cart-button" value="${json[i].id}"><i class="fa-solid fa-cart-shopping" style="color: white"></i></button>
                                </div>
                            </a>`;
                        profileListsListingWrapper.append(listing);
                    }
                }
            })
    }
})

closeListButton.addEventListener('click', () => {
    profileListsWrapper.hidden = true;
    profileListsListingWrapper.innerHTML = '';
    listsHeaderWrapper.innerHTML = '';
    mainProfileSection.hidden = false;
})
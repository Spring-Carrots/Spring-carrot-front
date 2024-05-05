let listingsWrapper = document.getElementById('listings-wrapper');

function loadListingsFromDB() {
    fetch('http://localhost:5237/api/Api/productos')
        .then(res=>res.json())
        .then((json) => {
            for (let i = 0; i < 8; i++) {
                let listing = document.createElement('div');
                listing.classList.add('rounded-lg');
                listing.classList.add('shadow-lg');
                listing.innerHTML = `
                <div class="listing-card" data-href="http://localhost:63342/SpringCarrot/src/product_detail/listingDetail.html?_ijt=l9b8sppmmoqv4418ujei8ivt66&_ij_reload=RELOAD_ON_SAVE&id=${json[i].id}">
                    <div class="h-80" style="overflow: hidden; display: flex; justify-content: center; align-items: center">
                      <img class="w-full object-cover rounded-t-lg" src="${json[i].foto1}" alt="White T-shirt" style="width: auto; height: 100%; object-fit: cover">
                    </div>
                    <div class="px-6 py-4" style="min-height: 15rem">
                      <div class="font-bold text-xl mb-2 truncate-lines-2">${json[i].nombre}</div>
                      <p class="text-gray-700 text-base truncate-lines-4">
                      ${json[i].descripcion}
                      </p>
                    </div>
                    <div class="flex flex-row-reverse" style="margin: 2rem; align-items: center">
                        <button class="inline-block mb-2 listing-to-cart justify-center items-center listing-action-button" data-value="${listing.id}" style="width: 50%; z-index: 3"><i class="fa-solid fa-cart-shopping" style="color: white" data-value="${json[i].id}"></i></button>
                        <button class="inline-block mb-2 listing-to-list justify-center items-center listing-later-button" data-value="${listing.id}" style="width: 50%;  z-index: 3"><i class="fa-solid fa-star" style="color: goldenrod" data-value="${json[i].id}"></i></button>
                        <p style="font-size: 1.5rem; font-weight: bold; text-align: center; margin-right: 0.5rem">
                        ${json[i].precio}€
                        </p>
                    </div>
                </div>`;
                listingsWrapper.append(listing);

                localStorage.setItem(`local-prod-${json[i].id}`, JSON.stringify(json[i]));
            }

            setListingCardListeners();
            toCartListener();
        });
}

loadListingsFromDB();

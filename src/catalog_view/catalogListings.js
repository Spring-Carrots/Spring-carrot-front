let listingsWrapper = document.getElementById('listings-wrapper');
let currentPage = 0;
let lastPage = Number(document.getElementById('total-page-span').innerText) - 1;

function loadListingsFromDB(searchTerm) {
    listingsWrapper.innerHTML = '';
    searchTerm = searchTerm === undefined ? '' : searchTerm;
    let requestURL = `http://localhost:5237/api/Api/productos${searchTerm}`;
    fetch(requestURL)
        .then(res=> res.json())
        .then((json) => {
            for (let i = 0; i < 24 && i < json.length; i++) {
                let listing = document.createElement('div');
                listing.classList.add('rounded-lg');
                listing.classList.add('shadow-lg');
                listing.innerHTML = `
                <div class="listing-card" data-href="http://localhost:63342/SpringCarrot/src/product_detail/listingDetail.html?_ijt=l9b8sppmmoqv4418ujei8ivt66&_ij_reload=RELOAD_ON_SAVE&id=${json[i].id}">
                    <div class="h-80" style="overflow: hidden; display: flex; justify-content: center; align-items: center">
                      <img class="w-full object-cover rounded-t-lg" src="${json[i].foto1}" alt="White T-shirt" style="width: 100%; height: 100%; object-fit: cover">
                    </div>
                    <div class="px-6 py-4" style="min-height: 15rem">
                      <div class="font-bold text-xl mb-2 truncate-lines-2">${json[i].nombre}</div>
                      <p class="text-gray-700 text-base truncate-lines-4">
                      ${json[i].descripcion}
                      </p>
                    </div>
                    <div class="flex flex-row-reverse" style="margin: 2rem; align-items: center">
                        <button class="inline-block mb-2 listing-to-cart justify-center items-center listing-action-button" data-value="${json[i].id}" style="width: 50%; z-index: 3"><i class="fa-solid fa-cart-shopping" style="color: white" data-value="${json[i].id}"></i></button>
                        <button class="inline-block mb-2 listing-to-wanted justify-center items-center listing-later-button" data-value="${json[i].id}" style="width: 50%;  z-index: 3"><i class="fa-solid fa-star" style="color: goldenrod" data-value="${json[i].id}"></i></button>
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
            toWantedListeners();
        });
    window.scrollTo(0,0);
}

let searchButton = document.getElementById('search-button');
let searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
    if (searchInput.value !== '') {
        loadListingsFromDB(`/${searchInput.value.replaceAll('\s', '_')}`)
    }
})

loadListingsFromDB();

let nextPageButton = document.getElementById('next-page-button');
let prevPageButton = document.getElementById('prev-page-button');
let currentPageSpan = document.getElementById('current-page-span');

nextPageButton.addEventListener('click', () => {
    updatePage('next');
})

prevPageButton.addEventListener('click', () => {
    updatePage('prev');
})

function updatePage(order) {
    switch (order) {
        case 'next':
            currentPage++;
            listingsWrapper.innerHTML = '';
            loadListingsFromDB();
            if (currentPage == lastPage) {
                nextPageButton.disabled = true;
            } else {
                nextPageButton.disabled = false;
                prevPageButton.disabled = false;
            }
            break;

        case 'prev':
            currentPage--;
            listingsWrapper.innerHTML = '';
            loadListingsFromDB();
            if (currentPage == 0) {
                prevPageButton.disabled = true;
            } else {
                nextPageButton.disabled = false;
                prevPageButton.disabled = false;
            }
            break;
    }

    currentPageSpan.innerText = String(currentPage + 1);
}

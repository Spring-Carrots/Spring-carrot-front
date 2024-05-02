let listingsWrapper = document.getElementById('listings-wrapper');
let currentPage = 0;
let lastPage = Number(document.getElementById('total-page-span').innerText) - 1;

function loadListingsFromDB(searchTerm) {
    listingsWrapper.innerHTML = '';
    searchTerm = searchTerm === undefined ? '' : searchTerm;
    let requestURL = `http://localhost:5237/api/Api/productos${searchTerm}`;
    console.log(requestURL);
    fetch(requestURL)
        .then(res=> res.json())
        .then((json) => {
            console.log(json);

            for (let i = 0; i < json.length; i++) {
                let listing = document.createElement('div');
                listing.classList.add('rounded-lg');
                listing.classList.add('shadow-lg');
                listing.innerHTML = `
            <a href="http://localhost:63342/SpringCarrot/src/product_detail/listingDetail.html?_ijt=l9b8sppmmoqv4418ujei8ivt66&_ij_reload=RELOAD_ON_SAVE&id=${json[i].id}">
                <div class="h-80" style="overflow: hidden">
                  <img class="w-full object-cover rounded-t-lg" src="${json[i].foto1}" alt="White T-shirt">
                </div>
                <div class="px-6 py-4" style="min-height: 15rem">
                  <div class="font-bold text-xl mb-2 truncate-lines-2">${json[i].nombre}</div>
                  <p class="text-gray-700 text-base truncate-lines-4">
                  ${json[i].descripcion}
                  </p>
                </div>
                <div class="flex flex-row-reverse">
                  <button class="inline-block mr-2 mb-2 listing-add-to-cart justify-center items-center" style="z-index: 2"><svg class="button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"/></svg></button>
                  <button class="inline-block mr-2 mb-2 listing-add-to-list justify-center items-center" style="z-index: 2"><svg class="button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#acc078" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg></button>
                  <p style="font-size: 1.5rem; font-weight: bold; text-align: center; margin-right: 0.5rem">${json[i].precio}€</p>
                </div>
            </a>`;
                listingsWrapper.append(listing);

                localStorage.setItem(`local-prod-${json[i].id}`, JSON.stringify(json[i]));
            }
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

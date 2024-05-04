const windowHref = window.location.href;
let productId = windowHref.substring(windowHref.indexOf('id=')).replace('id=', '');

let productFetchURL = `https://dummyjson.com/products/${productId}`;
/**
fetch(productFetchURL)
    .then(res => res.json())
    .then((json) => {
        console.log(json);
        loadImage(json.images);
        loadDetails(json);
    });
    */
let product = JSON.parse(localStorage.getItem(`local-prod-${productId}`));

loadImage([product.foto1, product.foto2, product.foto3]);
loadDetails(product);

function loadImage (urlArray) {
    let imageWrapper = document.getElementById('listing-picture-wrapper');
    for (let i = 0; i < urlArray.length; i++) {
        let imageElement = document.createElement('img');
        imageElement.classList.add('listing-images');
        imageElement.src = urlArray[i];
        imageWrapper.append(imageElement);
    }
}

function loadDetails(productJSON) {
    let detailsWrapper = document.getElementById('listing-info-wrapper');

    detailsWrapper.innerHTML = `
        <h3 style="margin: 2rem 0; font-size: 4rem; font-weight: bold">${productJSON.nombre}</h3>
        <div class="grid grid-cols-12">
        <p class="col-span-6" style="font-size: 1.5rem; font-weight: lighter; text-decoration: underline">${productJSON.precio}€</p>
        <div class=" col-span-6 flex flex-row-reverse">
            <button class="inline-block mr-2 mb-2 listing-add-to-cart justify-center items-center"><i class="fa-solid fa-cart-shopping" style="color: white" data-value="${productJSON.id}"></i></button>
            <button class="inline-block mr-2 mb-2 listing-add-to-list justify-center items-center"><i class="fa-solid fa-star" style="color: goldenrod" data-value="${productJSON.id}"></i></button>
        </div>
        </div>
        <p style="text-wrap: normal">${productJSON.descripcion}</p>
    `;
}

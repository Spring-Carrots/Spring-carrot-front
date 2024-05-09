let progressLine = document.getElementById('progress-line');
let orderItemsWrapper = document.getElementById('listings-wrapper');

function updateProgressLine(status) {
    switch (status) {
        case 'prepping':
            progressLine.style.width = '10%';
            document.getElementById('ordered-inner').hidden = false;
            break;
        case 'sent':
            progressLine.style.width = '35%';
            document.getElementById('sent-inner').hidden = false;
            break;
        case 'transit':
            progressLine.style.width = '60%';
            break;
        case 'delivered':
            progressLine.style.width = '90%';
            break;
    }
}

function updateInnerCircles(status) {
    switch (status) {
        case 'delivered':
            document.getElementById('delivered-inner').hidden = false;
        case 'transit':
            document.getElementById('in-transit-inner').hidden = false;
        case 'sent':
            document.getElementById('sent-inner').hidden = false;
        case 'prepping':
            document.getElementById('ordered-inner').hidden = false;
            break;
    }
}

updateProgressLine('transit');
updateInnerCircles('transit');

let listing = getListingsCart(document.createElement('div'), {
        "item1": {
            "id": 7,
            "nombre": "Dell XPS 17",
            "categoria": "electronica",
            "descripcion": "Imagina un portátil tan potente que podría hacer que tu viejo escritorio se ponga celoso. ¡Eso es el Dell XPS 17! Este monstruo de la productividad es como tener una oficina móvil de alta gama en tu mochila. Con su pantalla de borde a borde, te sumergirás en tus proyectos como si estuvieras en primera fila de un cine IMAX. Y su rendimiento, ¡digno de un atleta olímpico! Con el poder de un procesador de última generación y la velocidad de un SSD relámpago, realizar tareas pesadas es tan rápido como un parpadeo. Además, su diseño elegante y ultradelgado es como el traje a medida de James Bond: sofisticado por fuera, pero listo para la acción en cualquier momento. Así que, si quieres llevar tu trabajo a nuevas alturas, el Dell XPS 17 es tu socio perfecto en el crimen tecnológico.",
            "cantidad": 500,
            "precio": 2099.89,
            "foto1": "https://m.media-amazon.com/images/I/81S-yXzvFPL._AC_UF894,1000_QL80_DpWeblab_.jpg",
            "foto2": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-17-9730/media-gallery/notebook-xps-17-9730-t-gray-gallery-2.psd?fmt=pjpg&pscan=auto&scl=1&wid=3760&hei=2292&qlt=100,1&resMode=sharp2&size=3760,2292&chrss=full&imwidth=5000",
            "foto3": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-17-9720/media-gallery/notebook-xps-17-9720-silver-gallery-4.psd?fmt=pjpg&pscan=auto&scl=1&wid=3484&hei=2054&qlt=100,1&resMode=sharp2&size=3484,2054&chrss=full&imwidth=5000"
        },
        "item2": 1
    });
orderItemsWrapper.append(listing);

function getListingsCart(cardElement, listing) {
    cardElement.classList.add('rounded-lg');
    cardElement.classList.add('shadow-lg');
    cardElement.style.margin = '2rem 0';
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
            </div>
        </div>`;

    return cardElement;
}
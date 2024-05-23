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

function getListingsCart(cardElement, listing) {
    cardElement.classList.add('rounded-lg');
    cardElement.classList.add('shadow-lg');
    cardElement.style.margin = '2rem 0';
    cardElement.style.width = '100%';
    cardElement.innerHTML = `
        <div class="grid grid-cols-12 gap-2 listing-card" data-product-id="${listing.item1.id}">
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
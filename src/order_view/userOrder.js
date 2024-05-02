appendUserAddressCard({
    street: 'Avinguda dels Tarongers S/n Edificio 1H Planta baja',
    province: 'Valencia',
    country: 'España',
    postCode: '46021'
});

appendUserAddressCard({
    street: 'Carrer Pepe Alba 14 P1-4',
    province: 'Valencia',
    country: 'España',
    postCode: '46033'
});

appendPaymentMethodCard({
    type: "Debito",
    holder: "Josefa Manolo",
    cardNumber: "ES** **** **** **** 1234",
    expiryDate: "03/28"
})

let orderItemsWrapper = document.getElementById('order-items-wrapper');


function orderListingUpdate(itemsArray) {
    orderItemsWrapper.innerHTML = '';
    let totalAmount = 0;

    for (let i = 0; i < itemsArray.length; i++) {
        totalAmount += itemsArray.amount * itemsArray.price;

        let orderItemCard = document.createElement('div');
        orderItemCard.id = `item-${itemsArray[i].id}-card`;
        listingCardClasses(orderItemCard);

        orderItemCard.innerHTML = `
            <div class="object-cover rounded-l-lg col-span-1 " style="object-position: 50% 50%; text-align: center">
              <img class="rounded-l-lg" src="${itemsArray[i].image}" style="margin: 0 auto; display: block">
            </div>
            <div class="mt-2 mb-2 grid grid-cols-3 col-span-3">
               <div class="grid grid-rows-5 col-span-2">
                   <div class="flex flex-col row-span-4">
                      <h6 class="font-bold">${itemsArray[i].title}</h6>
                      <p class="truncate-lines-4">${itemsArray[i].description}</p>
                    </div>
                    <div class="row-span-1 flex flex-row">
                        <h3 style="font-weight: bold; bottom: 0">${itemsArray[i].price}€ x ${itemsArray[i].amount} = </h3>
                        <h2 style="font-weight: bold; font-size: 1.5rem; bottom: 0">${itemsArray[i].price * itemsArray[i].amount}€</h2>
                    </div>
                </div>
                <div class="flex flex-row items-center ml-1 mr-2">
                  <input type="number" class="cart-listing block border-0 w-10 h-6" min="0" value="${itemsArray[i].amount}">
                  <button class="inline-block ml-2 justify-center items-center w-8 h-8 rounded-lg order-item-delete" style="background-color: #f50538">
                    <i class="fa-solid fa-trash-can order-item-trash-can" style="color: #ffffff;"></i>
                  </button>
                </div>
            </div>
        `;

        orderItemsWrapper.append(orderItemCard);
    }
}

function listingCardClasses(htmlElement) {
    htmlElement.classList.add('rounded-lg');
    htmlElement.classList.add('shadow-lg');
    htmlElement.classList.add('grid');
    htmlElement.classList.add('grid-cols-4');
    htmlElement.classList.add('gap-2');
    htmlElement.classList.add('overflow-hidden');
    htmlElement.classList.add('mb-1');
    htmlElement.classList.add('mt-1');
}

let orderListings = [
    {
        id: 1,
        image: 'https://cdn.dummyjson.com/product-images/2/1.jpg',
        title: 'iPhone X',
        description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with a new generation of Apple Silicon',
        amount: 1,
        price: 32.00
    },
    {
        id: 2,
        image: 'https://cdn.dummyjson.com/product-images/4/1.jpg',
        title: 'OPPOF19',
        description: 'New OPPO F19 unveiled in 2023, with the newest Tensor cores and Snapdragon 898',
        amount: 1,
        price: 10.00
    },
    {
        id: 3,
        image: 'https://cdn.dummyjson.com/product-images/8/1.jpg',
        title: 'Microsoft Surface Laptop 4',
        description: 'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
        amount: 2,
        price: 5.00
    }
]; // TODO REMOVE WHEN CONNECTED TO BD

orderListingUpdate(orderListings)
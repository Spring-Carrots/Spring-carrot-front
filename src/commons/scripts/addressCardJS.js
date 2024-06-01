let addressCardsWrapper = document.getElementById('address-cards-wrapper');

function appendUserAddressCard(addressInfo) {
    let addressCard = document.createElement('div');
    buyerProfileInforCardClasses(addressCard);
    addressCard.classList.add('address-info-card');
    addressCard.setAttribute('data-address-id', addressInfo.addressId);

    addressCard.style.borderRadius = "1.5rem";
    addressCard.style.backgroundColor = "white";

    addressCard.innerHTML = `
    <div class="flex flex-row mt-5">
        <p class="address-info-text">Calle:</p><p class="address-info-display">${addressInfo.street}</p>
    </div>
    <div class="flex flex-row mt-5">
        <div class="flex flex-row">
            <p class="address-info-text">Provincia:</p><p class="address-info-display">${addressInfo.province}</p>
        </div>
        <div class="flex flex-row ml-6">
            <p class="address-info-text">País:</p><p class="address-info-display">${addressInfo.country}</p>
        </div>
    </div>
    <div class="flex flex-row mt-5">
        <p class="address-info-text">Cod. Postal:</p><p class="address-info-display">${addressInfo.postCode}</p>
    </div>
    `;

    addressCardsWrapper.append(addressCard);
}

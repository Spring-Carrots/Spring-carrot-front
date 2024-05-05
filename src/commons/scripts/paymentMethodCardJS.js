let paymentCardsWrapper = document.getElementById('payment-cards-wrapper');

function appendPaymentMethodCard(cardInfo) {
    let paymentCard = document.createElement('div');
    buyerProfileInforCardClasses(paymentCard);
    paymentCard.classList.add('payment-info-card');

    paymentCard.style.borderRadius = "1.5rem";
    paymentCard.style.backgroundColor = "white";

    paymentCard.innerHTML = `
    <div class="flex flex-row mt-5">
        <div class="flex flex-row">
            <p class="card-info-text">Tipo:</p><p id="number-info-display" class="card-info-display">${cardInfo.type}</p>
        </div>
        <div class="flex flex-row ml-6">
            <p class="card-info-text">Titular:</p><p id="name-info-display" class="card-info-display">${cardInfo.holder}</p>
        </div>
    </div>
    <div class="flex flex-row mt-5">
        <p class="card-info-text">Numero:</p><p id="type-info-display" class="card-info-display">${cardInfo.cardNumber}</p>
    </div>
    <div class="flex flex-row mt-5">
        <p class="card-info-text">Caducidad:</p><p id="date-info-display" class="card-info-display">${cardInfo.expiryDate}</p>
    </div>
    `;

    paymentCardsWrapper.append(paymentCard);
}
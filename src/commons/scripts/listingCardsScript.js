function setListingCardListeners() {
    let listingCards = document.getElementsByClassName('listing-card');

    for (let i = 0; i < listingCards.length; i++) {
        listingCards[i].addEventListener('click', () => {
            let hrefElement = event.target;
            while (hrefElement.getAttribute('data-href') === null) {
                hrefElement = hrefElement.parentNode;
            }

            window.location.href = hrefElement.getAttribute('data-href');
        })
    }
}
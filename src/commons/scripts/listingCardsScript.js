function setListingCardListeners() {
    let listingCards = document.getElementsByClassName('listing-card');

    for (let i = 0; i < listingCards.length; i++) {
        listingCards[i].addEventListener('click', () => {
            let hrefElement = event.target;
            while (hrefElement.getAttribute('data-product-id') === null) {
                hrefElement = hrefElement.parentNode;
            }

            localStorage.setItem('listingDetailId', hrefElement.getAttribute('data-product-id'));

            window.location.href = `http://localhost:63342/SpringCarrot/src/product_detail/listingDetail.html`
        })
    }
}
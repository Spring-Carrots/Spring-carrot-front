function toCartListener() {
    let toCartButtons = document.getElementsByClassName('listing-to-cart');

    for (let i = 0; i < toCartButtons.length; i++) {
        toCartButtons[i].addEventListener('click', async () => {
            event.stopPropagation();

            let loggedUser = sessionStorage.getItem('logged-user');
            loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

            let listingId = event.target.getAttribute('data-value');

            if (loggedUser !== null) {
                await fetch(`http://localhost:5237/api/Api/agregar-producto-a-carrito/${loggedUser.id}/${listingId}/1`, {
                    method: 'POST'
                }).then(res => {
                    if (res.ok) {
                        console.log('cart updated');
                    }
                })
            }
        })
    }
}
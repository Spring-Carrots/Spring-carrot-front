function toWantedListeners() {
    let toWantedButtons = document.getElementsByClassName('listing-to-wanted');

    for (let i = 0; i < toWantedButtons.length; i++) {
        toWantedButtons[i].addEventListener('click', async () => {
            event.stopPropagation();

            let loggedUser = sessionStorage.getItem('logged-user');
            loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

            let listingId = event.target.getAttribute('data-value');

            if (loggedUser !== null) {
                await fetch(`http://localhost:5237/api/Api/agregar-producto-a-deseos/${loggedUser.id}/${listingId}`, {
                    method: 'POST'
                }).then(res => {
                    if (res.ok) {
                        console.log('wanted updated');
                    }
                })
            }
        })
    }
}
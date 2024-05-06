function toLaterListener() {
    let toLaterButton = document.getElementById('listing-add-to-later');

    toLaterButton.addEventListener('click', async () => {
        event.stopPropagation();

        let loggedUser = sessionStorage.getItem('logged-user');
        loggedUser = loggedUser === null ? null : JSON.parse(loggedUser);

        let listingId = event.target.getAttribute('data-value');

        if (loggedUser !== null) {
            await fetch(`http://localhost:5237/api/Api/agregar-producto-a-guardados/${loggedUser.id}/${listingId}`, {
                method: 'POST'
            }).then(res => {
                if (res.ok) {
                    console.log('later updated');
                }
            })
        }
    })
}
async function loadLater() {
    if (loggedUser !== null) {
        profileListsListingWrapper.innerHTML = '';
        mainProfileSection.hidden = true;
        listsHeaderWrapper.innerHTML = `
            <i class="fa-solid fa-list" style="color: #adc178; font-size: 2rem; margin-right: 1rem"></i>
            <h2 id="catalog-section-header" style="font-weight: bold">Guardado para más tarde</h2>
        `;
        profileListsWrapper.hidden = false;
        await fetch(`http://localhost:5237/api/Api/obtener-guardados/${loggedUser.id}`)
            .then(res=> res.json())
            .then((json) => {
                if (json !== undefined) {
                    if (json.length <= 0) {
                        let emptyElement = addEmpty(document.createElement('div'));
                        profileListsListingWrapper.append(emptyElement);
                    } else {
                        let listingIds = [];
                        for (let i = 0; i < json.length; i++) {
                            let listing = createListing(document.createElement('div'), json[i], 'later');
                            profileListsListingWrapper.append(listing);
                            listingIds.push(json[i].id);
                        }

                        sessionStorage.setItem('laterListIds', JSON.stringify(listingIds));

                        deleteLaterListeners();
                        setListingCardListeners();
                    }
                }
            })
    }
}

function deleteLaterListeners() {
    let laterDeleteButtons = document.getElementsByClassName('later-to-trash');

    for (let i = 0; i < laterDeleteButtons.length; i++) {
        laterDeleteButtons[i].addEventListener('click', async () => {
            event.stopPropagation();

            let laterList = JSON.parse(sessionStorage.getItem('laterListIds'));
            let listingId = event.target.getAttribute('data-value');

            if (laterList.indexOf(listingId) === -1) {
                await fetch(`http://localhost:5237/api/Api/eliminar-producto-a-guardados/${loggedUser.id}/${listingId}`, {
                    method: 'POST'
                }).then(res => {
                    if (res.ok) {
                        loadLater();
                    }
                })
            }
        })
    }
}
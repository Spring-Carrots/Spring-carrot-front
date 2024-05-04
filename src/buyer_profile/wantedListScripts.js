async function  loadWanted() {
    if (loggedUser !== null) {
        profileListsListingWrapper.innerHTML = '';
        mainProfileSection.hidden = true;
        listsHeaderWrapper.innerHTML = `
            <i class="fa-solid fa-star" style="color: #adc178; font-size: 2rem; margin-right: 1rem"></i>
            <h2 id="catalog-section-header" style="font-weight: bold">Lista de favoritos</h2>
        `;
        profileListsWrapper.hidden = false;
        await fetch(`http://localhost:5237/api/Api/obtener-deseos/${loggedUser.id}`)
            .then(res=> res.json())
            .then((json) => {
                if (json !== undefined) {
                    if (json.length <= 0) {
                        let emptyElement = addEmpty(document.createElement('div'), '20rem', '1.5rem');
                        profileListsListingWrapper.append(emptyElement);
                    } else {
                        let wantedListingIds = [];
                        for (let i = 0; i < json.length; i++) {
                            let listing = createListing(document.createElement('div'), json[i], 'wanted');
                            profileListsListingWrapper.append(listing);
                            wantedListingIds.push(json[i].id);
                        }

                        sessionStorage.setItem('wantedListIds', JSON.stringify(wantedListingIds));

                        setListingCardListeners();
                        deleteWantedListeners();
                    }
                }
            })
    }
}

function deleteWantedListeners() {
    let wantedDeleteButtons = document.getElementsByClassName('wanted-to-trash');

    for (let i = 0; i < wantedDeleteButtons.length; i++) {
        wantedDeleteButtons[i].addEventListener('click', async () => {
            event.stopPropagation();

            let wantedList = JSON.parse(sessionStorage.getItem('wantedListIds'));
            let listingId = event.target.getAttribute('data-value');

            if (wantedList.indexOf(listingId) === -1) {
                await fetch(`http://localhost:5237/api/Api/eliminar-producto-a-deseos/${loggedUser.id}/${listingId}`, {
                    method: 'POST'
                }).then(res => {
                    if (res.ok) {
                        loadWanted();
                    }
                })
            }
        })
    }
}
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function nextSlide() {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlide();
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems - 1;
    }
    updateSlide();
}

function updateSlide() {
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function buyerProfileInforCardClasses(htmlElement) {
    htmlElement.classList.add('shadow-lg');
    htmlElement.classList.add('flex');
    htmlElement.classList.add('flex-col');
    htmlElement.classList.add('p-5');
    htmlElement.classList.add('w-full');
    htmlElement.classList.add('mb-8');
}

function addEmpty(emptyElement, imgWidth, fontSize) {
    emptyElement.style.margin = '5rem 0';
    emptyElement.innerHTML = `
        <div class="flex flex-col items-center">
            <img src="https://clipart-library.com/images/kTKxRaBTj.png" style="width: ${imgWidth}">
            <h1 style="font-weight: lighter; font-size: ${fontSize}; margin: 1.25rem 0">Aqui no hay nada...</h1>
        </div>
    `;

    return emptyElement;
}

// TODO: MAKE AND EXPORT GLOBAL CATALOG GENERATOR

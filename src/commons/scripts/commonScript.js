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

// TODO: MAKE AND EXPORT GLOBAL CATALOG GENERATOR

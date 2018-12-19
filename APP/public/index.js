function swipeOverlay(container) {
    if (!container.classList.contains('swipe-up-animation')) {
        container.classList.remove('swipe-down-animation')
        container.classList.add('swipe-up-animation')
    } else {
        container.classList.remove('swipe-up-animation')
        container.classList.add('swipe-down-animation')
    }
}

if (window) {
    window.addEventListener('load', function() {
        let overlayContainer = document.querySelector('.overlay-container')
        overlayContainer.addEventListener('click', function () {
            swipeOverlay(overlayContainer)
        })
    })
}    
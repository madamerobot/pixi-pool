function swipeOverlay(container, layout) {
    if (!container.classList.contains('swipe-up-animation')) {
        container.classList.remove('swipe-down-animation')
        container.classList.add('swipe-up-animation')
        layout.classList.remove('text-disappear')
        layout.classList.add('text-appear')
    } else {
        container.classList.remove('swipe-up-animation')
        layout.classList.remove('text-appear')
        layout.classList.add('text-disappear')
        container.classList.add('swipe-down-animation')
    }
}

function updateContent(path) {
    let contentTag = path.split('#/')[1]
    let allContent = Array.from(document.querySelectorAll('.content'))
    allContent.map(content => {
        if (content.id !== contentTag) {
            content.classList.remove("show")
        }
        else {
            content.classList.add("show")
        }
    })
}

if (window) {
    window.addEventListener('load', function() {
        let overlayContainer = document.querySelector('.overlay-container')
        let layoutWrapper = document.querySelector('.layout-wrapper')
        overlayContainer.addEventListener('click', function () {
            swipeOverlay(overlayContainer, layoutWrapper)
        })
        updateContent(window.location.href)
        swipeOverlay(overlayContainer, layoutWrapper)
    })
    window.addEventListener('hashchange', function() {
        updateContent(window.location.href)
    })
}
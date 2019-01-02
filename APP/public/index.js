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

    let defaultPath = ''

    if (path.indexOf("#") > -1) {
        defaultPath = path
    } else {
        defaultPath = '#/about-me'
    }

    let contentTag = defaultPath .split('#/')[1]
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
        let closeCross = document.querySelector('.cross-close')
        let clickZone = document.querySelector('.click-zone')
        let nextArrows = document.querySelectorAll('.next-arrow')

        updateContent(window.location.href)

        if (window.location.href.indexOf("#") > -1){
            swipeOverlay(overlayContainer, layoutWrapper)
        }

        closeCross.addEventListener('click', function() {
            updateContent(window.location.href)
            swipeOverlay(overlayContainer, layoutWrapper)
        })

        // clickZone.addEventListener('click', function() {
        //     updateContent(window.location.href)
        //     swipeOverlay(overlayContainer, layoutWrapper)
        // })

        nextArrows.forEach(item => item.addEventListener('click', function() {
            enterNextPage()
        }))
        
    })
    window.addEventListener('hashchange', function() {
        updateContent(window.location.href)
    })
}

function enterNextPage() {
    let allPages = ['/about-me', '/work', '/teaching-and-speaking', '/cafe-robot']
    let currentPage = window.location.href.split('#')[1]
    let index = allPages.indexOf(currentPage)
    let nextPageIndex = index + 1
    if (nextPageIndex === allPages.length) {
        nextPageIndex = 0
    }
    window.location = `#${allPages[nextPageIndex]}`
}
function enterNextPage() {
    let allPages = ['/about-me', '/work', '/teaching-and-speaking', '/cafe-robot']
    let currentPage = window.location.href.split('#')[1]
    let index = allPages.indexOf(currentPage)
    let nextPageIndex = index + 1
    if (nextPageIndex === allPages.length) {
        nextPageIndex = 0
    }

    let cleanIds = allPages.map(page => page.split('/')[1])
    
    let previousContent = document.getElementById(`${cleanIds[index]}`)
    let nextContent = document.getElementById(`${cleanIds[nextPageIndex]}`)

    previousContent.classList.remove('content-transition-in')
    previousContent.classList.add('content-transition-out')
    nextContent.classList.add('content-transition-in')

    window.location = `#${allPages[nextPageIndex]}`
}

function swipeOverlay(container, layout) {
    if (!container.classList.contains('swipe-up-animation')) {
        container.classList.remove('swipe-down-animation')
        container.classList.add('swipe-up-animation')
        layout.classList.remove('content-transition-out')
        layout.classList.add('content-transition-in')
    } else {
        container.classList.remove('swipe-up-animation')
        layout.classList.remove('content-transition-in')
        layout.classList.add('content-transition-out')
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

    let contentTag = defaultPath.split('#/')[1]
    let allContent = Array.from(document.querySelectorAll('.content'))
    let allHeadlines = Array.from(document.querySelectorAll('.headline'))
    let headlineId = `hl-${contentTag}`
    
    allContent.map(content => {
        if (content.id !== contentTag) {
            content.classList.remove("show")
            allHeadlines.filter(headline => headline.id != headlineId)
            allHeadlines.forEach(headline => headline.classList.remove("animate-hl"))
        }
        else {
            content.classList.add("show")
            let currentHeadline = document.getElementById(headlineId)
            setTimeout(function() { currentHeadline.classList.add("animate-hl") }, 940)
        }
        if (content.id === 'privacy') {
            let eye = document.getElementById("eye-ball")
            setTimeout(function() { eye.classList.add("eye-roll-animation") }, 940)
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
        let toggleHeader = document.querySelectorAll('.toggle-header')

        updateContent(window.location.href)

        if (window.location.href.indexOf("#") > -1){
            swipeOverlay(overlayContainer, layoutWrapper)
        }

        closeCross.addEventListener('click', function() {
            swipeOverlay(overlayContainer, layoutWrapper)
        })

        clickZone.addEventListener('click', function() {
            updateContent(window.location.href)
            swipeOverlay(overlayContainer, layoutWrapper)
        })

        nextArrows.forEach(item => item.addEventListener('click', function() {
            enterNextPage()
        }))        
    })
    window.addEventListener('hashchange', function() {
        updateContent(window.location.href)
        let overlayContainer = document.querySelector('.overlay-container')
        let layoutWrapper = document.querySelector('.layout-wrapper')
        if (!overlayContainer.classList.contains('swipe-up-animation')) {
            swipeOverlay(overlayContainer, layoutWrapper) 
        }
    })
}
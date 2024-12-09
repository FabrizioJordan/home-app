
const $ = selector => document.querySelector(selector)

// variables 
const $homeBtn = document.getElementById('showHomeView')
const $documentsBtn = document.getElementById('showDocumentsView')
const $downloadsBtn = document.getElementById('showDownloadsView')
const $musicBtn = document.getElementById('showMusicView')
const $photosBtn = document.getElementById('showPhotosView')
const $videosBtn = document.getElementById('showVideosView')


// ID de la vista actual guardado en localStorage
const VIEW_STORAGE_KEY = 'currentView';




// hide all of the no home views with for each of querySelectorAll
const homeInitialView = () => {
    document.querySelectorAll('.documentsView').forEach(view => view.style.display = 'none')
    document.querySelectorAll('.downloadsView').forEach(view => view.style.display = 'none')
    document.querySelectorAll('.musicView').forEach(view => view.style.display = 'none')
    document.querySelectorAll('.photosView').forEach(view => view.style.display = 'none')
    document.querySelectorAll('.videosView').forEach(view => view.style.display = 'none')
}

const hideAllViews = () => {
    document.querySelectorAll('.homeView').forEach(view => view.style.display = 'none')
    document.querySelectorAll('.documentsView').forEach(view => view.style.display = 'none')
    document.querySelectorAll('.downloadsView').forEach(view => view.style.display = 'none')
    document.querySelectorAll('.musicView').forEach(view => view.style.display = 'none')
    document.querySelectorAll('.photosView').forEach(view => view.style.display = 'none')
    document.querySelectorAll('.videosView').forEach(view => view.style.display = 'none')
}

homeInitialView()

/*
// code
documentsBtn.addEventListener('click', () => {
    showView('documentsView');
    window.executeAndHandleResult('getWindowsDocumentsFiles', 'listOfDocumentsFiles');
});
downloadsBtn.addEventListener('click', () => {
    showView('downloadsView');
    executeAndHandleResult('getWindowsDownloadsFiles', 'listOfDownloadsFiles');
});
musicBtn.addEventListener('click', () => {
    showView('musicView');
    executeAndHandleResult('getWindowsMusicFiles', 'listOfMusicFiles');
});
photosBtn.addEventListener('click', () => {
    showView('photosView');
    executeAndHandleResult('getWindowsPhotosFiles', 'listOfPhotosFiles');
});
videosBtn.addEventListener('click', () => {
    showView('videosView');
    executeAndHandleResult('getWindowsVideosFiles', 'listOfVideosFiles');
});
*/

// function to show new view
function showView(viewId) {

    hideAllViews()
    document.querySelectorAll(`.${viewId}`).forEach(view => {
        view.style.display = 'block';
    });

        // Guardar el ID de la vista actual en localStorage
        localStorage.setItem(VIEW_STORAGE_KEY, viewId);
}


// Mostrar la vista guardada en localStorage cuando la página se cargue
window.addEventListener('load', () => {
    const currentViewId = localStorage.getItem(VIEW_STORAGE_KEY);
    if (currentViewId) {
        showView(currentViewId);
    }
});



const viewFolderPath = './views/';
const imageFolderPath = './assets/img/';

// ====== Input Your Category and Category's list ===== //
const categoryListDictionary = {
    'nature' : [
        'nature1', 'nature2', 'nature3', 'nature4',
    ],
    'food' : [
        'food1', 
    ],
}

const parseHTML = (path) => {
    return path + ".html";
}

const parsePNG = (path) => {
    return path + ".png";
}

const getSessionStorageCurPageNum = () => {
    if (!window.performance) { return 0; }

    const navigationType =  window.performance.getEntriesByType('navigation')[0].type;
    if((navigationType!=='back_forward' && navigationType!=='reload')) { return 0; }
    
    if (('sessionStorage' in window) && window['sessionStorage'] !== null) {
        const getCurPageNum = sessionStorage.getItem('curPageNum');
        if (getCurPageNum >= 0) {
            return getCurPageNum;
        }
    }

    return 0;
}

const setSessionStorageCurPageNum = (selectListNum) => {
    if (('sessionStorage' in window) && window['sessionStorage'] !== null) {
        sessionStorage.setItem("curPageNum", selectListNum);
    }
}

const getSessionStorageCurListNum = () => {
    if (!window.performance) { return 0; }

    const navigationType =  window.performance.getEntriesByType('navigation')[0].type;
    //if((navigationType !== 'back_forward' && navigationType !== 'reload')) { return 0; }
    
    if (('sessionStorage' in window) && window['sessionStorage'] !== null) {
        const getListNum = Number(sessionStorage.getItem('curListNum'));
        if (getListNum >= 0) {
            return getListNum;
        }
    }

    return 0;
}

const setSessionStorageCurListNum = (selectListNum) => {
    if (('sessionStorage' in window) && window['sessionStorage'] !== null) {
        sessionStorage.setItem("curListNum", Number(selectListNum));
    }
}

const removeSessionStorgeCurListNum = () => {
    if (!window.performance) { return; }

    const navigationType =  window.performance.getEntriesByType('navigation')[0].type;
    if((navigationType!=='back_forward' && navigationType!=='reload')) { return; }
    
    if (('sessionStorage' in window) && window['sessionStorage'] !== null) {
        sessionStorage.removeItem('curListNum');
    }
}

const navBar = document.getElementsByClassName('navbar')
const mainContent = document.getElementById('main-content');
const footer = document.getElementById('footer');
const mainContentHeight = () => {
  if(mainContent === null || footer === null) return;

  const footerHeight = footer.clientHeight
  const navBarHeight = navBar[0] !== null ? navBar[0].clientHeight : 0;

  mainContent.style.minHeight = window.innerHeight - footerHeight - navBarHeight + 'px';
}
mainContentHeight();
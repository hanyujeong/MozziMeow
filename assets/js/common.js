const viewFolderPath = './views/';
const imageFolderPath = './assets/img/';

// ====== Input Your Category and Category's list ===== //
const categoryListDictionary = {
    'nature' : [
        'dancing_dancing_cats', 'white_christmas_cat_house',
        'cats_hiding_in_flowers', 'a_cat_lying_on_the_grass', 'cats_running_through_the_yellow_grass', 'cats_playing_music_in_the_flower_garden',
    ],
    'food' : [
        'santa_cats_cake', 
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

const regExpUnderBarToSpace = /[_]+/gi;
const replaceUnderBarToSpace = (str) => {

    return str.replace(regExpUnderBarToSpace, ` `);
}

const regExpCapitalizeFirstLetter = /\b\w/g;
const capitalizeFirstLetters = (str) => {

    return str.replace(regExpCapitalizeFirstLetter, (char) => char.toUpperCase());
}

const capitalizeFirstLetter = (str) => {
    if (str.length === 0) return str;

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const nav = document.getElementsByTagName('nav');
const mainContent = document.getElementById('main-content');
const footer = document.getElementsByTagName('footer');
const mainContentHeight = () => {
  if(mainContent === null || footer === null) return;

  const footerHeight = footer[0].clientHeight
  const navBarHeight = nav !== null ? nav[0].clientHeight : 0;

  mainContent.style.minHeight = window.innerHeight - footerHeight - navBarHeight + 'px';
}
mainContentHeight();
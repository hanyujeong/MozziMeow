const viewFolderPath = './views/';
const imageFolderPath = './assets/img/';

// ====== Input Your Category and Category's list ===== //
const categoryListDictionary = {
    'category1' : [
        'list1', 'list2', 'list1', 'list2', 'list1',
        'list1', 'list2', 'list1', 'list2', 'list1',
    ],
    'category2' : [
        'list1', 'list2', 'list1', 'list2', 'list1',
        'list1', 'list2', 'list1', 'list2', 'list1',
        'list1', 'list2', 'list1', 'list2', 'list1',
        'list1', 'list2', 'list1', 'list2', 'list1',
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

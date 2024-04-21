const categorys = Object.keys(categoryListDictionary);
const lists = Object.values(categoryListDictionary);

let curListNum = 0;

let selectCategoryName = "";
let selectListName = "";
const getSelectCategoryName = () => {
    const pathname = window.location.pathname;
    const pathnameSplit = pathname.split('/');
    const categotyName = pathnameSplit[pathnameSplit.length - 2];
    selectCategoryName = categotyName;
}

const getSelectListName = () => {
    const pathname = window.location.pathname;
    const pathnameSplit = pathname.split('/');
    const listFile = pathnameSplit[pathnameSplit.length - 1];
    const listName = listFile.split('.')[0];
    selectListName = listName;
}

let isBackForward = false;
const windowScrollReset = () => {
    if (!isBackForward && window.performance) {
        const navigationType = window.performance.getEntriesByType('navigation')[0].type;
        if(navigationType==='back_forward') {
            isBackForward = true;
            return; 
        }
    }
    window.scrollTo({top:0, behavior: "smooth"});
}

const getSessionStorageCurListNum = () => {
    if (!window.performance) { return; }

    const navigationType =  window.performance.getEntriesByType('navigation')[0].type;
    if((navigationType!=='back_forward' && navigationType!=='reload')) { return; }
    
    if (('sessionStorage' in window) && window['sessionStorage'] !== null) {
        const getListNum = sessionStorage.getItem('curListNum');
        if (getListNum) {
            curPageNum = getListNum;
        }
    }
}

getSessionStorageCurListNum();
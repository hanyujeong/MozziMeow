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

const getSelectCategoryName = () => {
    const pathname = window.location.pathname;
    const pathnameSplit = pathname.split('/');
    const categotyName = pathnameSplit[pathnameSplit.length - 2];
    
    return categotyName;
}
const selectCategoryName = getSelectCategoryName();

const getSelectListName = () => {
    const pathname = window.location.pathname;
    const pathnameSplit = pathname.split('/');
    const listFile = pathnameSplit[pathnameSplit.length - 1];
    const listName = listFile.split('.')[0];

    return listName;
}
const selectListName = getSelectListName();

const getSelectCategoryLists = () => {
    const selectCategoryLists = categoryListDictionary[selectCategoryName];
    
    return selectCategoryLists;
}
const selectCategoryLists = getSelectCategoryLists();
const selectCategoryListsCount = selectCategoryLists?.length;

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

    //const navigationType =  window.performance.getEntriesByType('navigation')[0].type;
    //if((navigationType !== 'back_forward' && navigationType !== 'reload')) { return 0; }
    
    if (('sessionStorage' in window) && window['sessionStorage'] !== null) {
        const curListNum = sessionStorage.getItem('curListNum');
        if(!curListNum) {
            for(let i = 0; i < selectCategoryListsCount; i++) {
                if(selectCategoryLists[i] === selectListName) {
                    const getListNum = i;
                    setSessionStorageCurListNum(getListNum);
                    return getListNum;
                }
            }
            return 0;
        }

        const getListNum = Number(curListNum);
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

const onscroll = (element, listener) => {
    element.addEventListener('scroll', listener)
}
const reInitBacktotop = () => {
    const backtotop = document.getElementsByClassName('back-to-top')[0];
    const toggleBacktotop = () => {
        if (window.scrollY > 100) {
            backtotop.classList.add('active')
        } else {
            backtotop.classList.remove('active')
        }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
}

const setNavbarSurpportedContentlist = () => {
    const navbarSupportedContent = document.getElementById('navbarSupportedContent');
    const listTag = navbarSupportedContent.firstElementChild;

    const list = 
    `<li class="nav-item"><a class="nav-link" href=${selectListName !== 'index' ? '../../index.html' : './index.html'}>Home</a></li>
    <li class="nav-item"><a class="nav-link" href="https://blog.naver.com/profile/intro.naver?blogId=shootfruit">About</a></li>
    <li class="nav-item"><a class="nav-link" href="https://blog.naver.com/guestbook/GuestBookList.naver?blogId=shootfruit&skinType=&skinId=&from=menu">Contact</a></li>
    <li class="nav-item"><a class="nav-link active" aria-current="page" href="https://blog.naver.com/PostList.naver?blogId=shootfruit&from=postList&categoryNo=25">Blog</a></li>`;

    listTag.insertAdjacentHTML("afterbegin", list);
}

const mainContentHeight = () => {
    const nav = document.getElementsByTagName('nav');
    const mainContent = document.getElementById('main-content');
    const footer = document.getElementsByTagName('footer');

    if(mainContent === null || footer.length <= 0) return;

    const footerHeight = footer[0].clientHeight
    const navBarHeight = nav.length > 0 ? nav[0].clientHeight : 0;

    mainContent.style.minHeight = window.innerHeight - footerHeight - navBarHeight + 'px';
}

const footerLayoutId = document.getElementById("footer-layout");
if(footerLayoutId) {
    const footerCallback = (mutationsList, observer) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeName === 'FOOTER') {
                        mainContentHeight();
                        reInitBacktotop();
                        setNavbarSurpportedContentlist();
                        observer.disconnect();
                    }
                });
            }
        }
    };
    
    const footerObserver = new MutationObserver(footerCallback);
    const footerObserverConfig = { attributes: false, childList: true, subtree: false };
    
    footerObserver.observe(footerLayoutId, footerObserverConfig);
} else {
    // Setting for index.html
    setNavbarSurpportedContentlist();
}

window.addEventListener('resize', () => {
    mainContentHeight();
})
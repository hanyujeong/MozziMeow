const categorys = Object.keys(categoryListDictionary);

let curPageNum = 0;
const perPageListCount = 6;

let selectCategoryName = "";
const getSelectCategoryName = () => {
    const pathname = window.location.pathname;
    const pathnameSplit = pathname.split('/');
    const categotyFile = pathnameSplit[pathnameSplit.length - 1];
    const categoryName = categotyFile.split('.')[0];
    selectCategoryName = categoryName;
}

let selectCategoryList = [];
let selectCategoryListCount = 0;
const getSelectCategoryList = () => {
    selectCategoryList = categoryListDictionary[selectCategoryName];
    selectCategoryListCount = selectCategoryList.length;
}

const categorySidebarNav = document.getElementById("sidebar-nav");
const categorySidebsarNavMaker = () => {
    for(let i = 0; i < categorys.length; i++) {
        const categoryName = categorys[i];
        const categoryViewPath = parseHTML(`${categoryName}`);
        
        const sidebarNav = sidebarNavHTML(categoryViewPath, categoryName, i);
        categorySidebarNav.innerHTML += sidebarNav;
    }
}

const sidebarNavHTML = (viewPath, categoryName, count) => {
    const sidebarNav =
    `<li class="nav-item">
        <a class="nav-link ${count == 0 ? "" : "collapsed"}" href="${viewPath}">
            <i class="bi bi-grid"></i>
            <span>${categoryName}</span>
        </a>
    </li>`;

    return sidebarNav;
}

const categoryCardList = document.getElementById("category-card-list");
const categoryListCardMaker = () => {
    categoryCardList.innerHTML = "";

    let startListNum = curPageNum * perPageListCount;
    let lastListNum = startListNum + perPageListCount;
    
    //Check lack list count of last page
    const lackPageListCount = perPageListCount - (selectCategoryListCount - startListNum);
    lastListNum -= (lackPageListCount > 0 ? lackPageListCount : 0);
    for(let i = startListNum; i < lastListNum; i++) {
        const categoryImgPath = parsePNG(`../../${imageFolderPath}list/${selectCategoryList[i]}`);
        const categoryViewPath = parseHTML(`../../${listFolderPath}${selectCategoryList[i]}`);
        
        const card = categoryCardHTML(categoryImgPath, categoryViewPath);
        categoryCardList.innerHTML += card;
    }

    windowScrollReset();
}

const categoryCardHTML = (imgPath, viewPath) => {
    const card =
    `<div class="col">
        <div class="card shadow-sm">
        <img src="${imgPath}" class="bd-placeholder-img card-img-top" width="100%" height="225" alt="Card image cap">

        <div class="card-body">
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="location.href='${viewPath}'">View</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                
            </div>
            <small class="text-muted">9 mins</small>
            </div>
        </div>
        </div>
    </div>`;

    return card;
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

const getSessionStorageCurPageNum = () => {
    if (!window.performance) { return; }

    const navigationType =  window.performance.getEntriesByType('navigation')[0].type;
    if((navigationType!=='back_forward' && navigationType!=='reload')) { return; }
    
    if (('sessionStorage' in window) && window['sessionStorage'] !== null) {
        const getCurPageNum = sessionStorage.getItem('curPageNum');
        if (getCurPageNum) {
            curPageNum = getCurPageNum;
        }
    }
}

const pageNumDiv = document.getElementById("page-num");
const pageNumMaker = () => {
    const categorysQuatient = parseInt(selectCategoryListCount / perPageListCount);
    const categorysRemainder = selectCategoryListCount % perPageListCount;

    // Check Remain List Count and If Remain, add 1Page
    const categoryPageCount = categorysRemainder > 0 ? categorysQuatient + 1 : categorysQuatient;
    for(let i = 0; i < categoryPageCount; i++) {
        const categoryListPageNum = `<a href="javascript:pageListChange(${i})">${i + 1}</a>`

        pageNumDiv.innerHTML += categoryListPageNum;
    }
}

const pageListChange = (selectPageNum) => {
    curPageNum = selectPageNum;
    if (('sessionStorage' in window) && window['sessionStorage'] !== null) {
        sessionStorage.setItem("curPageNum", curPageNum);
    }

    categoryListCardMaker();
    preNextPageButton();
}

const prePageButton = document.getElementById("pre-page-button");
const nextPageButton = document.getElementById("next-page-button");
const preNextPageButton = () => {
    prePageButton.innerHTML = "";
    nextPageButton.innerHTML = "";

    if(curPageNum != 0) {
        prePageButton.innerHTML += pageButtonHTML(curPageNum - 1, "pre"); 
    }
    if(selectCategoryListCount - (curPageNum * perPageListCount) > 6) { 
        nextPageButton.innerHTML += pageButtonHTML(curPageNum + 1, "next"); 
    }
}

const pageButtonHTML = (setPageNum, type) => {
    const button = 
    `<a href="javascript:pageListChange(${setPageNum})">${type}</a>`;

    return button;
}

// Function Running
getSelectCategoryName();
getSelectCategoryList();
categorySidebsarNavMaker();
getSessionStorageCurPageNum();
pageListChange(curPageNum);
pageNumMaker();
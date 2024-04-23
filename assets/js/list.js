const categorys = Object.keys(categoryListDictionary);

const curListNum = getSessionStorageCurListNum();

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

let selectLists = [];
let selectListsCount = 0;
const getSelectLists = () => {
    selectLists = categoryListDictionary[selectCategoryName];
    selectListsCount = selectLists.length;
}

const categorySidebarNav = document.getElementById("sidebar-nav");
const categorySidebsarNavMaker = () => {
    for(let i = 0; i < categorys.length; i++) {
        const categoryName = categorys[i];
        const categoryViewPath = parseHTML(`../${categoryName}/${categoryName}`);
        
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

const listChange = (selectListNum) => {
    setSessionStorageCurListNum(selectListNum);
    
    const listViewPath = parseHTML(`../../${viewFolderPath}${selectCategoryName}/${selectLists[selectListNum]}`);
    window.location.replace(listViewPath);
}

const prePageButton = document.getElementById("pre-page-button");
const nextPageButton = document.getElementById("next-page-button");
const preNextPageButton = () => {
    prePageButton.innerHTML = "";
    nextPageButton.innerHTML = "";

    if(curListNum != 0) {
        prePageButton.innerHTML += pageButtonHTML(curListNum - 1, "pre");
    }
    if(curListNum != (selectListsCount - 1)) { 
        prePageButton.innerHTML += pageButtonHTML(curListNum + 1, "next");
    }
}

const pageButtonHTML = (setListNum, type) => {
    const button = 
    `<a href="javascript:listChange(${setListNum})">${type}</a>`;

    return button;
}

getSelectCategoryName();
getSelectListName();
getSelectLists();
categorySidebsarNavMaker();
preNextPageButton();
windowScrollReset();
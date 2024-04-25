const categorys = Object.keys(categoryListDictionary);

let curPageNum = getSessionStorageCurPageNum();
const perPageListCount = 6;

let selectCategoryName = "";
const getSelectCategoryName = () => {
    const pathname = window.location.pathname;
    const pathnameSplit = pathname.split('/');
    const categoryName = pathnameSplit[pathnameSplit.length - 2];
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
        const categoryViewPath = parseHTML(`../${categoryName}/${categoryName}`);
        
        const sidebarNav = sidebarNavHTML(categoryViewPath, categoryName, i);
        categorySidebarNav.innerHTML += sidebarNav;
    }
}

const sidebarNavHTML = (viewPath, categoryName, count) => {
    const sidebarNav =
    `<li class="nav-item">
        <a class="nav-link ${selectCategoryName == categoryName ? "" : "collapsed"}" href="${viewPath}">
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
        const selectListName = selectCategoryList[i];
        const categoryImgPath = parsePNG(`../../${imageFolderPath}category/${selectCategoryName}/${selectListName}`);
        
        const card = categoryCardHTML(categoryImgPath, i, selectListName);
        categoryCardList.innerHTML += card;
    }

    windowScrollReset();
}

const categoryCardHTML = (imgPath, viewNum, selectListName) => {
    const card =
    `<label for="view-${viewNum}">
        <div class="col custom-cursor">
            <div class="card shadow-sm">
                <img src="${imgPath}" class="bd-placeholder-img card-img-top" width="100%" height="225" alt="Card image cap">
                <div class="card-body">
                    <div class="my-2">
                        <p class="card-text fw-bolder">${capitalizeFirstLetter(replaceUnderBarToSpace(selectListName))}</p>
                    </div>
                    <div class="d-flex justify-content-end align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" id="view-${viewNum}" onclick="javascript:gotoList(${viewNum})">View</button>
                        </div>
                        <small class="text-muted"></small>
                    </div>
                </div>
            </div>
        </div>
    </label>`;

    return card;
}

const gotoList = (selectListNum) => {
    setSessionStorageCurListNum(selectListNum);

    const categoryViewPath = parseHTML(`../../${viewFolderPath}${selectCategoryName}/${selectCategoryList[selectListNum]}`);
    window.location.href=categoryViewPath;
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

let categorysQuatient = 0;
let categorysRemainder = 0;
let categoryPageCount = 0;
const pageListCountChecker = () => {
    categorysQuatient = parseInt(selectCategoryListCount / perPageListCount);
    categorysRemainder = selectCategoryListCount % perPageListCount;

    // Check Remain List Count and If Remain, add 1Page
    categoryPageCount = categorysRemainder > 0 ? categorysQuatient + 1 : categorysQuatient;
}

const pageListChange = (selectPageNum) => {
    curPageNum = selectPageNum;
    setSessionStorageCurPageNum(curPageNum);

    categoryListCardMaker();
    pageNumMaker();
}

const pagination = document.getElementById("pagination");
const pageNumMaker = () => {
    pagination.innerHTML = "";

    let prePagenation = "";
    if(curPageNum != 0) {
        prePagenation =
        `<li class="page-item">
            <a class="page-link" href="javascript:pageListChange(${curPageNum - 1})">&laquo;</a>
        </li>`
    } else {
        prePagenation =
        `<li class="page-item disabled">
            <a class="page-link" href="#" aria-disabled="true">&laquo;</a>
        </li>`
    }
    pagination.insertAdjacentHTML("afterbegin", prePagenation);

    for(let i = 0; i < categoryPageCount; i++) {
        let categoryListPageNum = "";

        if(i != curPageNum) {
            categoryListPageNum = 
            `<li class="page-item">
                <a class="page-link" href="javascript:pageListChange(${i})">${i + 1}</a>
            </li>`
        } else {
            categoryListPageNum = 
            `<li class="page-item active" aria-current="page">
                <a class="page-link">${i + 1}</a>
            </li>`
        }
        pagination.insertAdjacentHTML("beforeend", categoryListPageNum);
    }

    let nextPagenation = "";
    if(selectCategoryListCount - (curPageNum * perPageListCount) > 6) {
        nextPagenation =
        `<li class="page-item">
            <a class="page-link" href="javascript:pageListChange(${curPageNum + 1})">&raquo;</a>
        </li>`
    } else {
        nextPagenation =
        `<li class="page-item disabled">
            <a class="page-link" aria-disabled="true">&raquo;</a>
        </li>`
    }
    pagination.insertAdjacentHTML("beforeend", nextPagenation);
}

// Function Running
getSelectCategoryName();
getSelectCategoryList();
categorySidebsarNavMaker();
pageListCountChecker();
pageListChange(curPageNum);
pageNumMaker();
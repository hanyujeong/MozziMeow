const categorys = Object.keys(categoryListDictionary);

const curListNum = getSessionStorageCurListNum();

const categorySidebarNav = document.getElementById("sidebar-nav");
const categorySidebsarNavMaker = () => {
    for(let i = 0; i < categorys.length; i++) {
        const categoryName = categorys[i];
        const categoryViewPath = parseHTML(`../${categoryName}/${categoryName}`);
        
        const sidebarNav = sidebarNavHTML(categoryViewPath, categoryName, i);
        categorySidebarNav.insertAdjacentHTML("beforeend", sidebarNav);
    }
}

const sidebarNavHTML = (viewPath, categoryName, count) => {
    const sidebarNav =
    `<li class="nav-item">
        <a class="nav-link ${categoryName == selectCategoryName ? "" : "collapsed"}" href="${viewPath}">
            <i class="bi bi-grid"></i>
            <span>${categoryName}</span>
        </a>
    </li>`;

    return sidebarNav;
}

const listChange = (selectListNum) => {
    setSessionStorageCurListNum(selectListNum);
    
    const listViewPath = parseHTML(`../../${viewFolderPath}${selectCategoryName}/${selectCategoryLists[selectListNum]}`);
    window.location.replace(listViewPath);
}

const pagenation = document.getElementById("pagination");
const pagenationButton = () => {
    pagenation.innerHTML = "";

    pagenation.insertAdjacentHTML("afterbegin", pagenationButtonHTML(
        curListNum != 0 ? curListNum - 1 : -1,
        `&laquo;`));

    pagenation.insertAdjacentHTML("beforeend", pagenationRandomHTML());
    
    pagenation.insertAdjacentHTML("beforeend", pagenationButtonHTML(
        curListNum != (selectCategoryListsCount - 1) ? curListNum + 1 : -1,
        `&raquo;`));
}

const pagenationButtonHTML = (setListNum, type) => {
    const html = 
    `<li class="page-item">
        <a class="page-link ${setListNum == -1 ? `disabled` : ``}" 
        ${setListNum != -1 ? `href="javascript:listChange(${setListNum})"` : ``}>${type}</a>
    </li>`;

    return html;
}

const pagenationRandomHTML = () => {
    let randomListNum = curListNum;

    if(selectCategoryListsCount > 1) {
        while(randomListNum == curListNum) {
            randomListNum = getRandomInt(selectCategoryListsCount);
        }
    }

    const html = 
    `<li class="page-item" aria-current="page">
        <a class="page-link" href="javascript:listChange(${randomListNum})">random</a>
    </li>`
    
    return html;
}

const getRandomInt = (max) => {
    return parseInt(Math.random() * max);
}


// Function Running
categorySidebsarNavMaker();
pagenationButton();
windowScrollReset();
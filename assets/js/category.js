let selectCategoryName = "";
const getSelectCategoryName = () => {
    const pathname = window.location.pathname;
    const pathnameSplit = pathname.split('/');
    const categotyFile = pathnameSplit[pathnameSplit.length - 1];
    const categoryName = categotyFile.split('.')[0];
    selectCategoryName = categoryName;
}

const categorySidebarNav = document.getElementById("sidebar-nav");
const categorySidebsarNavMaker = () => {
    const categorys = Object.keys(categoryListDictionary);

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

let pageNum = 0;
const pageCategoryCount = 6;
const categoryCardList = document.getElementById("category-card-list");
const categoryListCardMaker = () => {

    const categoryList = categoryListDictionary[selectCategoryName];
    for(let i = 0; i < pageNum + pageCategoryCount; i++) {
        const categoryImgPath = parsePNG(`../../${imageFolderPath}list/${categoryList[i]}`);
        const categoryViewPath = parseHTML(`../../${listFolderPath}${categoryList[i]}`);
        
        const card = categoryCardHTML(categoryImgPath, categoryViewPath);
        categoryCardList.innerHTML += card;
    }
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

const pageNumDiv = document.getElementById("page-num");
const pageNumMaker = () => {
    const categoryList = categoryListDictionary[selectCategoryName];
    for(let i = 0; i < categoryList.length; i++) {
        const categoryListPageNum = `<a href=#> ${i + 1} </a>`

        pageNumDiv.innerHTML += categoryListPageNum;
    }
}


// Function Running
getSelectCategoryName();
categorySidebsarNavMaker();
categoryListCardMaker();
pageNumMaker();
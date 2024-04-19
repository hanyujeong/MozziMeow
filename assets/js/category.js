
const pageNumDiv = document.getElementById("sidebar-nav");
const pageNumMaker = () => {

    // for(let i = 0; i < category.length; i++) {
    //     const categoryPageNum = `<a href=#> ${i + 1} </a>`

    //     pageNumDiv.innerHTML += categoryPageNum;
    // }
}

const categorySidebarNav = document.getElementById("sidebar-nav");
const categorySidebsarNavMaker = () => {

    for(let i = 0; i < category.length; i++) {
        const categoryName = category[i];
        const categoryImgPath = parsePNG(`../../${imageFolderPath}${categoryName}`);
        const categoryViewPath = parseHTML(`${categoryName}`);
        
        const sidebarNav = sidebarNavHTML(categoryImgPath, categoryViewPath, categoryName, i);
        categorySidebarNav.innerHTML += sidebarNav;
    }
}

const sidebarNavHTML = (imgPath, viewPath, categoryName, count) => {
    const sidebarNav =
    `<li class="nav-item">
        <a class="nav-link ${count == 0 ? "" : "collapsed"}" href="${viewPath}">
            <i class="bi bi-grid"></i>
            <span>${categoryName}</span>
        </a>
    </li>`

    return sidebarNav;
}


// Function Running
pageNumMaker();
categorySidebsarNavMaker();
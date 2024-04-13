const viewFolderPath = './views/';
const imageFolderPath = './assets/img/';

const categoryFolderPath = viewFolderPath + 'category/';
const category = [
    'category', 'category', 'category', 'category', 'category',
    'category', 'category', 'category', 'category', 'category',
];

const listFolderPath = viewFolderPath + 'detail/';
const list = [
    'test1',
    'test2',
];

const parseHTML = (path) => {
    return path + ".html";
}

const parsePNG = (path) => {
    return path + ".png";
}

const pageNumDiv = document.getElementById("page-num");
const pageNumMaker = () => {
    for(let i = 0; i < category.length; i++) {
        const categoryPageNum = `<a href=#> ${i + 1} </a>`
        pageNumDiv.innerHTML += categoryPageNum;
    }
}

const categoryCardList = document.getElementById("category-card-list");
const categoryCardMaker = () => {
    for(let i = 0; i < category.length; i++) {
        const categoryImgPath = parsePNG(imageFolderPath + category[i]);
        const categoryViewPath = parseHTML(categoryFolderPath + category[i]);
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
    </div>`

    return card;
}


// Function Running
pageNumMaker();
categoryCardMaker();
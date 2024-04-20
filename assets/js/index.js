

const categoryCardList = document.getElementById("category-card-list");
const categoryCardMaker = () => {
    const categorys = Object.keys(categoryListDictionary);

    for(let i = 0; i < categorys.length; i++) {
        const categoryName = category[i];
        const categoryImgPath = parsePNG(`${imageFolderPath}category/${categoryName}`);
        const categoryViewPath = parseHTML(`${categoryFolderPath}${categoryName}`);
        
        const card = categoryCardHTML(categoryName, categoryImgPath, categoryViewPath);
        categoryCardList.innerHTML += card;
    }
}

const categoryCardHTML = (categoryName, imgPath, viewPath) => {
    const card =
    `<div class="col">
        <div class="card shadow-sm">
        <img src="${imgPath}" class="bd-placeholder-img card-img-top" width="100%" height="225" alt="Card image cap">

        <div class="card-body">
            <p class="card-text">${categoryName}</p>
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


// Function Running
categoryCardMaker();
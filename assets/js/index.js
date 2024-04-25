

const categoryCardList = document.getElementById("category-card-list");
const categoryCardMaker = () => {
    const categorys = Object.keys(categoryListDictionary);

    for(let i = 0; i < categorys.length; i++) {
        const categoryName = categorys[i];
        const categoryImgPath = parsePNG(`${imageFolderPath}category/${categoryName}/${categoryName}`);
        const categoryViewPath = parseHTML(`${viewFolderPath}${categoryName}/${categoryName}`);
        
        const card = categoryCardHTML(categoryName, categoryImgPath, categoryViewPath, i);
        categoryCardList.innerHTML += card;
    }
}

const categoryCardHTML = (categoryName, imgPath, viewPath, num) => {
    const card =
    `<div class="col">
        <div class="card shadow-sm">
            <label class="custom-cursor" for="view-${num}">
                <img src="${imgPath}" class="bd-placeholder-img card-img-top" width="100%" height="225" alt="Card image cap">
                <div class="card-body">
                    <span>
                        <h3 class="card-text fw-bolder">${categoryName.toUpperCase()}</h3>
                    </span>
                    <div class="d-flex justify-content-end align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" id="view-${num}" onclick="location.href='${viewPath}'">View</button>
                        </div>
                        <small class="text-muted"></small>
                    </div>
                </div>
            </label>
        </div>
    </div>`;

    return card;
}


// Function Running
categoryCardMaker();
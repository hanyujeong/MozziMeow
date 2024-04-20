const viewFolderPath = './views/';
const imageFolderPath = './assets/img/';

const categoryFolderPath = viewFolderPath + 'category/';
const listFolderPath = viewFolderPath + 'list/';

// ====== Input Your Category and Category's list ===== //
const categoryListDictionary = {
    'category1' : [
        'list1', 'list2', 'list1', 'list2', 'list1',
        'list1', 'list2', 'list1', 'list2', 'list1',
    ],
    'category2' : [
        'list1', 'list2', 'list1', 'list2', 'list1',
        'list1', 'list2', 'list1', 'list2', 'list1',
    ],
}

const parseHTML = (path) => {
    return path + ".html";
}

const parsePNG = (path) => {
    return path + ".png";
}

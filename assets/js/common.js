const viewFolderPath = './views/';
const imageFolderPath = './assets/img/';

const categoryFolderPath = viewFolderPath + 'category/';
const category = [
    'category1', 'category2', 'category1', 'category2', 'category1',
    'category1', 'category2', 'category1', 'category2', 'category1',
];

const listFolderPath = viewFolderPath + 'list/';
const category1List = [
    'list1', 'list2', 'list1', 'list2', 'list1',
    'list1', 'list2', 'list1', 'list2', 'list1',
];

const category2List = [
    'list1', 'list2', 'list1', 'list2', 'list1',
    'list1', 'list2', 'list1', 'list2', 'list1',
];

const categoryListDictionary = {
    'category1' : category1List,
    'category2' : category2List,
}

const parseHTML = (path) => {
    return path + ".html";
}

const parsePNG = (path) => {
    return path + ".png";
}

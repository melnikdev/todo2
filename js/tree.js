/**
 * helper for create tree in array
 * @param array
 * @returns {Array}
 */
function makeTree(array) {

    var newArray = [];
    var result = [];

    array.forEach(function (node) {
        node.children = [];
        newArray[node.id] = node;
    });

    newArray = addChildren(newArray);

    newArray.forEach(function (node) {
        if (node.parent == 0) {
            result.push(node);
        }
    });

    return result;
}
/**
 * add children to parent
 * add depth elements
 * @param array
 * @returns {*}
 * 333
 */
function addChildren(array) {

    array.forEach(function (node, i, arr) {
        if (array_key_exists(node.parent, arr)) {
            if (arr[node.parent].parent == 0) {
                arr[node.parent].dep = 0;
                node.dep = 1;
            } else {
                node.dep = arr[node.parent].dep + 1;
            }
            arr[node.parent].children.push(node);
        }

    });

    return array;
}
/*
 search key in array
 */
function array_key_exists(key, search) {

    if (!search || (search.constructor !== Array && search.constructor !== Object)) {
        return false;
    }

    return search[key] !== undefined;
}
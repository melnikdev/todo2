/**
 * init app
 * get Todos
 */

function initApp() {

    getTodo()
        .then(function (result) {
            var result = JSON.parse(result);
            var tree = makeTree(result);
            addTodo(tree);
         })
        .catch(function (err) {
            console.error('error ', err.statusText);
        });
}

/**
 * Add todos for page
 * @param result
 * @param dep
 */
function addTodo(result, dep = 0) {
    result.forEach(function (element) {
        addLiHtml(element, dep);

        if (element.children.length) {
            var resultArray = [];
            var margin = 0;
            margin = 15 * element.children[0].dep;
            for (var prop in element.children) {
                resultArray.push(element.children[prop]);
            }
            addTodo(resultArray, margin);
        }

    });
}

/**
 * show input for create
 */
function showCreate() {
    var el = document.getElementById('newTodo');
    el.style.display = 'block';
}

/**
 * wrapper for li
 * @param element
 * @param margin
 */
function addLiHtml(element, margin) {

    var el = document.createElement('li');
    el.style.marginLeft = margin + 'px';

    el.innerHTML = '<input type="text" onchange="changeTodo(this , ' + element.id + ')" value="' + element.name + '">'
    + '<span class="add" onclick="createChildren(' + element.id + ')"> + '
    + '</span><span class="delete" onclick="deleteTodo(' + element.id + ')">X </span>';
    document.getElementById('parentList').appendChild(el);
}

/*
 delete all li
 reload todos
 add li in html
 */
function reloadTodo() {
    var parent = document.getElementById("parentList");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    initApp()
}
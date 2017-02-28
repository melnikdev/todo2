//Substitute your domain
var domain = 'http://todo/';

/**
 * api Get todos
 * @returns {Promise}
 */
function getTodo() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', domain + 'api.php/todo', true);
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });

}

/**
 * api delete
 * @param id
 */
function deleteTodo(id) {

    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', domain + 'api.php/delete/' + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 204) {
            reloadTodo();
        }
    }
    xhr.send();

}

/**
 * api post
 * create todos
 */
function saveTodo() {

    var inputValue = document.getElementById('todoName').value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", domain + 'api.php/create', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
            reloadTodo();
        }
    }

    xhr.send("name=" + inputValue);
}

/**
 * api post
 * create children - default name
 * @param id
 */
function createChildren(id) {

    var xhr = new XMLHttpRequest();

    xhr.open("POST", domain + 'api.php/create', true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
            reloadTodo();
        }

    }

    xhr.send("name=default&id=" + id);
}

/**
 * api put
 * change todos
 * @param element
 * @param id
 */
function changeTodo(element, id) {

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", domain + 'api.php/put/' + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //location.reload();
        }

    }
    xhr.send("name=" + element.value);
}

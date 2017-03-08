<?php
namespace Api;

/**
 * Class RestApi
 * @package Api
 */
class RestApi
{
    public $url;
    public $method;
    public $db;

    /**
     * @param $url
     * @param $method
     * @param $db
     */
    public function __construct($url, $method, $db)
    {
        $this->url = $url;
        $this->method = $method;
        $this->db = $db;
    }

    /**
     * Return todos tree
     * @return string
     */
    private function apiGet()
    {
        $stmt = $this->db->query('SELECT * FROM todo ');
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return json_encode($result);
    }

    /**
     * save newTodo
     * @return int
     */
    private function apiPost()
    {
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
        } else {
            $id = 0;
        }
        $sql = "INSERT INTO todo( name, parent) VALUES ( :todoName ,:todoParent)";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':todoName', $_POST['name'], \PDO::PARAM_STR);
        $stmt->bindParam(':todoParent', $id, \PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return http_response_code(201);
        }
        return http_response_code(404);
    }

    /**
     * Update todos
     * @return int
     */
    private function apiPut()
    {
        $id = $this->url[1];
        $putData = file_get_contents('php://input');
        $putArray = explode("=", $putData);
        if ($putArray[0] == 'name') {
            $name = $putArray[1];
            $sql = "UPDATE todo SET name = :todoName WHERE id = :todoId";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':todoName', $name, \PDO::PARAM_STR);
            $stmt->bindParam(':todoId', $id, \PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                return http_response_code(200);
            } else {
                return http_response_code(404);
            }

        } else {
            return http_response_code(400);
        }
    }

    /**
     * Delete Todos
     * @return int
     */
    private function apiDelete()
    {
        $id = $this->url[1];

        $sql = "DELETE FROM todo WHERE id =  :todoId OR parent =  :todoParent";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':todoId', $id, \PDO::PARAM_INT);
        $stmt->bindParam(':todoParent', $id, \PDO::PARAM_INT);
        $stmt->execute();


        if ($stmt->rowCount() > 0) {
            return http_response_code(204);
        }

        return http_response_code(404);

    }

    /**
     * Check method request
     * @return bool
     */
    private function checkMethod()
    {
        $check = ['todo' => 'GET', 'put' => 'PUT', 'delete' => 'DELETE', 'create' => 'POST'];
        if ($check[$this->url[0]] == $this->method) {
            return true;
        }
        return false;
    }

    /**
     * check method and return code or data for client
     */
    public function response()
    {
        if (!$this->checkMethod()) {
            return http_response_code(400);
        }
        switch ($this->url[0]) {
            case 'todo':
                echo $this->apiGet();
                break;
            case 'put':
                $this->apiPut();
                break;
            case 'create':
                $this->apiPost();
                break;
            case 'delete':
                $this->apiDelete();
                break;
        }
    }

    /**
     * @param $x
     * @param $y
     * @return bool
     */
    public function test($x, $y)
    {
        return true;
    }
}
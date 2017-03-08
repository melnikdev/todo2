<?php
use Api\RestApi;

require_once '/libraries/RestApi.php';

$url = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$method = $_SERVER['REQUEST_METHOD'];

//$db = new PDO('sqlite:../../modules/system/html/openserver/adminer/database.db');
$db = new PDO('sqlite:dbTodo.db');

$api = new RestApi($url, $method, $db);
//master
$api->response();


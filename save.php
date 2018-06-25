<?php
require("functions.php");
$file = file_get_contents("php://input");
$warn = $_GET["warn"];
$type = $_GET["type"];

switch ($warn)
{
    case "false":
        $warn = false;
        break;
    case "true":
        $warn = true;
        break;
    default:
        http_response_code(400);
        return;
}

$filename = gen_name($warn);
file_put_contents("uploads/" . $filename, $file);
echo $filename;

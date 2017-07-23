<?php
$filename = $_GET["filename"];

if (!preg_match("/^[A-Za-z0-9]{5}$/", $filename))
{
    http_response_code(400);
    return;
}

if ( ! file_exists("uploads/$filename") )
{
    http_response_code(404);
    return;
}

$file = "uploads/" . $filename;
header("Content-Length: " . filesize($file));
header("Content-Type: application/octet-stream");
readfile($file);
unlink($file);

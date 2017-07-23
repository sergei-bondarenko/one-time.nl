<?php
$filename = $_GET["filename"];

if ( ! preg_match("/^[A-Za-z0-9]{5}$/", $filename) )
{
    http_response_code(400);
    return;
}

if ( ! file_exists("uploads/$filename") )
{
    http_response_code(404);
    return;
}

if ( is_numeric($filename[0]) )
{
    // If the first symbol of filename is digit then
    // do not show warning
    echo "False";
}
else
{
    echo "True";
}

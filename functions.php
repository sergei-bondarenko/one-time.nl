<?php
$allowedTypes = ["image/gif", "image/jpeg", "image/jpg",
                 "image/pjpeg", "image/x-png", "image/png"];

function gen_string($warn)
{
    // To distinguish files with and without warning I use the following
    // scheme: name of files with warning starts with letter, and name of
    // files without warning starts with digit

    $length = 5;
    $letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $digits = "0123456789";
    $all = $letters . $digits;
    $result = "";

    if ($warn === true)
    {
        $result .= $letters[rand(0, strlen($letters) - 1)];
    }
    else
    {
        $result .= $digits[rand(0, strlen($digits) - 1)];
    }

    for ($i = 0; $i < $length - 1; $i++)
    {
        $result .= $all[rand(0, strlen($all) - 1)];
    }

    return $result;
}

function gen_name($warn)
{
    // Generate random unique file name

    $files = scandir("uploads");

    do
    {
        $result = gen_string($warn);
    } while (in_array($result, $files));
    return $result;
}

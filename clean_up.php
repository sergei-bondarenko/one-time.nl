<?php
$files = array_diff(scandir("uploads"), array('.', '..'));

foreach ($files as $file)
{
    if (time() - filemtime("uploads/$file") > 2592000)
    {
        // If file older than 30 days then delete it
        unlink("uploads/$file");
    }
}

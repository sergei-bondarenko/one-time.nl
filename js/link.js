"use strict";

function link(url)
{
    if (!history.state.linkpage)
    {
        history.pushState({linkpage: url}, "");
    }

    document.getElementById("link").addEventListener("click",
    function()
    {
        selectText("link");
    });

    document.getElementById("copy").addEventListener("click",
    function()
    {
        selectText("link");
    document.execCommand("copy");
    });

    document.getElementById("copy").addEventListener("mouseenter",
    function()
    {
    document.getElementById("copy").style.backgroundColor = "#000000";
        document.getElementById("copy_svg").src = "imgs/copy_hover.svg?102";
    }, true);

    document.getElementById("copy").addEventListener("mouseout",
    function()
    {
    document.getElementById("copy").style.backgroundColor = "#FFFFFF";
        document.getElementById("copy_svg").src = "imgs/copy.svg?102";
    }, true);
}

function selectText(containerid)
{
    if (document.selection)
    {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    }
    else 
    if (window.getSelection())
    {
            var range = document.createRange();
            range.selectNodeContents(document.getElementById(containerid));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
}

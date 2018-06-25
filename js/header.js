"use strict";

function header()
{
    document.getElementById("faq_svg").addEventListener("mouseenter",
    function()
    {
        this.src = "imgs/faq_hover.svg?101";
    });

    document.getElementById("faq_svg").addEventListener("mouseout",
    function()
    {
        this.src = "imgs/faq.svg?101";
    });

    document.getElementById("logo_svg").addEventListener("mouseenter",
    function()
    {
        this.src = "imgs/logo_hover.svg?101";
    });

    document.getElementById("logo_svg").addEventListener("mouseout",
    function()
    {
        this.src = "imgs/logo.svg?101";
    });
}

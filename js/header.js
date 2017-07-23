"use strict";

function header()
{
    document.getElementById("faq_svg").addEventListener("mouseenter",
    function()
    {
        this.src = "imgs/faq_hover.svg";
    });

    document.getElementById("faq_svg").addEventListener("mouseout",
    function()
    {
        this.src = "imgs/faq.svg";
    });

    document.getElementById("logo_svg").addEventListener("mouseenter",
    function()
    {
        this.src = "imgs/logo_hover.svg";
    });

    document.getElementById("logo_svg").addEventListener("mouseout",
    function()
    {
        this.src = "imgs/logo.svg";
    });
}

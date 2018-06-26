"use strict";

function header()
{
    document.getElementById("faq_svg").addEventListener("mouseenter",
    function()
    {
        this.src = "imgs/faq_hover.svg?102";
    });

    document.getElementById("faq_svg").addEventListener("mouseout",
    function()
    {
        this.src = "imgs/faq.svg?102";
    });

    document.getElementById("logo_svg").addEventListener("mouseenter",
    function()
    {
        this.src = "imgs/logo_hover.svg?102";
    });

    document.getElementById("logo_svg").addEventListener("mouseout",
    function()
    {
        this.src = "imgs/logo.svg?102";
    });
}

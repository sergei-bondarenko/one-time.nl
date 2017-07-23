"use strict";

window.onpopstate = function(event)
{
    if (event.state === "index")
        page.index();
    if (event.state.linkpage !== undefined)
        page.link(event.state.linkpage);
};

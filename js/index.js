"use strict";

function index()
{
    var counter = 0;
    history.replaceState("index", "");

    document.getElementById("drop_zone").addEventListener("click",
    function()
    {
        document.getElementById("input_file").click();
    });

    document.getElementById("input_file").addEventListener("change", 
    function()
    {
        var warning = document.getElementById("warning_checkbox").checked;
        var file = this.files[0];
        var upload = new Upload(file, warning);
        page.progress(true);
        upload.start();
    });

    document.body.addEventListener("dragover",
    function(event)
    {   
        event.preventDefault();
    });

    document.getElementById("drop_zone").addEventListener("dragenter", 
    function(event)
    {
        counter++;
        document.getElementById("drop_zone").style.border =
            "2px solid #AAAAAA";
    });

    document.getElementById("drop_zone").addEventListener("dragleave",
    function(event)
    {
        counter--;
        if (counter === 0)
        {
            document.getElementById("drop_zone")
                .style.border = "2px dashed #AAAAAA";
        }
    });

    document.body.addEventListener("drop",
    function(event)
    {
        event.preventDefault();
        var dt = event.dataTransfer;

        if (dt.items.length > 1)
        {
            page.error("You can upload only one file at a time.");
            return;
        }

        var warning = document.getElementById("warning_checkbox").checked;
        var file = dt.items[0].getAsFile();
        var upload = new Upload(file, warning);
        page.progress(true);
        upload.start();
    });

    document.getElementById("tooltip").addEventListener("click",
    function()
    {
    var tooltip = document.getElementById("tooltip_text")
                .style.visibility;

    if (tooltip === "hidden" || tooltip === "")
    {
        document.getElementById("tooltip_text")
                .style.visibility = "visible";
    }
    else
    {
        document.getElementById("tooltip_text")
                .style.visibility = "hidden";
    }
    });

    document.getElementById("tooltip").addEventListener("mouseenter",
    function()
    {
        document.getElementById("tooltip_text")
            .style.visibility = "visible";
    });

    document.getElementById("tooltip").addEventListener("mouseout",
    function()
    {
        document.getElementById("tooltip_text")
            .style.visibility = "hidden";
    });
}

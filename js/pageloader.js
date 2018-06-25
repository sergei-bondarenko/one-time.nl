"use strict";

function PageLoader()
{
    // Loads DOM for different pages

    this.index = function()
    {
        // The index page
        header();
        document.getElementById("body_centered").innerHTML = "";

        var elem = document.createElement("div");
        elem.id = "container_index";
        document.getElementById("body_centered").appendChild(elem);

        elem = document.createElement("div");
        elem.id = "drop_zone";
        document.getElementById("container_index").appendChild(elem);

        elem = document.createElement("div");
        elem.id = "drop_zone_inner";
        document.getElementById("drop_zone").appendChild(elem);

        elem = document.createElement("div");
        elem.id = "drop_zone_drag";
        document.getElementById("drop_zone_inner").appendChild(elem);

        elem = document.createElement("img");
        elem.id = "drag_svg";
        elem.src = "imgs/drag.svg?101";
        document.getElementById("drop_zone_drag").appendChild(elem);

        elem = document.createElement("div");
        elem.id = "drop_zone_text";
        document.getElementById("drop_zone_inner").appendChild(elem);

        elem = document.createElement("input");
        elem.type = "file";
        elem.id = "input_file";
        document.getElementById("drop_zone_text").appendChild(elem);

        elem = document.createElement("span");
        elem.className = "link";
        elem.innerHTML = "Select a file";
        document.getElementById("drop_zone_text").appendChild(elem);

        elem = document.createElement("span");
        elem.id = "drag_file";
        elem.innerHTML = " or drag it here.";
        document.getElementById("drop_zone_text").appendChild(elem);

        elem = document.createElement("div");
        elem.id = "footer";
        document.getElementById("container_index").appendChild(elem);

        elem = document.createElement("div");
        elem.id = "options";
        document.getElementById("footer").appendChild(elem);

        elem = document.createElement("input");
        elem.type = "checkbox";
        elem.id = "warning_checkbox";
        elem.checked = true;
        document.getElementById("options").appendChild(elem);

        elem = document.createElement("span");
        elem.id = "tooltip";
        document.getElementById("options").appendChild(elem);

        elem = document.createElement("span");
        elem.id = "warning_label"
        elem.innerHTML = "Enable warning message";
        document.getElementById("tooltip").appendChild(elem);

        elem = document.createElement("span");
        elem.id = "tooltip_text";
        elem.innerHTML = "When someone opens the file he will be asked if he "
            + "really wants to see (and destruct) this file.";
        document.getElementById("tooltip").appendChild(elem);

        index();
    }

    this.progress = function(cancel)
    {
        // Progress page with cancel button (true) or not (false)
        header();
        document.getElementById("body_centered").innerHTML = "";

        var svgNS = "http://www.w3.org/2000/svg";    
        var elem = document.createElementNS("http://www.w3.org/2000/svg",
            "svg");

        elem.id = "progress";
        document.getElementById("body_centered").appendChild(elem);

        elem = document.createElementNS(svgNS, "circle");
        elem.setAttributeNS(null, "id", "progress_back");
        elem.setAttributeNS(null, "cx", 55);
        elem.setAttributeNS(null, "cy", 55);
        elem.setAttributeNS(null, "r", 50);
        elem.setAttributeNS(null, "stroke", "#AAAAAA");
        elem.setAttributeNS(null, "stroke-width", 10);
        elem.setAttributeNS(null, "fill", "none");
        document.getElementById("progress").appendChild(elem);

        elem = document.createElementNS(svgNS, "path");
        elem.setAttributeNS(null, "id", "progress_front");
        elem.setAttributeNS(null, "stroke", "#000000");
        elem.setAttributeNS(null, "stroke-width", 10);
        elem.setAttributeNS(null, "fill", "none");
        document.getElementById("progress").appendChild(elem);

        if (cancel === true)
        {
            elem = document.createElementNS(svgNS, "path");
            elem.setAttributeNS(null, "id", "upload_cancel");
            elem.setAttributeNS(null, "stroke", "#000000");
            elem.setAttributeNS(null, "stroke-width", 10);
            elem.setAttributeNS(null, "fill", "none");
            elem.setAttribute("d", "M 70 40 40 70 M 40 40 70 70");
            document.getElementById("progress").appendChild(elem);
        }
    }

    this.link = function(url)
    {
        // Page with link to uploaded file
        header();
        document.getElementById("body_centered").innerHTML = "";

        var elem = document.createElement("div");
        elem.id = "link";
        elem.innerHTML = "https://one-time.nl/" + url;
        document.getElementById("body_centered").appendChild(elem);

        elem = document.createElement("div");
        elem.id = "copy";
        document.getElementById("body_centered").appendChild(elem);

        elem = document.createElement("img");
        elem.id = "copy_svg";
        elem.src = "imgs/copy.svg?101";
        document.getElementById("copy").appendChild(elem);        

        link(url);
    }

    this.warning = function(url)
    {
        // Warning page
        header();
        document.getElementById("body_centered").innerHTML = "";
    
        var elem = document.createElement("div");
        elem.id = "container_warn";
        document.getElementById("body_centered").appendChild(elem);
        
        elem = document.createElement("div");
        elem.innerHTML = "Show the file?";
        elem.id = "warn_text";
        document.getElementById("container_warn").appendChild(elem);
        
        elem = document.createElement("div");
        elem.className = "button";
        elem.innerHTML = "Yes";
        elem.id = "warn_yes"
        document.getElementById("container_warn").appendChild(elem);
        
        elem = document.createElement("div");
        elem.className = "button";
        elem.innerHTML = "No";
        elem.id = "warn_no"
        document.getElementById("container_warn").appendChild(elem);
    }

    this.warning_ok = function()
    {
        // This page loaded when user clicks "OK" on warning page
        header();
        document.getElementById("body_centered").innerHTML = "";
        
        var elem = document.createElement("div");
        elem.id = "container_warn";
        document.getElementById("body_centered").appendChild(elem);
        
        elem = document.createElement("div");
        elem.innerHTML = "OK. You can see the file some other time.";
        elem.id = "warn_text";
        document.getElementById("container_warn").appendChild(elem);
    }

    this.error = function(text)
    {
        // Error page
        header();

        if ( document.getElementById("body_show") )
        {
            document.getElementById("body_show").id = "body_centered";
        }

        document.getElementById("body_centered").innerHTML = "";
        
        var elem = document.createElement("div");
        elem.id = "error";
        elem.innerHTML = text;
        document.getElementById("body_centered").appendChild(elem);
    }

    this.show = function()
    {
        // Show the file
        header();
        document.getElementById("body_show").innerHTML = "";
        
        var elem = document.createElement("img");
        elem.id = "image_container";
        elem.hidden = true;
        document.getElementById("body_show").appendChild(elem);

        var elem = document.createElement("div");
        elem.id = "file_container";
        elem.hidden = true;
        document.getElementById("body_show").appendChild(elem);

        var elem = document.createElement("div");
        elem.id = "video_div";
        elem.hidden = true;
        document.getElementById("body_show").appendChild(elem);

        var elem = document.createElement("video");
        elem.id = "video_container";
        elem.controls = true;
        elem.hidden = true;
        document.getElementById("video_div").appendChild(elem);

        var elem = document.createElement("audio");
        elem.id = "audio_container";
        elem.hidden = true;
        document.getElementById("body_show").appendChild(elem);
    }
}

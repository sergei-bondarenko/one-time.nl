"use strict";

function Show()
{
    // Functions associated with downloading, decrypting and 
    // displaying a file

    this.encryptedFile = null;
    this.pass = null;
    this.filename = null;
    var that = this;

    this.getFilename = function()
    {
        // Extracts symbols after "/" and before "#" from URL
        var result = null;
        var url = location.toString();
        var result = /([^\/]+)$/.exec(url)[1].substring(0,5);
        return result;
    }

    this.getPass = function()
    {
        // Extracts symbols after "#"
        var result = null;
        var url = location.toString();
        var result = /#(.+)/.exec(url);

        if (result !== null)
        {
            result = result[1];
        }

        return result;
    }

    this.start = function()
    {
        this.pass = this.getPass();
        this.filename = this.getFilename();
        
        if (this.pass === null || this.pass.length !== 10)
        {
            page.error("Check your link, it has wrong length.");
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/check_warning.php?filename=" + this.filename);
        xhr.send();

        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === 4)
            {
                if (xhr.status === 404)
                {
                    page.error("The file doesn't exist.");
                    return;
                }

                if (xhr.status === 400)
                {
                    page.error("Bad request. Are you trying to hack?");
                    return;
                }

                if (xhr.status === 200)
                {
                    var data = xhr.responseText;
                    if (data === "False")
                    {
                        that.download();
                    }
                    else
                    {
                        page.warning();

                        document.getElementById("warn_yes").addEventListener(
                        "click", function()
                        {
                            that.download();
                        });

                        document.getElementById("warn_no").addEventListener(
                        "click", function()
                        {
                            page.warning_ok();
                        });
                    }
                }
            }
        };
    }        

    this.download = function()
    {
        // Downloads the file
        var that = this;
        page.progress(false);
 
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/download.php?filename=" + this.filename);
        xhr.responseType = "arraybuffer";
        xhr.onprogress = this.progressHandling;
        xhr.send();

        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === 4)
            {
                if (xhr.status === 200)
                {
                    that.encryptedFile = xhr.response;
                    document.getElementById("body_centered").id = "body_show";
                    page.show();
                    that.appendImage();
                }

                if (xhr.status === 404)
                {
                    page.error("The file doesn't exist.");
                    return;
                }

                if (xhr.status === 400)
                {
                    page.error("Bad request. Are you trying to hack?");
                    return;
                }
            }
        };
    }

    this.progressHandling = function(evt)
    {
        if (evt.lengthComputable) 
        {
            var percent = Math.round((evt.loaded / evt.total) * 100);
            document.getElementById("progress_front").setAttribute("d", 
            progressBar(percent));
        }
    }

    this.humanFileSize = function(size)
    {
        if (size > 1024*1024*1024)
        {
            return (size / (1024*1024*1024)).toFixed(1) + " GB";
        }
        else if (size > 1024*1024)
        {
            return (size / (1024*1024)).toFixed(1) + " MB";
        }
        else if (size > 1024)
        {
            return (size / 1024).toFixed(1) + " KB";
        } else {
            return size + " B";
        }
    }

    this.appendImage = function()
    {
        var that = this;
        decrypt(this.encryptedFile, this.pass).then(function(result)
        {
            if (result !== "error")
            {
                var type = result.split(";")[0];
                if (type.includes("image"))
                {
                    var elem = document.getElementById("image_container");
                    elem.src = result;
                    elem.hidden = false;
                }
                else if (type.includes("video/mp4")
                         || type.includes("video/webm")
                         || type.includes("video/ogg"))
                {
                    document.getElementById("video_div").hidden = false;
                    var elem = document.getElementById("video_container");
                    elem.innerHTML = "<source src='" + result + "' type='"
                                     + type.split(":")[1] + "'>";
                    elem.hidden = false;
                }
                else if (type.includes("audio/mpeg")
                         || type.includes("audio/wav")
                         || type.includes("audio/ogg"))
                {
                    var elem = document.getElementById("audio_container");
                    elem.innerHTML = "<source src='" + result + "' type='"
                                     + type.split(":")[1] + "'>";
                    elem.controls = true;
                    elem.hidden = false;
                }
                else
                {
                    var elem = document.createElement("a");
                    elem.href = result;
                    elem.className = "link";
                    elem.innerText = "Download " + type.split("/")[1]
                        + " [" + that.humanFileSize(result.length) + "]";
                    document.getElementById("file_container")
                            .appendChild(elem);
                    elem.hidden = false;
                }
            }
            else
            {
                page.error("Incorrect password. But bad for you — the "
                    + "file is already destroyed.");
                return;
            }
        })
    }
}

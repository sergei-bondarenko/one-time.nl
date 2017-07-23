"use strict";

function Show()
{
    // Functions associated with downloading, decrypting and 
    // displaying an image

    this.encryptedFile = null;
    this.pass = null;
    this.filename = null;
    this.base64File = null;
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
                    page.error("The image doesn't exist.");
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
        // Downloads the image
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
                    page.error("The image doesn't exist.");
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

    this.appendImage = function()
    {
        var that = this;
        decrypt(this.encryptedFile, this.pass).then(function(result)
        {
            if (result !== "error")
            {
                that.base64File = result;
                var elem = document.getElementById("image");
                elem.src = that.base64File;
            }
            else
            {
                page.error("Incorrect password. But bad for you — the "
                    + "image is already destroyed.");
                return;
            }
        })
    }
}

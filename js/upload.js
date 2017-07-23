"use strict";

function Upload(file, warning)
{
    this.file = file;
    this.type = this.file.type;
    this.size = this.file.size;
    this.base64File = null;
    this.encryptedFile = null;
    this.pass = null;
    this.warning = warning;
}

Upload.prototype.start = function()
{
    var that = this;

    var allowedTypes = ["image/gif", "image/jpeg", "image/jpg",
                        "image/pjpeg", "image/x-png", "image/png"];

    if ( ! allowedTypes.includes(this.type) )
    {
        page.error("You can upload only jpeg, png or gif files.");
        return;
    }

    if (this.size > 10000000)
    {
        page.error("File size must be smaller than 10 MB.");
        return;
    }

    var reader  = new FileReader();

    reader.addEventListener("load", function ()
    {
        that.base64File = reader.result;
        that.encrypt();
    }, false);

    if (this.file)
    {
        reader.readAsDataURL(this.file);
    }
};

Upload.prototype.encrypt = function()
{
    this.pass = genPass();
    var that = this;
    encrypt(this.base64File, this.pass).then(function(result)
    {
        that.encryptedFile = result;
        that.upload();
    })
};

Upload.prototype.upload = function()
{
    var that = this;
    var xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", that.transferProgress);
    xhr.upload.addEventListener("page.error", that.transferFailed);

    document.getElementById("upload_cancel").addEventListener("click",
    function()
    {
        xhr.abort();
        page.index();
    });

    xhr.open("POST", "/save.php?warn=" + this.warning + "&type=" + this.type,
        true);
    xhr.send(that.encryptedFile);
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState === 4)
        {
            if (xhr.status === 200)
            {
                var data = xhr.responseText;
                page.link(data + "#" + that.pass);
            }
            if (xhr.status === 415)
            {
                page.error("You can upload only jpeg, png or gif files.");
                return;
            }
            if (xhr.status === 400)
            {
                page.error("Bad request. Are you trying to hack?");
                return;
            }
        }
    };
};

Upload.prototype.transferProgress = function(event)
{
    var percent = 0;
    var position = event.loaded || event.position;
    var total = event.total;
    if (event.lengthComputable)
    {
        percent = Math.ceil(position / total * 100);
    }

    document.getElementById("progress_front")
        .setAttribute("d", progressBar(percent));
};

Upload.prototype.transferFailed = function()
{
    page.error("Error: upload unsuccessful, try again.");
};

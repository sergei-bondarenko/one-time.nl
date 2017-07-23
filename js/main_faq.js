"use strict";

function compose_email_address()
{
    var email = 'grez<span class="invisible">gibber1</span>';
    email += '9<!--gibber2-->11@';
    email += '<span class="invisible">gibber3</span>';
    email += 'gma<span class="invisible">gibber4<span class="invisible">';
    email += 'gibber5</span></span>';
    email += 'il.com';
    document.getElementById("email").innerHTML = email;
}

document.addEventListener("DOMContentLoaded", function()
{
    header();
    compose_email_address();
});

"use strict";

function compose_email_address()
{
    var email = 'grez<span class="invisible">gibber1</span>';
    email += '<!--gibber2-->@';
    email += '<span class="invisible">gibber3</span>';
    email += 'firema<span class="invisible">gibber4<span class="invisible">';
    email += 'gibber5</span></span>';
    email += 'il.cc';
    document.getElementById("email").innerHTML = email;
}

document.addEventListener("DOMContentLoaded", function()
{
    header();
    compose_email_address();
});

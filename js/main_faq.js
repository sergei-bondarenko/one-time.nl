"use strict";

function compose_email_address()
{
    var email = 'grez<span class="invisible">gibber1</span>';
    email += '<!--gibber2-->911@';
    email += '<span class="invisible">gibber3</span>';
    email += 'gma<span class="invisible">gibber4<span class="invisible">';
    email += 'i</span></span>';
    email += 'l.com';
    document.getElementById("email").innerHTML = email;
}

document.addEventListener("DOMContentLoaded", function()
{
    header();
    compose_email_address();
});

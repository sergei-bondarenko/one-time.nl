"use strict";

function compose_email_address()
{
    var email = 'sergei<span class="invisible">gibber1</span>';
    email += '<!--gibber2-->@';
    email += '<span class="invisible">gibber3</span>';
    email += 'bondare<span class="invisible">gibber4<span class="invisible">';
    email += 'gibber5</span></span>';
    email += 'nko.xyz';
    document.getElementById("email").innerHTML = email;
}

document.addEventListener("DOMContentLoaded", function()
{
    header();
    compose_email_address();
});

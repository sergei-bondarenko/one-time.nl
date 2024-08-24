"use strict";

function compose_email_address()
{
    var email = 'example@email.com';
    document.getElementById("email").innerHTML = email;
}

document.addEventListener("DOMContentLoaded", function()
{
    header();
    compose_email_address();
});

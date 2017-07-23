"use strict";

function encrypt(string, pass)
{
    return new Promise(async function(resolve)
    {
        const ptUtf8 = new TextEncoder().encode(string);
        const pwUtf8 = new TextEncoder().encode(pass);
        const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const alg = { name: "AES-GCM", iv: iv };
        const key = await crypto.subtle.importKey("raw", pwHash, alg,
            false, ["encrypt"]);
        const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUtf8);
        resolve(appendBuffer(iv, ctBuffer));
    });
}

function decrypt(cipher, pass)
{
    return new Promise(async function(resolve)
    {
        const pwUtf8 = new TextEncoder().encode(pass);
        const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);
        var iv = cipher.slice(0, 12);
        var arr = cipher.slice(12);
        const alg = { name: "AES-GCM", iv: iv };
        const key = await crypto.subtle.importKey("raw", pwHash, alg,
            false, ["decrypt"]);
        const ctBuffer = await crypto.subtle.decrypt(alg, key, arr)
            .catch(function()
                {
                    resolve("error");
                });
        resolve(new TextDecoder("UTF-8").decode(ctBuffer));
    });
}

function appendBuffer(buffer1, buffer2)
{
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp.buffer;
}

function genPass()
{
    var pass = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        + "0123456789";

    for(var i=0; i < 10; i++)
    {
        pass += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return pass;
}

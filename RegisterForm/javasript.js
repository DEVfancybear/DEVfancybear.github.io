let str = decodeURIComponent(window.location.href);
let n = str.slice(str.indexOf("FirstName"));
let y = n.replace(/&/g, "<br>");
let x = y.replace(/=/g, ": ")
document.getElementById("check1").innerHTML = x;
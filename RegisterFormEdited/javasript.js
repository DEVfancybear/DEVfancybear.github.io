let str = decodeURIComponent(window.location.href);
let n = str.slice(str.indexOf("?") + 1);
let y = n.replace(/&/g, "<br>");
let x = y.replace(/=/g, ": ")
let q = x.split('+').join(' ');
let z = q.split('<br>')
let j = [];
for (i = 0; i < z.length; i++) {
    let e = '<b>' + z[i].slice(0, z[i].indexOf(':')) + '</b>' + z[i].slice(z[i].indexOf(':'));
    j.push(e)
}

document.getElementById("check1").innerHTML = j.join('<br>');
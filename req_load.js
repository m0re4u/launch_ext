console.log("Heyoo")
var el = document.getElementsByTagName("button")  // Cant find button id?
console.log(el)
if (el)
{
    console.log("Loaded element")
    addEventListener("click", httpGetAsync);
}


function httpGetAsync()
{
    console.log("sending request")
    var url = "https://launchlibrary.net/1.1/launch/next/5";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var data = JSON.parse(xmlHttp.responseText)
            if (data)
            {
                console.log(data)
                console.log(data.count)
                document.getElementById("id01").innerHTML = "Loaded " + data.count + " launches."
            }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

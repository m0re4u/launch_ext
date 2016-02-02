httpGetAsync()

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
                document.getElementById("id01").innerHTML = "<b>Loaded " + data.count + " launches:</b>"
                printLaunches(data.launches)
            }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

function printLaunches(launchArray)
{
    for(var i = 0; i < launchArray.length; i++)
    {
        console.log(launchArray[i])
        document.getElementById("launch" + i).innerHTML = launchArray[i].name
        document.getElementById("wlaunch" + i).innerHTML = "Window start: " + launchArray[i].windowstart
    }
}

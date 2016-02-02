httpGetAsync();

function httpGetAsync()
{
    console.log("sending request");
    var url = "https://launchlibrary.net/1.1/launch/next/5";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var data = JSON.parse(xmlHttp.responseText);
            if (data)
            {
                document.getElementById("id01").innerHTML = "<b>Loaded " + data.count + " launches:</b>";
                printLaunches(data.launches);
            }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

function printLaunches(launchArray)
{
    for(var i = 0; i < launchArray.length; i++)
    {
        lobj = launchArray[i];
        console.log(lobj);
        document.getElementById("launch" + i).innerHTML = lobj.name;
        if (lobj.vidURL != null)
        {
            document.getElementById("wlaunch" + i).innerHTML = "Window start: <a id=\"lbutton" + i + "\"href=\"" + lobj.vidURL + "\">" + lobj.windowstart + "</a>";
            document.getElementById("wlaunch" + i).innerHTML.replace(' ', '/');  // #NoProblemo
            console.log(lobj.vidURL);
            document.getElementById("lbutton" + i).onclick = function(){
                webcastClicker(i);
            };
        } else {
            document.getElementById("wlaunch" + i).innerHTML = "Window start: " + lobj.windowstart;
        }
    }
}

function webcastClicker(i)
{
    console.log(i)
}

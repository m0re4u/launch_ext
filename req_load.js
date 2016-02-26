httpGetAsync();

REQ_SIZE = 5;

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
                document.getElementById("launch_header").innerHTML = "<b>Loaded " + data.count + " launches:</b>";
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
        document.getElementById("zlaunch" + i).innerHTML = lobj.name;
        if (lobj.vidURL != null)
        {
            document.getElementById("wlaunch" + i).innerHTML = "Window start: <a id=\"lbutton" + i + "\">" + lobj.windowstart + "</a>";
            url = addHTTP(lobj.vidURL)
            document.getElementById("lbutton" + i).href = url
            document.getElementById("lbutton" + i).target = "_blank"
            document.getElementById("wlaunch" + i).innerHTML.replace(' ', '/');  // #NoProblemo
        } else {
            document.getElementById("wlaunch" + i).innerHTML = "Window start: " + lobj.windowstart;
        }
    }
}

function addHTTP(url) {
   if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
   }
   return url;
}

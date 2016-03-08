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
        var deadline = lobj.windowstart;
        document.getElementById("zlaunch" + i).innerHTML = lobj.name;
        if (lobj.vidURL != null)
        {
            // Get a link to stream if available
            document.getElementById("wlaunch" + i).innerHTML = "Window start: <a id=\"lbutton" + i + "\">" + deadline + "</a>" + " | <span id=\"cdown\">" + getTimeRemaining(deadline) + "</span>";
            url = addHTTP(lobj.vidURL)
            document.getElementById("lbutton" + i).href = url
            document.getElementById("lbutton" + i).target = "_blank"
            document.getElementById("wlaunch" + i).innerHTML.replace(' ', '/');  // #NoProblemo
        } else {
            document.getElementById("wlaunch" + i).innerHTML = "Window start: " + deadline + " | <span id=\"cdown\">" + getTimeRemaining(deadline) + "</span>";
        }
    }
}

function addHTTP(url) {
    // Adds 'http://' to a url
   if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
   }
   return url;
}

function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)));
  return "" + hours + ":" + minutes + ":" + seconds
}

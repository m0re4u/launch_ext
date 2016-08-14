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
                setInterval(function(){updateCountdown(data.launches);}, 1000)
            }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

function printLaunches(launchArray)
{
    for(var i = 0; i < launchArray.length; i++)
    {
        var lobj = launchArray[i];
        console.log(lobj);
        var deadline = lobj.windowstart;
        document.getElementById("zlaunch" + i).innerHTML = lobj.name;
        if (lobj.vidURL != null && lobj.vidURL != "")
        {
            // Get a link to stream if available
            document.getElementById("wlaunch" + i).innerHTML = "Window start: <a id=\"lbutton" + i + "\">" + deadline + "</a> | <span id=\"cdown" + i + "\"></span>";
            url = addHTTP(lobj.vidURL)
            document.getElementById("lbutton" + i).href = url
            document.getElementById("lbutton" + i).target = "_blank"
            document.getElementById("wlaunch" + i).innerHTML.replace(' ', '/');  // #NoProblemo
            getTimeRemaining(deadline, i);
        } else {
            document.getElementById("wlaunch" + i).innerHTML = "Window start: <span id=\"lbutton" + i + "\">" + deadline + "</span> | <span id=\"cdown" + i + "\"></span>";
            getTimeRemaining(deadline, i);
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

function getTimeRemaining(endtime, i){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)));
  // Prepend 0 to numbers lower than 10
  seconds = ('0' + seconds).slice(-2)
  minutes = ('0' + minutes).slice(-2)
  var clockString = "" + hours + ":" + minutes + ":" + seconds
  document.getElementById("cdown" + i).innerHTML = clockString;
}

function updateCountdown(launchArray){
    for (var i = 0; i < launchArray.length; i++) {
        getTimeRemaining(launchArray[i].windowstart, i);
    }
}

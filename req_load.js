'use strict';
var countryConvert = {"USA" : "us", "FRA":"europeanunion", "GUF":"europeanunion", "IND":"in", "CHN" : "cn", "KAZ" : "kz", "RUS" : "ru", "NZL": "nz", "JPN": "jp"}

httpGetAsync();

function httpGetAsync()
{
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
        var deadline = 0;
        var deadline_str = "";
        // Check if a net time is known for the launch. If this is not
        // available, show a TBD.
        if (lobj.netstamp != 0){
            deadline = lobj.netstamp;
            deadline_str = "T-0: <a id=\"lbutton" + i + "\">" + lobj.net;
        } else {
            deadline_str = "TBD";
        }
        // Print country flag and the name of the launch
        document.getElementById("zlaunch" + i).innerHTML = insertCountryFlag(lobj.location.countryCode) + "&ensp;" + lobj.name;

        // Get a link to stream if available
        // console.log(document.getElementById("lbutton" + i));
        if (lobj.vidURL != null && lobj.vidURL != "" /*&& document.getElementById("lbutton" + i) != null*/)
        {
            document.getElementById("wlaunch" + i).innerHTML = deadline_str + "</a><span id=\"cdown" + i + "\"></span>";
            var url = addHTTP(lobj.vidURL);
            console.log(document.getElementById("lbutton" + i));
            if (document.getElementById("lbutton" + i) != null) {
                document.getElementById("lbutton" + i).href = url;
                document.getElementById("lbutton" + i).target = "_blank";
            }
            document.getElementById("wlaunch" + i).innerHTML.replace(' ', '/');  // #NoProblemo
            getTimeRemaining(deadline, i);
        } else {
            document.getElementById("wlaunch" + i).innerHTML = deadline_str + "</span><span id=\"cdown" + i + "\"></span>";
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

/**
 * Get the time remainig until the timestamp given and write it to the
 * countdown cell. However, if the timestamp is 0, no time will be written back.
 *
 * @param  {int} endtime UNIX timestamp
 * @param  {int} i       index in launch array
 *
 */
function getTimeRemaining(endtime, i){
    if (endtime == 0){
        document.getElementById("cdown" + i).innerHTML = "";
    } else {
        var t = endtime*1000 - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)));
        // Prepend 0 to numbers lower than 10
        seconds = ('0' + seconds).slice(-2);
        minutes = ('0' + minutes).slice(-2);
        var clockString = "" + hours + ":" + minutes + ":" + seconds;
        document.getElementById("cdown" + i).innerHTML = clockString;
    }
}

function updateCountdown(launchArray){
    for (var i = 0; i < launchArray.length; i++) {
        getTimeRemaining(launchArray[i].netstamp, i);
    }
}

function insertCountryFlag(countryAbbrev){
    if(countryAbbrev in countryConvert){
        return "<img src=\"flags/" + countryConvert[countryAbbrev] + ".png\">";
    } else {
        return "";
    }
}

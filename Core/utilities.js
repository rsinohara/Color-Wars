"use strict";
//var colorTable = ["#ED1B51", "#FAA21B", "#F7EC2F", "#5DBB4D", "#51A6DC", "#83769C", "#F176A6", "#FCCCAB", "brown"];
//var colorTable = ["#FE0000", "#FF9C00", "#F5FF00", "#3CF10E", "#01FFE5", "#0024FF", "#C500FF", "#FF009C", "brown"];
//var colorTable = ["#FEFF35", "#FC9A03", "#FF2710", "#B0019E", "#3E01A4", "#0248FF", "#66B132", "#D0EB2C", "brown"];
var colorTable = ["red", "orange", "yellow", "#0F9200", "#02B8D8", "#86269B", "pink", "#4AE54A", "#CC0063"];

function getColorString(color)
{


    return colorTable[color];
}

function createPlayerControls(e,player,chars) {
    for(var i=0;i<=8;i++)
    {
        e.append(
            '<input type=submit class="playerControl" data-color=' + i + ' data-code="'+ chars[i].charCodeAt(0) + '"'+

            ' data-player='+player+' value="'+ chars[i]+'" style="background-color:' + colorTable[i] + '"/>'
            );
    }
}

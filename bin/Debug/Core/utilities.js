"use strict";
var colorTable = ["red", "orange", "yellow", "green", "blue", "purple", "white", "pink", "brown"];

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
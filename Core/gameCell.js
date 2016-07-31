"use strict";
class gameCell {
    //Color
    //Owner



    initRandom() {
        this.color = Math.floor(Math.random() * 9) ;
        this.owner = 0;
        this.surrounded = false;
    }

    colorString(){
        return getColorString(this.color);
    }

    toString() {
        return this.color + '(' + this.owner + ')';
    }

}

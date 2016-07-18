class gameCell {
    //Color
    //Owner



    initRandom() {
        var colorTable = ["red", "orange", "yellow", "green", "blue", "purple", "white", "pink", "brown"];

        this.color = Math.floor(Math.random() * 9) ;
        this.colorString = colorTable[this.color];
        this.owner = 0;
    }

    toString() {
        return this.color + '(' + this.owner + ')';
    }

}
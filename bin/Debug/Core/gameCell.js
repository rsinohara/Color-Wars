class gameCell {
    //Color
    //Owner


    initRandom() {
        this.color = Math.floor(Math.random() * 9);
        this.owner = 0;
    }

    toString() {
        return this.color + '(' + this.owner + ')';
    }

}
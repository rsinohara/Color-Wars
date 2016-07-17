
class gameGrid {

    initializeGrid(width, height) {
        this.grid = Array();
        for(var i=0;i<width;i++)
        {
            this.grid[i] = Array();
            for (var j = 0; j < height; j++) {
                var cell = new gameCell();
                cell.initRandom();
                this.grid[i][j] = cell;
            }
        }
    }


}
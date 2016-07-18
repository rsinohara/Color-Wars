
class gameGrid {

    initializeGrid(width, height) {

        //Saves grid dimensions
        this.horizontalCount=width;
        this.verticalCount=height;

        this.grid = Array();

        //Initializes grid with cells
        for(var i=0;i<height;i++)
        {
            this.grid[i] = Array();
            for (var j = 0; j < width; j++) {
                var cell = new gameCell();
                cell.initRandom();
                this.grid[i][j] = cell;
            }
        }
    }

    gridToText() {
        var result='';
        for(var h=0;h<this.grid.length;h++)
        {
            for (var w = 0; w < this.grid[h].length; w++) {
                result = result + this.grid[h][w];
            }
            result = result + '<br/>';
        }
        return result;
    }

    getCellCenter(x, y) {
        var tmp = Array();
        tmp[0] = x * (this.horizontalStep)*2 + this.horizontalStep ;
        tmp[1] = y * this.verticalStep + this.verticalStep / 2;


        //Offsets in y every second column
        if ((x % 2) == 0)
        {
            tmp[1] += this.verticalStep / 2;
        }


        return tmp;
    }

    initSteps() {

        //Need to make room for offset rows
        this.horizontalStep = this.canvasWidth / (3 + (this.horizontalCount - 1) * 2);

        //This will change for hexagonal cells
        this.verticalStep = this.canvasHeight / (this.verticalCount + 0.5);


    }

    drawCanvas(e) {
        var ctx = e.getContext("2d");

        //Saves canvas dimensions
        this.canvasHeight = e.height;
        this.canvasWidth = e.width;

        //Initializes drawing steps
        this.initSteps();

        var dx = this.horizontalStep / 2*3;
        var dy = this.verticalStep / 2;
        var dxSmall = this.horizontalStep / 2;


        for (var y = 0; y < this.grid.length; y++) {
            for (var x = 0; x < this.grid[y].length; x++) {

                var center = this.getCellCenter(x, y);

                

                ctx.beginPath();
                ctx.moveTo(center[0]-dx, center[1]);
                ctx.lineTo(center[0] - dxSmall, center[1] - dy);
                ctx.lineTo(center[0] + dxSmall, center[1] - dy);
                ctx.lineTo(center[0] + dx, center[1]);
                ctx.lineTo(center[0] + dxSmall, center[1] + dy);
                ctx.lineTo(center[0] - dxSmall, center[1] + dy);
                ctx.fillStyle = this.grid[y][x].colorString;
                ctx.fill();

            }
        }


    }

}
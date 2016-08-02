"use strict";
class gameGrid {

    initializeGrid(width, height) {

        //Saves grid dimensions
        this.horizontalCount=width;
        this.verticalCount=height;

        this.grid = Array();

        this.playerCells = Array();
        this.playerCountElements = Array();
        this.players = Array();
        this.currentPlayer = 1;

        //Initializes grid with cells
        for(var i=0;i<height;i++)
        {
            this.grid[i] = Array();
            for (var j = 0; j < width; j++) {
                var cell = new gameCell();
                cell.initRandom();
                this.grid[i][j] = cell;
                cell.x = j;
                cell.y = i;
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

    initCanvasSteps() {

        //Need to make room for offset rows
        this.horizontalStep = this.canvasWidth / (3 + (this.horizontalCount - 1) * 2);

        //This will change for hexagonal cells
        this.verticalStep = this.canvasHeight / (this.verticalCount + 0.5);


    }

    initDivsSteps() {


        

        
        var r=Math.sqrt(3)/2;

        //Vertical step is calculated first because it is taken into account on overlap calculation
        this.divHeight = this.containerHeight / (this.verticalCount + 0.5 + (1 - r) / 2);
        
        //Then vertical steps are corrected to account for the symetry adjustment
        this.divHeight = this.divHeight / r;
        
        var nx = this.horizontalCount;
        //Then horizontal step with overlap taken into account
        this.divWidth = 4 * this.containerWidth / (3 * nx + 1);


        



        this.divHeight =  Math.min(this.divHeight, this.divWidth);
        this.divWidth = this.divHeight;


    }
    
    setPlayerCell(x, y, player) {

        this.playerCells[player]=Array();
     
        this.captureCell(x, y, player);
        this.players.push(player);
        if (player < this.currentPlayer) {
            this.currentPlayer = player;
        }
        this.updateScores();
    }

    updateScores() {
        for (var i = 0; i < this.players.length;i++)
            //Display score if element was defined
            if (this.playerCountElements[this.players[i]] != 'undefined') {
                this.playerCountElements[this.players[i]].text(this.playerCells[this.players[i]].length);
            }
    }

    play(player,newColor)
    {
        if (this.currentPlayer != player)
        {
            console.warn("Not this player's turn!");
            return;
        }

        for (var i = 0; i < this.playerCells[player].length;i++)
        {
            var cell= this.playerCells[player][i];
            cell.color = newColor;
            if(!cell.surrounded)
            {
                this.checkNeighbors(cell);
            }
        }

        this.draw();
        
        this.updateScores();

        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i] == player) {
                var nextPlayerIndex = (i + 1) % this.players.length;
                this.currentPlayer = this.players[nextPlayerIndex];
            }
        }
            
    }

    captureCell(x,y,player)
    {
        this.grid[y][x].owner = player;
        this.playerCells[player].push(this.grid[y][x]);
        if (!this.grid[y][x].surrounded) {
            this.checkNeighbors(this.grid[y][x]);
        }
    }

    checkNeighbors(cell) {
        var surrounded = true;

        //Setup deltas for neighbors
        var deltasX = [-1,-1,0,0,1,1]
        if (cell.x % 2 == 0) {
            var deltasY = [0, 1, -1, 1, 0, 1]
        }
        else {
            var deltasY = [-1, 0, -1, 1, -1, 0]
        }

        //Iterate through every neighbor
        for (var i = 0; i <= 5; i++) {
            var dx = deltasX[i];
            var dy = deltasY[i];

            var neighborX = cell.x + dx;
            var neighborY = cell.y + dy;

            //Check if neighbor is not out of the grid, or the same cell
            if (((dx != 0) || (dy != 0)) &&
                (neighborX >= 0) && (neighborX < this.horizontalCount) &&
                (neighborY>=0) && (neighborY<this.verticalCount))
            {
                var neighbor = this.grid[neighborY][neighborX];

                if(cell.owner!=neighbor.owner)
                {
                    //Oponent's cell: do nothing
                    if (neighbor.owner != 0) {}
                    //Capture
                    else if(cell.color==neighbor.color){
                        this.captureCell(neighborX, neighborY, cell.owner);
                    }
                    //Neighbor is not owned, not same color: mark cell as not surrounded
                    else {
                        surrounded = false;
                    }

                }
            }
            
        }
        cell.surrounded=surrounded
    }

    draw() {
        if(this.usingCanvas)
        {
            this.drawCanvas();
        }
        if(this.usginDivs)
        {
            this.drawDivs();
        }
    }

    drawDivs(e) {
        if (arguments.length >= 1) {
            this.divsContainer = e;
            this.usingDivs = true;
            this.containerWidth = e.width();
            this.containerHeight = e.height();
        }
        var parent = this.divsContainer;

        if(parent.children().length==0)
        {
            this.createDivs();
        }
    }

    createDivs() {
        this.initDivsSteps();


        for (var y = 0; y < this.grid.length; y++) {
            //var row = document.createElement('div');
            //row.className += 'row';

            //row = $(row);
            //row.height(this.divHeight);
            
            //this.divsContainer.append(row);
            for (var x = 0; x < this.grid[y].length; x++) {

                var div = document.createElement('div');
                var cell = document.createElement('div');
                div.className = 'cell-container';

                div.setAttribute('data-pos', '(' + x + ',' + y + ')');

                var r=Math.sqrt(3)/2
                var top = (this.divHeight * r  * y)-(this.divHeight*(1-r)/2);

                //Position taking into account overlap
                var left = ((this.divWidth / 2 + this.divHeight / 4) * x);
                if ((x % 2) == 0) {
                    top += (this.divHeight * r / 2);
                }
  


                div.style.left = left + 'px';
                div.style.top = top + 'px';
                div.style.width = this.divWidth  + 'px';
                div.style.height = this.divHeight + 'px';
                cell.className = 'cell content hexagon hexagon-' + this.grid[y][x].colorString();
                this.divsContainer.append(div);
                $(div).append(cell);

                //var maskLeft = document.createElement('div');
                //maskLeft.className = "cell-mask-left";
                //var maskRight = document.createElement('div');
                //maskRight.className = "cell-mask-right";

                //$(cell).append(maskLeft);
                //$(cell).append(maskRight);

            }
        }


    }

    drawCanvas(e) {

        //If a canvas was passed, save it
        if (arguments.length >= 1)
        {
            this.canvas = e;
            this.canvasContext = this.canvas.getContext("2d");
            this.usingCanvas = true;
        }

        var ctx = this.canvasContext;
        

        //Saves canvas dimensions
        this.canvasHeight = this.canvas.height;
        this.canvasWidth = this.canvas.width;

        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        //Initializes drawing steps
        this.initCanvasSteps();

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
                ctx.fillStyle = this.grid[y][x].colorString();
                ctx.fill();

                if (this.grid[y][x].owner != 0) {
                    ctx.font = dy + "px Arial";
                    ctx.fillStyle = "black";
                    ctx.fillText(this.grid[y][x].owner, center[0] - dy / 4, center[1] + dy / 3);
                }

               
            }
        }


    }

}
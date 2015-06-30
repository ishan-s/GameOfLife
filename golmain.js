function getQueryParams(qs) { var d=decodeURIComponent,r = {},s=/[?&]?([^=]+)=([^&]*)/g; while(i=s.exec(qs)){r[d(i[1])]=d(i[2]);} return r; } 
function getParameter(name) { try{ return getQueryParams (location.search)[name]; } catch (e){ return ''; } }
var timer = null;
var canvasGrid = document.getElementById("canvas_grid");
var canvasMain = document.getElementById("canvas_main");
var ctxGrid = canvasGrid.getContext("2d");
var ctxMain = canvasMain.getContext("2d");
var CELL_SIZE=10;
CELL_SIZE = getParameter('gridsize');
if(typeof CELL_SIZE=='undefined')
    CELL_SIZE=10;
else
    CELL_SIZE=Number(CELL_SIZE);

var numCellsX = canvasMain.width / CELL_SIZE;
var numCellsY = canvasMain.height / CELL_SIZE;
var maxPopulation = numCellsX * numCellsY;
var play = false;
var lifeGrid = new Array(numCellsX);
var tempGrid = new Array(numCellsX);
var lifeAnimationTimeout = 100;
var imgShape = document.getElementById("imgShape");
var imgSelector = document.getElementById("imgSelector");
var CELL_COLOR = "rgb(255, 200, 0)";
var CELL_COLOR_AGED = "rgb(250, 150, 0)";


//TODO: For change in cell size
function recalcVars(){
    alert("recalc:"+CELL_SIZE);
    numCellsX = canvasMain.width / CELL_SIZE;
    numCellsY = canvasMain.height / CELL_SIZE;
    
    lifeGrid = new Array(numCellsX);
    tempGrid = new Array(numCellsX);
    
    init();
    resetTempGrid();
}

function cellSizeChange(cellSize){
    reset();
    CELL_SIZE = Number(cellSize);
    recalcVars();
}

function shapeSelect(val){
    if(val=="block")
        imgShape.src="./images/block.png";
    else if(val=="beehive")
        imgShape.src="./images/beehive.png";
    else if(val=="loaf")
        imgShape.src="./images/loaf.png";
    else if(val=="boat")
        imgShape.src="./images/boat.png";
    else if(val=="beacon")
        imgShape.src="./images/beacon.gif";
    else if(val=="blinker")
        imgShape.src="./images/blinker.gif";
    else if(val=="glider")
        imgShape.src="./images/glider.gif";
    else if(val=="lwss")
        imgShape.src="./images/lwss.gif";
    else if(val=="toad")
        imgShape.src="./images/toad.gif";
    else if(val=="pulsar")
        imgShape.src="./images/pulsar.gif";
}

function getMousePositionOnDrop(ev){
/*  var X = event.layerX - $(event.target).position().left;
    var Y = event.layerY - $(event.target).position().top;
    */
    var X = ev.pageX - ev.currentTarget.offsetLeft
    var Y = ev.pageY - ev.currentTarget.offsetTop;

    return {x:X, y:Y};
}

var pos;
function getPos(ev){
    pos = [ev.pageX, ev.pageY];
}
      
function allowDrop(ev) {
    
    ev.preventDefault();
}

function drag(ev){
    var selectedshape = imgSelector.options[imgSelector.selectedIndex].value;
    ev.dataTransfer.setData("shape", selectedshape);
}

function drop(ev){
    ev.preventDefault();
    
    var dataS = ev.dataTransfer.getData("shape");
    var mPos = getMousePositionOnDrop(ev);
    drawShapeOnCoords(dataS, mPos);
}

var i;
for(i=0; i<numCellsX; i++){
    lifeGrid[i] = new Array(numCellsY);
}
for(i=0; i<numCellsX; i++){
    tempGrid[i] = new Array(numCellsY);
}

function resetTempGrid(){
    for(var ix=0; ix<numCellsX; ix++)
        for(var iy=0; iy<numCellsY; iy++)
            tempGrid[ix][iy]=false;
}


function init(){
    drawGrid();
    
    for(var ix=0; ix<numCellsX; ix++)
        for(var iy=0; iy<numCellsY; iy++)
            lifeGrid[ix][iy]=0;
    
    if(CELL_SIZE<10)
        document.getElementById('radioCellSizeFine').checked=true;
    else
        document.getElementById('radioCellSizeCoarse').checked=true;
}

function playPause(val){
    if(val=="Live!"){
        startAnimation();
        document.getElementById("button_playpause").value="Freeze!";
    }
    else{
        stopAnimation();
        document.getElementById("button_playpause").value="Live!"
    }
    play = !play;
}

function changeGridSize(cellsize){
    var url = window.location.href;
    var ind=-1;
    if(url.indexOf('?')>-1){
        var i1 = url.indexOf('gridsize=');
        if(i1<0)
            url+='gridsize='+cellsize;
        else{
            var i2=url.indexOf('&', i1);
            var url2;
            if(i2<0)
                url2=url.substring(0, i1)+'gridsize='+cellsize;
            else
                url2=url.substring(0, i1)+'gridsize='+cellsize+url.substring(i2,url.length);
            
            url=url2;
        }
    }
    else{
        url+='?gridsize='+cellsize;
    }
        
    window.location.href=url;
}

function showGrid(showgrid){
    if(!showgrid)
        ctxGrid.clearRect(0,0,canvasGrid.width, canvasGrid.height);
    else
        drawGrid();
}

function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}

HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

function drawGrid (){   
    ctxGrid.clearRect(0, 0, canvasGrid.width, canvasGrid.height);
    //draw grid lines
    for (var x=0.5; x<500; x=x+CELL_SIZE){
        ctxGrid.moveTo(x, 0);
        ctxGrid.lineTo(x, 500);
    }

    for(var y=0.5; y<500; y=y+CELL_SIZE){
        ctxGrid.moveTo(0, y);
        ctxGrid.lineTo(500, y);
    }

    ctxGrid.strokeStyle="#eee";
    ctxGrid.stroke();
}

function speedChange(playSpeed){
    lifeAnimationTimeout = 2000 * (1/playSpeed);
    clearTimeout(timer);
    if(play)
        timer = setInterval(letThereBeLife, lifeAnimationTimeout);
    
    redrawColoredCells();
}


function colorCell(ctx, cellx, celly, rgbColor){
    ctx.fillStyle = rgbColor;
    
    var cellxcoord = cellx * CELL_SIZE + 1;
    var cellycoord = celly * CELL_SIZE + 1;
    ctx.fillRect(cellxcoord, cellycoord, CELL_SIZE, CELL_SIZE);
}

function startAnimation(){
    clearTimeout(timer);
    timer = setInterval(letThereBeLife, lifeAnimationTimeout);
}

function stopAnimation(){
    clearTimeout(timer);
    ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
    redrawColoredCells();
}


function reset(){
    playPause("Freeze!");
    
    clearTimeout(timer);
    ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
     for(var ix=0; ix<numCellsX; ix++)
        for(var iy=0; iy<numCellsY; iy++)
            lifeGrid[ix][iy]=0;
    
    resetTempGrid();
}

function randomizeSeed(){    
    var rndPopulation = Math.floor((Math.random() * maxPopulation) + 1);
    for(var cnt=0; cnt<rndPopulation; cnt++){
        var rnx = Math.floor((Math.random() * numCellsX) + 1);
        var rny = Math.floor((Math.random() * numCellsY) + 1);   
        lifeGrid[rnx][rny] = 1;
        redrawColoredCells();
    }
    
    ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
    redrawColoredCells();
    
}


function getCellIndexForClick(coords){
    return {x_index:Math.floor(coords.x/CELL_SIZE), y_index:Math.floor(coords.y/CELL_SIZE)};    
}

function redrawColoredCells(){
    for(var xi = 0; xi<numCellsX; xi++){
        for(yi = 0; yi<numCellsY; yi++){
            if(lifeGrid[xi][yi]==1)
                colorCell(ctxMain, xi, yi, CELL_COLOR);
            else if(lifeGrid[xi][yi]>1)
                colorCell(ctxMain, xi, yi, CELL_COLOR_AGED);
        }
    }
}

function colorCellOnCoords(coord){
    var ci = getCellIndexForClick(coord);
    
    alert("ci.x: "+ci.x_index+", ci.y: "+ci.y_index);
    
    if(Number(lifeGrid[ci.x_index][ci.y_index])==1){
        lifeGrid[ci.x_index][ci.y_index] = 0
    }
    else
        lifeGrid[ci.x_index][ci.y_index] = 1;
    
    ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
    redrawColoredCells();
    document.getElementById("spnXY").innerHTML= ci.x_index+", "+ci.y_index;
    
}

function colorCellOnClick(){
    var mc = canvasMain.relMouseCoords(event);
    var ci = getCellIndexForClick(mc)
    
    if(Number(lifeGrid[ci.x_index][ci.y_index])==1){
        lifeGrid[ci.x_index][ci.y_index] = 0
    }
    else
        lifeGrid[ci.x_index][ci.y_index] = 1;
    
    ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
    redrawColoredCells();
    document.getElementById("spnXY").innerHTML= ci.x_index+", "+ci.y_index;

}

function alive(lifecell){
    if(lifecell>=1)
        return 1;
    else
        return 0;
}

function neighbourhood(x, y){
    //alert("neighbourhood("+x+","+y+")");
    var aliveNeighbours = 0;
    if(x==0 && y==0){
        aliveNeighbours = alive(lifeGrid[1][0]) + alive(lifeGrid[1][1]) + alive(lifeGrid[0][1]);
        return aliveNeighbours;
    }
    
    else if(x==0 && y==numCellsY-1){
        aliveNeighbours = alive(lifeGrid[0][numCellsY-2]) + alive(lifeGrid[1][numCellsY-2]) + alive(lifeGrid[1][numCellsY-1]);
        return aliveNeighbours;
    }
        
    else if(x==numCellsX-1 && y==0){
                aliveNeighbours = alive(lifeGrid[numCellsX-2][0]) + alive(lifeGrid[numCellsX-2][1]) + alive(lifeGrid[numCellsX-1][1]);
        return aliveNeighbours;
    }
        
    else if(x==numCellsX-1 && y==numCellsY-1){
         aliveNeighbours = alive(lifeGrid[numCellsX-2][numCellsY-1]) + alive(lifeGrid[numCellsX-2][numCellsY-2]) + alive(lifeGrid[numCellsX-1][numCellsY-2]);
        return aliveNeighbours;
    }
    
    else if(y==0){
        aliveNeighbours = alive(lifeGrid[x-1][y]) + alive(lifeGrid[x-1][y+1]) + alive(lifeGrid[x][y+1]) + alive(lifeGrid[x+1][y+1]) + alive(lifeGrid[x+1][y]);
        return aliveNeighbours;
    }
    
    else if(x==numCellsX-1){
         aliveNeighbours = alive(lifeGrid[x][y-1]) + alive(lifeGrid[x-1][y-1]) + alive(lifeGrid[x-1][y]) + alive(lifeGrid[x-1][y+1]) + alive(lifeGrid[x][y+1]);
        return aliveNeighbours;
    }
    
    else if(y==numCellsY-1){
         aliveNeighbours = alive(lifeGrid[x-1][y]) + alive(lifeGrid[x-1][y-1]) + alive(lifeGrid[x][y-1]) + alive(lifeGrid[x+1][y-1]) + alive(lifeGrid[x+1][y]);
        return aliveNeighbours;
    }
    
    else if(x==0){
         aliveNeighbours = alive(lifeGrid[x][y-1]) + alive(lifeGrid[x+1][y-1]) + alive(lifeGrid[x+1][y]) + alive(lifeGrid[x+1][y+1]) + alive(lifeGrid[x][y+1]);
        return aliveNeighbours;
    }
    
    else{
        aliveNeighbours = alive(lifeGrid[x-1][y-1]) + alive(lifeGrid[x][y+1]) + alive(lifeGrid[x+1][y-1]) + alive(lifeGrid[x+1][y]) + alive(lifeGrid[x+1][y+1]) + alive(lifeGrid[x][y-1]) + alive(lifeGrid[x-1][y+1]) + alive(lifeGrid[x-1][y]);
        return aliveNeighbours;
    }
    
return aliveNeighbours;
}

function letThereBeLife(){
    ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
   // alert("letThereBeLife()");
    for(var xi=0; xi<numCellsX; xi++){
        for(var yi=0; yi<numCellsY; yi++){
            var ndata = Number(neighbourhood(Number(xi), Number(yi)));
            
            //alert("ndata("+xi+", "+yi+")="+ndata);
            
            //fewer than 2 live neighbours - DIE!!!
            if(lifeGrid[xi][yi]>=1){
                 if(ndata<2){
                    tempGrid[xi][yi] = false;
                    continue;
                }
                else if(ndata==2 || ndata==3){
                    tempGrid[xi][yi] = true;
                }
                else if(ndata>3){
                    tempGrid[xi][yi] = false;
                    continue;
                }
            }
            else if(lifeGrid[xi][yi]==0){
                //alert("dead");
                if(ndata==3){
                tempGrid[xi][yi] = true;
                continue;
                //alert("LIVE - population("+ndata+"+) - "+xi+", "+yi);
                }
            }
                
        }
    }
        for(var xi=0; xi<numCellsX; xi++){
        for(var yi=0; yi<numCellsY; yi++){
            var ndata = Number(neighbourhood(Number(yi), Number(xi)));
            
            //alert("ndata("+xi+", "+yi+")="+ndata);
            
            //fewer than 2 live neighbours - DIE!!!
            if(lifeGrid[yi][xi]>=1){
                 if(ndata<2){
                    tempGrid[yi][xi] = tempGrid[yi][xi]&&false;
                    continue;
                }
                else if(ndata==2 || ndata==3){
                    tempGrid[yi][xi] = tempGrid[yi][xi]||true;
                }
                else if(ndata>3){
                    tempGrid[yi][xi] = tempGrid[yi][xi]&&false;
                    continue;
                }
            }
            else if(lifeGrid[yi][xi]==0){
                //alert("dead");
                if(ndata==3){
                tempGrid[yi][xi] = tempGrid[yi][xi]||true;
                    //alert(xi+","+yi+":"+tempGrid[yi][xi]);
                continue;
                //alert("LIVE - population("+ndata+"+) - "+xi+", "+yi);
                }
            }   
        }
    }
            
    for(var xi=0; xi<numCellsX; xi++){
        for(var yi=0; yi<numCellsY; yi++){
            if(tempGrid[xi][yi]){
                //if(lifeGrid[xi][yi]>=1)
                    lifeGrid[xi][yi]++;
            }
            else
                lifeGrid[xi][yi]=0;
        }
    }
    
    redrawColoredCells();
    resetTempGrid();
}

function testndata(){
    var ix = document.getElementById("xtest").value;
    var iy = document.getElementById("ytest").value;
    
    alert("life status="+Number(lifeGrid[Number(ix)][Number(iy)])+", ndata="+neighbourhood(Number(ix), Number(iy)));
    
    
}



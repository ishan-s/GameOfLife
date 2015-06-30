function drawShapeOnCoords(shape, spos){
    var centerCellIndex = getCellIndexForClick(spos);
    
    if(shape=="block")
        drawBlock(centerCellIndex);
    
    else if(shape=="beehive")
        drawBeehive(centerCellIndex);
    
    else if(shape=="loaf")
        drawLoaf(centerCellIndex);
    
    else if(shape=="boat")
        drawBoat(centerCellIndex);
    
    else if(shape=="beacon")
        drawBeacon(centerCellIndex);
    
    else if(shape=="blinker")
        drawBlinkerH(centerCellIndex);
    
    else if(shape=="glider")
        drawGliderDR(centerCellIndex);
    
    else if(shape=="lwss")
        drawLwss(centerCellIndex);
    
    else if(shape=="toad")
        drawToad(centerCellIndex);
          
    else if(shape=="pulsar")
        drawPulsar(centerCellIndex);
    
    redrawColoredCells();
}

function drawBlock(cell){
    lifeGrid[cell.x_index][cell.y_index]=1;
    lifeGrid[cell.x_index][cell.y_index+1]=1;
    lifeGrid[cell.x_index+1][cell.y_index]=1;
    lifeGrid[cell.x_index+1][cell.y_index+1]=1;  
}

function drawBeehive(cell){
    lifeGrid[cell.x_index][cell.y_index]=1;
    lifeGrid[cell.x_index+1][cell.y_index]=1;
    lifeGrid[cell.x_index+2][cell.y_index+1]=1;
    lifeGrid[cell.x_index-1][cell.y_index+1]=1;
    lifeGrid[cell.x_index][cell.y_index+2]=1;
    lifeGrid[cell.x_index+1][cell.y_index+2]=1;
}

function drawLoaf(cell){
    lifeGrid[cell.x_index][cell.y_index]=1;
    lifeGrid[cell.x_index+1][cell.y_index]=1;
    lifeGrid[cell.x_index+2][cell.y_index+1]=1;
    lifeGrid[cell.x_index+2][cell.y_index+2]=1;
    lifeGrid[cell.x_index+1][cell.y_index+3]=1;
    lifeGrid[cell.x_index][cell.y_index+2]=1;
    lifeGrid[cell.x_index-1][cell.y_index+1]=1;
}

function drawBoat(cell){
    lifeGrid[cell.x_index][cell.y_index]=1;
    lifeGrid[cell.x_index+1][cell.y_index]=1;
    lifeGrid[cell.x_index+2][cell.y_index+1]=1;
    lifeGrid[cell.x_index+1][cell.y_index+2]=1;
    lifeGrid[cell.x_index][cell.y_index+1]=1;
}

function drawBeacon(cell){
    drawBlock(cell);
    drawBlock({x_index:cell.x_index+2, y_index:cell.y_index+2});
}

function drawBlinkerH(cell){
    lifeGrid[cell.x_index][cell.y_index]=1;
    lifeGrid[cell.x_index+1][cell.y_index]=1;
    lifeGrid[cell.x_index-1][cell.y_index]=1;
}

function drawBlinkerV(cell){
    lifeGrid[cell.x_index][cell.y_index]=1;
    lifeGrid[cell.x_index][cell.y_index+1]=1;
    lifeGrid[cell.x_index][cell.y_index-1]=1;
}

//DR - Down Right
function drawGliderDR(cell){
    drawBlinkerH(cell);
    lifeGrid[cell.x_index+1][cell.y_index-1]=1;
    lifeGrid[cell.x_index][cell.y_index-2]=1;
}

function drawLwss(cell){
    lifeGrid[cell.x_index][cell.y_index]=1;
    lifeGrid[cell.x_index][cell.y_index+2]=1;
    lifeGrid[cell.x_index+3][cell.y_index]=1;
    drawBlinkerH({x_index:cell.x_index+2, y_index:cell.y_index+3});
    drawBlinkerV({x_index:cell.x_index+4, y_index:cell.y_index+2});
}

function drawToad(cell){
    drawBlinkerH(cell);
    drawBlinkerH({x_index:cell.x_index-1, y_index:cell.y_index+1});
}

function drawPulsar(cell){
     drawBlinkerH({x_index:cell.x_index-3, y_index:cell.y_index-1});
     drawBlinkerH({x_index:cell.x_index-3, y_index:cell.y_index+1});
     drawBlinkerH({x_index:cell.x_index+3, y_index:cell.y_index-1});
     drawBlinkerH({x_index:cell.x_index+3, y_index:cell.y_index+1});
    
     drawBlinkerH({x_index:cell.x_index-3, y_index:cell.y_index+6});
     drawBlinkerH({x_index:cell.x_index-3, y_index:cell.y_index-6});
     drawBlinkerH({x_index:cell.x_index+3, y_index:cell.y_index+6});
     drawBlinkerH({x_index:cell.x_index+3, y_index:cell.y_index-6});
    
     drawBlinkerV({x_index:cell.x_index-1, y_index:cell.y_index-3});
     drawBlinkerV({x_index:cell.x_index-1, y_index:cell.y_index+3});
     drawBlinkerV({x_index:cell.x_index+1, y_index:cell.y_index-3});
     drawBlinkerV({x_index:cell.x_index+1, y_index:cell.y_index+3});
    
     drawBlinkerV({x_index:cell.x_index-6, y_index:cell.y_index-3});
     drawBlinkerV({x_index:cell.x_index-6, y_index:cell.y_index+3});
     drawBlinkerV({x_index:cell.x_index+6, y_index:cell.y_index-3});
     drawBlinkerV({x_index:cell.x_index+6, y_index:cell.y_index+3}); 
}
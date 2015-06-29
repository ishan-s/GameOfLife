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
var currentPopulation=0;
var maxPopulation=0;
var timeCycle=0;
var currentPopulationDisplay = document.getElementById('statCurrentPopulation');
var maxPopulationDisplay = document.getElementById('statMaxPopulation');
var timeCycleDisplay = document.getElementById('statTimeCycle');

function initStats(){
    currentPopulation=0;
    maxPopulation=0;
    timeCycle=0;
    updateStatsDisplay();
}
function updateStatsDisplay(){
    currentPopulationDisplay.innerHTML = currentPopulation;
    maxPopulationDisplay.innerHTML = maxPopulation;
    timeCycleDisplay.innerHTML = timeCycle;
}
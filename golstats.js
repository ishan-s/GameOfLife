var currentPopulation=0;
var maxPopulation=0;
var currentPopulationDisplay = document.getElementById('statCurrentPopulation');
var maxPopulationDisplay = document.getElementById('statMaxPopulation');

function initStats(){
    currentPopulation=0;
    maxPopulation=0;
    updateStatsDisplay();
}
function updateStatsDisplay(){
    currentPopulationDisplay.innerHTML = currentPopulation;
    maxPopulationDisplay.innerHTML = maxPopulation;
}
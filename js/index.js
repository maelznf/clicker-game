var player = {
  total: 0,
  level: 0,
  dollars: 0,
  dollarsSec: 1,
  dollarsPerClick: 1.0,
  buildings: {},
  bonuses: {}
};




function itemBuyButtonClick(name){
  var building = buildings[name];
  var currentLevel = player.buildings[name];
  if(!currentLevel){
    currentLevel = 0;
  }
  currentLevel++;
  if(currentLevel <= building.nvLimit){
    if (player.dollars >= buildingForLevel(building, currentLevel - 1).price){
      player.buildings[name] = currentLevel;
      player.dollarsSec = player.dollarsSec + buildingForLevel(building, currentLevel - 1).numberSec;
      player.dollars = player.dollars - buildingForLevel(building, currentLevel - 1).price;

      UI.setIncoming(player.dollarsSec)
      UI.setMoney(player.dollars)
      UI.setItemOptions(name, currentLevel, buildingForLevel(building, currentLevel).price, buildingForLevel(building, currentLevel).numberSec)
    }
  }
}

function buildingForLevel(building, level){
  var priceCalculated = building.price + building.price * 1.6 * level;
  var nbSec = building.numberSec + building.numberSec * level * 0.6;
  return {
    price: priceCalculated,
    numberSec: nbSec
  };
}

function bonusForLevel(bonusTo, level){
  return {
    price: bonusTo.price + bonusTo.price * 1.3 * level,
    numberSec: bonusTo.numberSec + bonusTo.numberSec * level * 0.6
  };
}


function bonusBuyButtonClick(bonusName){
  var bonusSelected = bonus[bonusName];
  var currentNb = player.bonuses[bonusName]
  if (!currentNb){
  currentNb = 0
  }
  currentNb++;

  if (currentNb <= bonusSelected.nbLimit){
    if (player.dollars >= bonusForLevel(bonusSelected, currentNb - 1).price){
      player.bonuses[bonusName] = currentNb;
      player.dollars = player.dollars - bonusForLevel(bonusSelected, currentNb - 1).price
      player.dollarsPerClick = player.dollarsPerClick + bonusForLevel(bonusSelected, currentNb - 1).numberSec

      UI.setDollarsPerClick(player.dollarsPerClick);
      UI.setBonusOptions(bonusName, currentNb, bonusForLevel(bonusSelected, currentNb).price, bonusForLevel(bonusSelected, currentNb).numberSec);
      UI.setItemOptions(player.dollars)
    }
  }
}


function mainButtonClick (){
  console.log("clicked");
  addMoneyToPlayer(player.dollarsPerClick);
}

function everySecondMakeMoney (){
  addMoneyToPlayer(player.dollarsSec);
  setTimeout(everySecondMakeMoney, 1000);
}

function addMoneyToPlayer (moneyToAdd){
  player.dollars = player.dollars + moneyToAdd;
  player.total = player.total + moneyToAdd;
  if (player.total >= levelCalcul(player.level)){
    player.level = player.level + 1
  }
  UI.setLevel(player.level)
  UI.setMoney(player.dollars);
  UI.setTotal(player.total);
}

function levelCalcul (level){
  return Math.pow(level * 15, 2.5)
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function start(){
  console.log("Start the game");
  everySecondMakeMoney();

  UI.setItemOptions("ambassade", 0, buildingForLevel(buildings.ambassade, 0).price, buildingForLevel(buildings.ambassade, 0).numberSec);
  UI.setItemOptions("camp", 0,buildingForLevel(buildings.camp, 0).price, buildingForLevel(buildings.camp, 0).numberSec);
  UI.setItemOptions("naval", 0,buildingForLevel(buildings.naval, 0).price, buildingForLevel(buildings.naval, 0).numberSec);
  UI.setItemOptions("industrie", 0,buildingForLevel(buildings.industrie, 0).price, buildingForLevel(buildings.industrie, 0).numberSec);
  UI.setItemOptions("laboratoire", 0,buildingForLevel(buildings.laboratoire, 0).price, buildingForLevel(buildings.laboratoire, 0).numberSec);
  UI.setItemOptions("marche", 0, buildingForLevel(buildings.marche, 0).price, buildingForLevel(buildings.marche, 0).numberSec);

  UI.setBonusOptions("bottle", 0, bonusForLevel(bonus.bottle, 0).price, bonusForLevel(bonus.bottle, 0).numberSec);
  UI.setBonusOptions("bottle2", 0, bonusForLevel(bonus.bottle2, 0).price, bonusForLevel(bonus.bottle2, 0).numberSec);
  UI.setBonusOptions("medkit", 0, bonusForLevel(bonus.medkit, 0).price, bonusForLevel(bonus.medkit, 0).numberSec);
  UI.setBonusOptions("medkit2", 0, bonusForLevel(bonus.medkit2, 0).price, bonusForLevel(bonus.medkit2, 0).numberSec);
}



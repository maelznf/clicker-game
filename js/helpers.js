
/**
 * UI helper
 */
var UI = (function(self){
  // weapons
  var $weapons;
  var $weaponList;

  // header
  var $header;
  var $money;
  var $incoming;
  var $level;
  var $total;

  var weaponBoughtListeners = [];
  var mainButtonListeners = [];
  var bonusBoughtListeners = [];

  self.init = function(){
    $weapons = $("#buildings");
    $weaponList = $(".building");
    
    // headers attr
    $header = $("#header");
    $money = $("#money > span");
    $incoming = $("#incoming > span");
    $level = $("#level > span");
    $total = $("#total > span");

    // listeners
    $(".building button").click(function(evt){
      var identifier = $(evt.currentTarget).closest(".building")[0].id;
      for(var i = 0; i < weaponBoughtListeners.length; i++){
        if(weaponBoughtListeners[i]){
          weaponBoughtListeners[i](identifier);
        }
      }
    });
    $(".bonus button").click(function(evt){
      var identifier = $(evt.currentTarget).closest(".bonus")[0].id;
      for(var i = 0; i < bonusBoughtListeners.length; i++){
        if(bonusBoughtListeners[i]){
          bonusBoughtListeners[i](identifier);
        }
      }
    });

    $("#main-button").click(function(){
      getAudioFor("shell_falling").play();
      for(var i = 0; i < mainButtonListeners.length; i++){
        if(mainButtonListeners[i]){
          mainButtonListeners[i]();
        }
      }
    });
  };

  self.setLevel = function(level){
    if(level > 18){
      level = 18;
    } else if(level < 1){
      level = 1;
    }

    if(level < 10){
      level = "0" + level;
    }

    $("#player-medal").attr("src", "./img/military/medals/medal_"+level+".png");
    $level.html(level);
  };

  self.onItemBuyButtonClicked = function(method){
    weaponBoughtListeners.push(method);
  };
  self.onBonusBuyButtonClicked = function(method){
    bonusBoughtListeners.push(method);
  };
  self.onMainButtonClicked = function(method){
    mainButtonListeners.push(method);
  };

  self.setDollarsPerClick = function(value){
    $("#dollars-click > span").html(parseInt(value * 100)/100);
  }

  self.setMoney = function(value){
    $money.html(parseInt(value * 100)/100);
  };

  self.setTotal = function(value){
    $total.html(parseInt(value * 100)/100);
  };

  self.setIncoming = function(value){
    $incoming.html(parseInt(value * 100)/100);
  };
  
  self.setItemOptions = function(id, quantity, nextPrice, nextDollarsPerSecond){
    var $wp = getWeaponById(id);
    $wp.find(".quantity > span").first().html(parseInt(quantity * 100)/100);
    $wp.find(".dollars-per-sec > span").first().html(parseInt(nextDollarsPerSecond * 100)/100);
    $wp.find("button > span").first().html(parseInt(nextPrice * 100)/100 );
  };
  
  self.setBonusOptions = function(id, quantity, nextPrice, nextDollarsPerClick){
    var $bonus = getBonusById(id);
    $bonus.find(".quantity > span").first().html(parseInt(quantity * 100)/100);
    $bonus.find(".dollars-per-sec > span").first().html(parseInt(nextDollarsPerClick * 100)/100);
    $bonus.find("button > span").first().html(parseInt(nextPrice * 100)/100);
  };

  self.itemBought = function(id){
    getAudioFor(/*id*/ "click").play();
  };

  function getBonusById(id){
    return $("#"+id);
  }

  function getWeaponById(id){
    return $("#"+id);
  }

  function getAudioFor(id){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', './sounds/'+id+".mp3");
    return audioElement;
  }

  return self;
})({});


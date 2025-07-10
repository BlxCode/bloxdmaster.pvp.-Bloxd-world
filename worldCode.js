
var onQueue = false;
var queue = [];
var playersIn1v1 = [];
var P1posZ = 1019.5;
var P2posX;
var P1posX;
var P2posZ = 1003.5;

function onPlayerJoin(playerId){
   let killCount; 
  let deathCount;
 api.setClientOptions(playerId,{secsToRespawn: 0,maxAuraLevel : 0});
 let  winRate;
  if (api.getMoonstoneChestItemSlot(playerId, 0) == undefined||api.getMoonstoneChestItemSlot(playerId, 0) == null) {

    
  // Kill Count
    api.setMoonstoneChestItemSlot(playerId, 0, "Dirt", 1, {customDisplayName:"0"});
  // Death Count
    api.setMoonstoneChestItemSlot(playerId, 1, "Dirt", 1, {customDisplayName:"0"});
  
// Win Rate
    api.setMoonstoneChestItemSlot(playerId, 3, "Dirt", 1, {customDisplayName:"0"});
      winRate = api.getMoonstoneChestItemSlot(playerId, 3).attributes.customDisplayName;
  killCount = api.getMoonstoneChestItemSlot(playerId, 0).attributes.customDisplayName;
  deathCount = api.getMoonstoneChestItemSlot(playerId, 1).attributes.customDisplayName;
 
  }else{
  
  killCount = api.getMoonstoneChestItemSlot(playerId, 0).attributes.customDisplayName;
  deathCount = api.getMoonstoneChestItemSlot(playerId, 1).attributes.customDisplayName;
    winRate = killCount/deathCount;
 
  }
  api.setPosition(playerId, 999.5, 996, 999.5);
  api.setCameraDirection(playerId, [0, 0, 10.5]);
  api.clearInventory(playerId);
  api.giveItem(playerId, "Gold Sword", 10);
  api.sendMessage(playerId, "Hello, " + api.getEntityName(playerId) + "! Welcome to this PvP focoused world! ");
  api.setItemSlot(playerId, 46, 'Diamond Helmet',1,{},true);
  api.setItemSlot(playerId, 47, 'Diamond Chestplate',1,{},true);
  api.setItemSlot(playerId, 48, 'Diamond Gauntlets',1,{},true);
  api.setItemSlot(playerId, 49, 'Diamond Leggings',1,{},true);
  api.setItemSlot(playerId, 50, 'Diamond Boots',1,{},true);
  

  api.setClientOptions(playerId, {
    lobbyLeaderboardInfo: {
      pfp: {
        displayName: "👤 Profile",
        sortPriority: 1,
      },
      name: {
        displayName: "🏷️ Name",
        sortPriority: 0,
      },
      kills: {
        displayName: "🗡️ Kills",
        sortPriority: 2,
      },
      deaths: {
        displayName: "💀 Deaths",
        sortPriority: 3,
      },
    
      winRate: {
        displayName: "💯 K/D Ratio",
        sortPriority: 5,
      }
    }
  });




  api.setTargetedPlayerSettingForEveryone(
    playerId,
    "lobbyLeaderboardValues",
    {kills: killCount, deaths: deathCount, winRate: winRate},
    true
  );
}

function onPlayerChat(myId, message) {
 //s0nicblxd from discord for the custom ranks
  if(api.getEntityName(myId)=='AncientHotDog1562572'){
     api.broadcastMessage([
      {str: "[", style: {color: "#FED207"}},
      {icon: "wrench", style: {color: "#FED207"}},
      {str: " Owners] ", style: {color: "#FED207"}},
      api.getEntityName(myId),
      {str: ": " + message, style: {color: "#FFFFFF"}}
    ]);
    if(message.startsWith("!")){
      if(message=="!help"){
        api.sendMessage(myId, "Commands: !help, !kill, !clearqueue, !clearQueue, !queue, !heal, !console.log, !yell", {color:"lightblue"});
      }
if(message=="!kill"){

  api.applyHealthChange(myId, -150, myId, true)
  console.log('Jumped off a !kill');

}
if(message=="!clearqueue"){
console.log('Cleared Queue');

 queue = [];
}
if(message=="!clearQueue"){
console.log('Cleared Queue');

 queue = [];
}
if(message=="!queue"){
console.log(queue);

}
if(message=="!heal"){
console.log("Healed");
  api.applyHealthChange(myId, 100000, myId, true)
}

if(message.includes("!console.log")){
eval(message.replace("!",""));
}
if(message.includes("!yell")){
  eval(api.broadcastMessage(message.replace("!yell ", ""),{}));
}
}


}else{
   api.broadcastMessage([api.getEntityName(myId), ": ", message]);
}
 
 return null
}


function onPlayerKilledOtherPlayer(noCare, idio, damageDealt, withItem){
  var noCares = api.getEntityName(noCare);
var idios = api.getEntityName(idio);
var noCaresHp = api.getHealth(noCare);
api.setMoonstoneChestItemSlot(noCare, 0, "Dirt", 1, {customDisplayName:(Number(api.getMoonstoneChestItemSlot(noCare, 0).attributes.customDisplayName) + 1).toString()});
api.setMoonstoneChestItemSlot(idio, 1, "Dirt", 1, {customDisplayName:(Number(api.getMoonstoneChestItemSlot(idio, 1).attributes.customDisplayName) + 1).toString()});

var noCaresKillCount = api.getMoonstoneChestItemSlot(noCare, 0).attributes.customDisplayName;
var noCaresDeathCount = api.getMoonstoneChestItemSlot(noCare, 1).attributes.customDisplayName;
var idiosDeathCount = api.getMoonstoneChestItemSlot(idio, 1).attributes.customDisplayName;
var idiosKillCount = api.getMoonstoneChestItemSlot(idio, 0).attributes.customDisplayName;
var noCaresKDRatio = Number(noCaresKillCount)/Number(noCaresDeathCount);

var idiosKDRatio = Number(idiosKillCount)/Number(idiosDeathCount);

api.setTargetedPlayerSettingForEveryone(
   noCare,
    "lobbyLeaderboardValues",
    {kills: noCaresKillCount, deaths: noCaresDeathCount, winRate: noCaresKDRatio},
    true
  );

 api.setTargetedPlayerSettingForEveryone(
   idio,
    "lobbyLeaderboardValues",
    {kills: idiosKillCount, deaths: idiosDeathCount, winRate: idiosKDRatio},
    true
  );

if(noCare != idio){

api.broadcastMessage(`${noCares} (${noCaresHp} HP) killed ${idios} with a ${withItem}`,{color:"red"});

}else{
 
api.broadcastMessage(`${noCares} committed suicide with a ${withItem}.`,{color:"red"});
  
    
if(playersIn1v1.includes(noCare)){
  api.sendMessage(noCare,"You Won the 1v1!",{color:"green"});
    playersIn1v1.splice(playersIn1v1.indexOf(noCare), 1);
    playersIn1v1.splice(playersIn1v1.indexOf(idio), 1);
      api.setPosition(noCare, 999.5, 996, 999.5);
  api.setCameraDirection(noCare, [0, 0, 10.5]);
    api.setPosition(idio, 999.5, 996, 999.5);
  api.setCameraDirection(idio, [0, 0, 10.5]);
}
}   
api.setHealth(noCare, 100);

  return true;

}
function onRespawnRequest(myId){
api.setCameraDirection(myId, [0, 0, 1007.5]);
if(queue.includes(myId)){
    queue.splice(queue.indexOf(myId), 1);
}
api.giveItem(myId, "Gold Sword", 10);

api.setItemSlot(myId, 46, 'Diamond Helmet',1,{},true);
api.setItemSlot(myId, 47, 'Diamond Chestplate',1,{},true);
api.setItemSlot(myId, 48, 'Diamond Gauntlets',1,{},true);
api.setItemSlot(myId, 49, 'Diamond Leggings',1,{},true);
api.setItemSlot(myId, 50, 'Diamond Boots',1,{},true);
api.setPosition(myId, 999.5, 996, 999.5);
return true;
}
function onPlayerLeave(playerId){
  if(queue.includes(playerId)){
    queue.splice(queue.indexOf(playerId), 1);
  }
  if(playersIn1v1.includes(playerId)){
    playersIn1v1.indexOf(playerId);
    playersIn1v1.splice(playersIn1v1.indexOf(playerId), 1);
  }
  api.setPosition(playerId, 999.5, 996, 999.5);
  api.setCameraDirection(playerId, [0, 0, 10.5]);
  api.clearInventory(playerId);
  return true;
}

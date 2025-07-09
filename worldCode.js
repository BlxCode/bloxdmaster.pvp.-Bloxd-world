var onQueue = false;
var queue = [];
var playersIn1v1 = [];
var P1posZ = 1019.5;
var P2posX;
var P1posX;
var P2posZ = 1003.5;
var thisIsSuicide = false;
function onPlayerJoin(playerId){
api.setPosition(playerId, 1000.5, 1000, 1000.5);
api.setCameraDirection(playerId, [0, 0, 1007.5]);
api.clearInventory(playerId)
api.giveItem(playerId, "Gold Sword", 10);
api.sendMessage(playerId, "Hello, " + api.getEntityName(playerId) + "! Welcome to this PvP focoused world! ");
api.setItemSlot(playerId, 46, 'Diamond Helmet',1,undefined,true);
api.setItemSlot(playerId, 47, 'Diamond Chestplate',1,undefined,true);
api.setItemSlot(playerId, 48, 'Diamond Gauntlets',1,undefined,true);
api.setItemSlot(playerId, 49, 'Diamond Leggings',1,undefined,true);
api.setItemSlot(playerId, 50, 'Diamond Boots',1,undefined,true);
api.setClientOption(playerId, "", "")

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

if(noCare != idio){
var noCaresHp = api.getHealth(noCare);

api.broadcastMessage(`${noCares} (${noCaresHp} HP) killed ${idios} with a ${withItem}`,{color:"red"});

}else{
 
api.broadcastMessage(`${noCares} committed suicide with a ${withItem}.`,{color:"red"});
  
    
if(playersIn1v1.includes(noCare)){
  api.sendMessage(noCare,"You Won the 1v1!",{color:"green"});
    playersIn1v1.splice(playersIn1v1.indexOf(noCare), 1);
    playersIn1v1.splice(playersIn1v1.indexOf(idio), 1);
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

api.setItemSlot(myId, 46, 'Diamond Helmet',1,undefined,true);
api.setItemSlot(myId, 47, 'Diamond Chestplate',1,undefined,true);
api.setItemSlot(myId, 48, 'Diamond Gauntlets',1,undefined,true);
api.setItemSlot(myId, 49, 'Diamond Leggings',1,undefined,true);
api.setItemSlot(myId, 50, 'Diamond Boots',1,undefined,true);


}

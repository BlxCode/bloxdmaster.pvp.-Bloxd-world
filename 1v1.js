api.setPosition(myId,1003.5, 1008, 993.5);
 
playerId = myId;
api.clearInventory(playerId)
api.giveItem(playerId, "Gold Sword", 10);

api.setItemSlot(playerId, 46, 'Diamond Helmet',1,{},true);
api.setItemSlot(playerId, 47, 'Diamond Chestplate',1,{},true);
api.setItemSlot(playerId, 48, 'Diamond Gauntlets',1,{},true);
api.setItemSlot(playerId, 49, 'Diamond Leggings',1,{},true);
api.setItemSlot(playerId, 50, 'Diamond Boots',1,{},true);


if (onQueue == false){
    x = Number(api.getStandardChestItemSlot([1000, 1009, 1008],0).attributes.customDisplayName);
 

onQueue = true;
 P2posX = x+7;
 P1posX = x+7;
 xOtherSide = x+13;
api.setBlockRect([x,500,1000.5],[xOtherSide,500,1021.5], 'Smooth Stone');
if (isNaN(x)) {
  api.broadcastMessage("Error: `x` is NaN. Chest might be empty or invalid.");
  
}

 queue.push(myId);
  newXInChest = Number(api.getStandardChestItemSlot([1000, 1009, 1008],0).attributes.customDisplayName)+100;
api.setStandardChestItemSlot([1000, 1009, 1008],0, 'Dirt', 1, undefined, {customDisplayName:newXInChest.toString()});
}else if(onQueue == true){
    queue.push(myId);
    if (queue.length == 2){
        onQueue = false;
      if(queue[0] == myId && queue[1] == myId){
          api.setPosition(myId, 1000.5, 1000, 1000.5);
  api.setCameraDirection(myId, [0, 0, 1007.5]);
api.sendMessage(myId, "You are in a 1v1 with yourself. This is not allowed.",{color:"red"});
queue.splice(1,1);
queue.splice(0,1);
}else if(queue[0] == myId || queue[1] == myId){
      if(api.isMobile(queue[0])){
        api.sendMessage(queue[0], "You are now in a 1v1 with " + api.getEntityName(queue[1]) + ", [📱]. Good luck!");
      }else{
        api.sendMessage(queue[0], "You are now in a 1v1 with " + api.getEntityName(queue[1]) + ", [💻]. Good luck!");
      }
        if(api.isMobile(queue[1])){
        api.sendMessage(queue[1], "You are now in a 1v1 with " + api.getEntityName(queue[0]) + ", [📱]. Good luck!");
        }else{
            api.sendMessage(queue[1], "You are now in a 1v1 with " + api.getEntityName(queue[0]) + ", [💻]. Good luck!");
        }
        api.setPosition(queue[0], P1posX, 510, 1019.5);
        api.setPosition(queue[1], P2posX, 510, 1003.5);
        api.setCameraDirection(queue[0], [0, 0, 1003.5]);
        api.setCameraDirection(queue[1], [0, 0, 1019.5]);

       api.setBlockRect([x,500,1000.5],[xOtherSide,500,1021.5], 'Smooth Stone');
 playersIn1v1.push(queue[0]);
        playersIn1v1.push(queue[1]);
        queue.splice(1,1);
        queue.splice(0,1);
       
    }else{
        api.sendMessage(myId, "An error has occured, rejoin the game.",{color:"red"});
    }
  }
}

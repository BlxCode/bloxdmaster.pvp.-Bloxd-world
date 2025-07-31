// Comment 'var api;' on production
var api;
// GNU v3.0 License BLOXDMASTER.PVP. MADE BY BLOXDMASTER, DO NOT DELEATE
// Initialize variables
var onQueue = false;
var queue = [];
var playersIn1v1 = [];
var P1posZ = 1019.5;
var P2posX;
var duelRequesters = [
  'Subscribe to @BloxdMaster! (Placeholder so that my game wont create errors, if u see this it is because that there is a bug in the dual request / accept code system, yippeeee more bugs to fix :( if u see this tho plz tell me with a book in one of the feedback mailboxes, and plz make the title: "Bug Plz Fix" otherwize i will ignore it.',
];
var P1posX;
var duelPendings = [
  "Lorem Ipsum etc etc Subscribe to @BloxdMaster plz im so handsome and smart and plz smash that like button, and share this every other people yay yippe if u see this idk wat to do it's probably because im dumb and the duel request / accept system broke or i just forgot that bloxd likes to send rrandom stuff into the chat, but if u see it anyway idc",
];
var P2posZ = 1003.5;
function getRank(playerId) {
  let killCount = api.getMoonstoneChestItemSlot(playerId, 0).attributes
    .customDisplayName;
  let deathCount = api.getMoonstoneChestItemSlot(playerId, 1).attributes
    .customDisplayName;
  let winRate = killCount / deathCount;
  let rank;
  let rankColor;
  let rankEmoji;
  if (!Number.isNaN(winRate)) {
    if (winRate < 0.5) {
      rank = "Rookie";
      rankColor = "#6a4b3b";
      rankEmoji = "pile of poo";
    }
    if (winRate < 1 && winRate > 0.5) {
      rank = "Decent";
      rankColor = "#a1c101";
      rankEmoji = "frog";
    }
    if (winRate < 1.5 && winRate > 1) {
      rank = "Average";
      rankColor = "#19c101";
      rankEmoji = "turtle";
    }
    if (winRate < 2.5 && winRate > 1.5) {
      rank = "Pro";
      rankColor = "#c10101";
      rankEmoji = "2nd place medal";
    }
    if (winRate > 2.5) {
      rank = "Insane";
      rankColor = "#ab01c1";
      rankEmoji = "crown";
    }
    return { rank: rank, rankColor: rankColor, rankEmoji: rankEmoji };
  } else {
    return {
      rank: "Unranked",
      rankColor: "#808080",
      rankEmoji: "red question mark",
    };
  }
}
function onPlayerJoin(playerId) {
  let killCount;
  let deathCount;
  let rank;
  let rankColor;
  let rankEmoji;
  api.setClientOptions(playerId, { secsToRespawn: 0, maxAuraLevel: 0 });
  let winRate;
  if (
    api.getMoonstoneChestItemSlot(playerId, 0) == undefined ||
    api.getMoonstoneChestItemSlot(playerId, 0) == null
  ) {
    if (
      api.getMoonstoneChestItemSlot(playerId, 1) == undefined ||
      api.getMoonstoneChestItemSlot(playerId, 1) == null
    ) {
      // Kill Count
      api.setMoonstoneChestItemSlot(playerId, 0, "Dirt", 1, {
        customDisplayName: "0",
      });
      // Death Count
      api.setMoonstoneChestItemSlot(playerId, 1, "Dirt", 1, {
        customDisplayName: "0",
      });
      // Win Rate
      winRate = 0;
      killCount = api.getMoonstoneChestItemSlot(playerId, 0).attributes
        .customDisplayName;
      deathCount = api.getMoonstoneChestItemSlot(playerId, 1).attributes
        .customDisplayName;
    }
  } else {
    killCount = api.getMoonstoneChestItemSlot(playerId, 0).attributes
      .customDisplayName;
    deathCount = api.getMoonstoneChestItemSlot(playerId, 1).attributes
      .customDisplayName;
    winRate = killCount / deathCount;
    // rank
    if (!Number.isNaN(winRate)) {
      if (winRate < 0.5) {
        rank = "Rookie";
        rankColor = "#6a4b3b";
        rankEmoji = "pile of poo";
      }
      if (winRate < 1) {
        rank = "Decent";
        rankColor = "#a1c101";
        rankEmoji = "frog";
      }
      if (winRate < 1.5) {
        rank = "Average";
        rankColor = "#19c101";
        rankEmoji = "turtle";
      }
      if (winRate < 2.5) {
        rank = "Pro";
        rankColor = "#c10101";
        rankEmoji = "2nd place medal";
      }
      if (winRate > 2.5) {
        rank = "Insane";
        rankColor = "#ab01c1";
        rankEmoji = "crown";
      }
      api.setClientOptions(playerId, {
        RightInfoText: `bloxdmaster.pvp.
        Stats:
        Kills: ${killCount}
        Deaths: ${deathCount}
        Games Played: ${Number(killCount) + Number(deathCount)}
        Rank: ${rank}
        K/D Ratio: ${winRate}
        `,
        canSeeNametagsThroughWalls: false,
      });
    }
  }
  api.setPosition(playerId, 999.5, 996, 999.5);
  api.setCameraDirection(playerId, [0, 0, 10.5]);
  api.clearInventory(playerId);
  api.giveItem(playerId, "Diamond Sword", 10);
  api.sendMessage(
    playerId,
    "Hello " +
      api.getEntityName(playerId) +
      `! Welcome to this advanced PvP world developed by BloxdMaster, with the intent of having fun, while practicing, learning, and fighting in a safe, and comfterable enviroment. 
      Please respect all the bloxd rules like no toxicity, being nice to others, and no actions that will make someone else uncomfterable. On behaf of my team (myself only), 
      with credits to s0nicblxd (Discord) for helping me figure out how to make custom names. 
      Ranks or Rank does not determine the player's skill, it's calculated based on your Kills and Deaths, again it's not the player's skill level. Anyways, WELCOME TO BLOXDMASTER.PVP.! 
      If you have any questions, suggestions, bug reports (please don't report timeout, or interupted errors, just ignore them), or feedback, please use the feedback mailboxes in the lobby, 
      or contact me on Discord at "apersonintheworld.".
      Type !help in the chat for avaliable commands. `
  );
  api.setItemSlot(playerId, 46, "Diamond Helmet", 1, {}, true);
  api.setItemSlot(playerId, 47, "Diamond Chestplate", 1, {}, true);
  api.setItemSlot(playerId, 48, "Diamond Gauntlets", 1, {}, true);
  api.setItemSlot(playerId, 49, "Diamond Leggings", 1, {}, true);
  api.setItemSlot(playerId, 50, "Diamond Boots", 1, {}, true);
  // leaderboard
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
      },
      rank: {
        displayName: "💪 Rank",
        sortPriority: 6,
      },
    },
  });
  api.setTargetedPlayerSettingForEveryone(
    playerId,
    "lobbyLeaderboardValues",
    { kills: killCount, deaths: deathCount, winRate: winRate, rank: rank },
    true
  );
}
function onPlayerChat(myId, message) {
  //s0nicblxd from discord for helping me with the custom ranks
  if (api.getEntityName(myId) == "AncientHotDog1562572") {
    if (message.startsWith("!")) {
      if (message == "!help") {
        api.sendMessage(
          myId,
          "Owner Commands: !help, !kill, !clearqueue, !clearQueue, !queue, !heal, !console.log, !yell",
          { color: "lightblue" }
        );
        api.sendMessage(
          myId,
          `Normal Commands: 
          !help : Show all commands and what they're for
          !duelReq <Player Name> : Request a duel with a player
          !duelAcc : Accepts a duel with the latest person who requested you`,
          { color: "lightblue" }
        );
      }
      if (message == "!kill") {
        api.applyHealthChange(myId, -150, myId, true);
        console.log("the owner is die");
        if (message.startsWith("!kill ")) {
          api.setHealth(message.replace("!kill ", ""), 0);
        }
      }
      if (message == "!duelRequests") {
        console.log(
          "Duel Pendings: " +
            duelPendings +
            "Duel Requesters: " +
            duelRequesters
        );
      }
      if (message == "!clearqueue") {
        console.log("Cleared Queue");
        queue = [];
      }
      if (message == "!clearQueue") {
        console.log("Cleared Queue");
        queue = [];
      }
      if (message == "!queue") {
        console.log(queue);
      }
      if (message == "!heal") {
        console.log("Healed");
        api.applyHealthChange(myId, 100000, myId, true);
      }
      if (message.includes("!console.log")) {
        eval(message.replace("!", ""));
      }
      if (message.includes("!yell")) {
        eval(
          api.broadcastMessage(message.replace("!yell ", ""), {
            color: "ligbtblue",
          })
        );
      }
    } else {
      api.broadcastMessage([
        { str: "[", style: { color: "#FED207" } },
        { icon: "wrench", style: { color: "#FED207" } },
        { str: " Owners]", style: { color: "#FED207" } },
        { str: "[", style: { color: getRank(myId).rankColor } },
        {
          icon: getRank(myId).rankEmoji,
          style: { color: getRank(myId).rankColor },
        },
        {
          str: `${getRank(myId).rank}] `,
          style: { color: getRank(myId).rankColor },
        },
        api.getEntityName(myId),
        { str: ": " + message, style: { color: "#FFFFFF" } },
      ]);
    }
  } else {
    if (message.startsWith("!")) {
      if (message == "!help") {
        api.sendMessage(
          myId,
          `Commands: 
          !help : Show all commands and what they're for
          !duelReq <Player Name> : Request a duel with a player
          !duelAcc : Accepts a duel with the latest person who requested you`,
          { color: "lightblue" }
        );
      }
      if (message.startsWith("!duelReq")) {
        let otherPlayerId = message.replace("!duelReq ", "");
        if (!Number.isNaN(api.getPlayerId(otherPlayerId))) {
          api.sendMessage(
            myId,
            "Duel request succesfully sent to" + otherPlayerId,
            { color: "lightblue" }
          );
          if (duelPendings.length == duelRequesters.length) {
            duelRequesters.push(myId);
            duelPendings.push(otherPlayerId);
            api.sendMessage(
              api.getPlayerId(otherPlayerId),
              `${myId} requested a duel, type !duelAcc to accept a duel`,
              { color: "red" }
            );
          } else {
            api.sendMessage(
              myId,
              "Critical Error: Duel request system has failed. Error Code: " +
                (duelPendings.length - duelRequesters.length) +
                ". Resetting system shortly, please retry.",
              { color: "Red" }
            );
            duelPendings = ["Lorem Ipsum"];
            duelRequesters = ["Lorem Ipsum"];
          }
        } else {
          api.sendMessage(
            myId,
            "Duel request failed, correct syntax: !duelReq <Player Name>",
            { color: "red" }
          );
        }
      }
      if (message == "!duelAcc" && duelPendings.includes(myId)) {
      } else {
        api.sendMessage(
          myId,
          "You are friendless so no one requested to duel you 💀"
        );
      }
    } else {
      api.broadcastMessage([
        { str: "[", style: { color: getRank(myId).rankColor } },
        {
          icon: getRank(myId).rankEmoji,
          style: { color: getRank(myId).rankColor },
        },
        {
          str: `${getRank(myId).rank}] `,
          style: { color: getRank(myId).rankColor },
        },
        api.getEntityName(myId),
        ": ",
        message,
      ]);
    }
  }
  return null;
}
function onPlayerKilledOtherPlayer(noCare, idio, damageDealt, withItem) {
  var noCares = api.getEntityName(noCare);
  var idios = api.getEntityName(idio);
  var noCaresHp = api.getHealth(noCare);
  api.setMoonstoneChestItemSlot(noCare, 0, "Dirt", 1, {
    customDisplayName: (
      Number(
        api.getMoonstoneChestItemSlot(noCare, 0).attributes.customDisplayName
      ) + 1
    ).toString(),
  });
  api.setMoonstoneChestItemSlot(idio, 1, "Dirt", 1, {
    customDisplayName: (
      Number(
        api.getMoonstoneChestItemSlot(idio, 1).attributes.customDisplayName
      ) + 1
    ).toString(),
  });
  var noCaresKillCount = api.getMoonstoneChestItemSlot(noCare, 0).attributes
    .customDisplayName;
  var noCaresDeathCount = api.getMoonstoneChestItemSlot(noCare, 1).attributes
    .customDisplayName;
  var idiosDeathCount = api.getMoonstoneChestItemSlot(idio, 1).attributes
    .customDisplayName;
  var idiosKillCount = api.getMoonstoneChestItemSlot(idio, 0).attributes
    .customDisplayName;
  var noCaresKDRatio = Number(noCaresKillCount) / Number(noCaresDeathCount);
  var idiosKDRatio = Number(idiosKillCount) / Number(idiosDeathCount);
  api.setTargetedPlayerSettingForEveryone(
    noCare,
    "lobbyLeaderboardValues",
    {
      kills: noCaresKillCount,
      deaths: noCaresDeathCount,
      winRate: noCaresKDRatio,
      rank: {
        str: getRank(noCare).rank,
        style: { color: getRank(noCare).rankColor },
      },
    },
    true
  );
  api.setClientOptions(noCare, {
    RightInfoText: `bloxdmaster.pvp.
        Stats:
        Kills: ${noCaresKillCount}
        Deaths: ${noCaresDeathCount}
        Games Played: ${Number(noCaresKillCount) + Number(noCaresDeathCount)}
        Rank: ${{
          str: getRank(noCare).rank,
          style: { color: getRank(noCare).rankColor },
        }}
        K/D Ratio: ${noCaresKDRatio}
        `,
    canSeeNametagsThroughWalls: false,
  });
  api.setClientOptions(idio, {
    RightInfoText: `bloxdmaster.pvp.
        Stats:
        Kills: ${idiosKillCount}
        Deaths: ${idiosDeathCount}
        Games Played: ${Number(idiosKillCount) + Number(idiosDeathCount)}
        Rank: ${{
          str: getRank(idio).rank,
          style: { color: getRank(idio).rankColor },
        }}
        K/D Ratio: ${idiosKDRatio}
        `,
    canSeeNametagsThroughWalls: false,
  });
  api.setTargetedPlayerSettingForEveryone(
    idio,
    "lobbyLeaderboardValues",
    {
      kills: idiosKillCount,
      deaths: idiosDeathCount,
      winRate: idiosKDRatio,
      rank: {
        str: getRank(idio).rank,
        style: { color: getRank(idio).rankColor },
      },
    },
    true
  );
  if (noCare != idio) {
    if (playersIn1v1.includes(noCare)) {
      api.sendMessage(noCare, "You Won the 1v1!", { color: "green" });
      playersIn1v1.splice(playersIn1v1.indexOf(noCare), 1);
      playersIn1v1.splice(playersIn1v1.indexOf(idio), 1);
      api.setPosition(noCare, 999.5, 996, 999.5);
      api.setCameraDirection(noCare, [0, 0, 10.5]);
      api.setPosition(idio, 999.5, 996, 999.5);
      api.setCameraDirection(idio, [0, 0, 10.5]);
      api.broadcastMessage(
        `${noCares} (${noCaresHp} HP) killed ${idios} with a ${withItem}, and has won his duel!`,
        { color: "red" }
      );
    } else {
      api.broadcastMessage(
        `${noCares} (${noCaresHp} HP) killed ${idios} with a ${withItem}`,
        { color: "red" }
      );
    }
  } else {
    api.broadcastMessage(`${noCares} committed suicide with a ${withItem}.`, {
      color: "red",
    });
  }
  api.setHealth(noCare, 100);
  return true;
}
function onRespawnRequest(myId) {
  api.setCameraDirection(myId, [0, 0, 1007.5]);
  if (queue.includes(myId)) {
    queue.splice(queue.indexOf(myId), 1);
  }
  api.clearInventory(myId);
  api.giveItem(myId, "Diamond Sword", 10);
  api.setItemSlot(myId, 46, "Diamond Helmet", 1, {}, true);
  api.setItemSlot(myId, 47, "Diamond Chestplate", 1, {}, true);
  api.setItemSlot(myId, 48, "Diamond Gauntlets", 1, {}, true);
  api.setItemSlot(myId, 49, "Diamond Leggings", 1, {}, true);
  api.setItemSlot(myId, 50, "Diamond Boots", 1, {}, true);
  api.setPosition(myId, 999.5, 996, 999.5);
  return true;
}
function onPlayerLeave(playerId) {
  api.broadcastMessage(api.getEntityName(playerId) + " has rage-quit 💀", {
    color: "#B30404",
  });
  if (queue.includes(playerId)) {
    queue.splice(queue.indexOf(playerId), 1);
  }
  if (playersIn1v1.includes(playerId)) {
    playersIn1v1.splice(playersIn1v1.indexOf(playerId), 1);
  }
  api.setPosition(playerId, 999.5, 996, 999.5);
  api.setCameraDirection(playerId, [0, 0, 10.5]);
  api.clearInventory(playerId);
  return true;
}

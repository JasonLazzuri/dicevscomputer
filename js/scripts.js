function Player(playerName, isTurn, turnScore, totalScore){
  this.playerName = playerName;
  this.isTurn = isTurn;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}

var player1 = new Player("player1", true, 0, 0);
var computer = new Player("computer", false, 0, 0);

var rollResult = 0;

function dice() {
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computerTurn(currentPlayer, otherPlayer) {
  if(player1.isTurn === false) {
    var computerRoll1 = dice();
    $("#result").text(computerRoll1);
    if (computerRoll1 === 1) {
      currentPlayer.turnScore = 0;
      currentPlayer.isTurn = false;
      otherPlayer.isTurn = true;
      $("#" + currentPlayer.playerName + "-turns").append("<li>" + 0 + "</li>");
      $("#" + currentPlayer.playerName + "-column").removeClass("bg-success");
      $("#" + otherPlayer.playerName + "-column").addClass("bg-success");
      $("#current-turn-score").text(0);
    } else {
      currentPlayer.turnScore += computerRoll1;
      var computerRoll2 = dice();
      $("#result").text(computerRoll2);
      if (computerRoll2 === 1) {
        currentPlayer.turnScore = 0;
        currentPlayer.isTurn = false;
        otherPlayer.isTurn = true;
        $("#" + currentPlayer.playerName + "-turns").append("<li>" + 0 + "</li>");
        $("#" + currentPlayer.playerName + "-column").removeClass("bg-success");
        $("#" + otherPlayer.playerName + "-column").addClass("bg-success");
        $("#current-turn-score").text(0);
      } else {
        currentPlayer.turnScore += computerRoll2;
        currentPlayer.totalScore += currentPlayer.turnScore;
        currentPlayer.isTurn = false;
        otherPlayer.isTurn = true;
        $("#" + currentPlayer.playerName + "-turns").append("<li>" + currentPlayer.turnScore + "</li>");
        $("#" + currentPlayer.playerName + "-score").text(currentPlayer.totalScore);
        $("#" + currentPlayer.playerName + "-column").removeClass("bg-success");
        $("#" + otherPlayer.playerName + "-column").addClass("bg-success");
        $("#current-turn-score").text(0);
        currentPlayer.turnScore = 0;
      }
    }
  }
}

function roll(currentPlayer, otherPlayer) {
  rollResult = 0;
  rollResult += dice();
  $("#result").text(rollResult);
  if (rollResult === 1) {
    currentPlayer.turnScore = 0;
    currentPlayer.isTurn = false;
    otherPlayer.isTurn = true;
    $("#" + currentPlayer.playerName + "-turns").append("<li>" + 0 + "</li>");
    $("#" + currentPlayer.playerName + "-column").removeClass("bg-success");
    $("#" + otherPlayer.playerName + "-column").addClass("bg-success");
    $("#current-turn-score").text(0);
    computerTurn(computer, player1);
  } else {
    currentPlayer.turnScore += rollResult;
    $("#current-turn-score").text(currentPlayer.turnScore);
  }
}

function stop(currentPlayer, otherPlayer) {
  currentPlayer.totalScore += currentPlayer.turnScore;
  currentPlayer.isTurn = false;
  otherPlayer.isTurn = true;
  $("#" + currentPlayer.playerName + "-turns").append("<li>" + currentPlayer.turnScore + "</li>");
  $("#" + currentPlayer.playerName + "-score").text(currentPlayer.totalScore);
  $("#" + currentPlayer.playerName + "-column").removeClass("bg-success");
  $("#" + otherPlayer.playerName + "-column").addClass("bg-success");
  $("#current-turn-score").text(0);
  currentPlayer.turnScore = 0;
  computerTurn(computer, player1);
  if (player1.totalScore >= 100) {
    $("#player1-wins").show();
    $("body").css('background-color', 'orange');
    $("#player1-column").removeClass("bg-success");
    $("#roll").hide();
    $("#stop").hide();
  }
  if (computer.totalScore >= 100) {
    $("#computer-wins").show();
    $("body").css('background-color', 'lightblue');
    $("#player1-column").removeClass("bg-success");
    $("#roll").hide();
    $("#stop").hide();
  }
}

$(document).ready(function(){
  $("#player1-column").addClass("bg-success");

  $("#roll").click(function() {
    roll(player1, computer);
  });

  $("#stop").click(function() {
    stop(player1, computer);
  });
});

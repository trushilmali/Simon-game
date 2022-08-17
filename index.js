var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  // console.log(userClickPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAns(userClickPattern.lastIndexOf(userChosenColour));
});

var start = false;
var level = 0;
$(document).keydown(function(){
  if(!start){
  $("h1").text("Level "+level);
  nextSequence();
  start = true;
}
});

function checkAns(currentLevel){
  if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
   var count = 0;
  for(var i=0; i< gamePattern.length; i++){
    if(userClickPattern[i] === gamePattern[i]){
      count++;
    }
  }
  if(count === gamePattern.length){
    console.log("success");
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }
}else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}

function playSound(name) {
  $("#" + name).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 200);
}
function nextSequence() {
  userClickPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}

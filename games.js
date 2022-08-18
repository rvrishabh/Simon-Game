var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userclickedPattern  = [];

var level= 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level" + level)
    nextSequence()
    started= true;
  }
});


$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");

  userclickedPattern.push(userChosenColor);
  
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userclickedPattern.length-1);
})

function checkAnswer(currentLevel) {
 
  if (gamePattern[currentLevel] === userclickedPattern[currentLevel]) {
    console.log("success")
    if (userclickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong")
    $("body").addClass("stop")
    setTimeout(function () {
      $("body").removeClass("stop")
    }, 200)
    $("#level-title").text("Game Over, Press any Key to Start")

    startOver();
  }
}

function nextSequence() {

  userclickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randonColor = Math.floor(Math.random() * 4)
  var randomButtonColor = buttonColours[randonColor]

  gamePattern.push(randomButtonColor);

  $("#" + randomButtonColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomButtonColor);
  
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".wav")
  audio.play();
}

function animatePress(CurrentPress) {
  $("#" + CurrentPress).addClass("pressed");
  setTimeout(function () {
    $("#" + CurrentPress).removeClass("pressed");
  }, 100)
}

function startOver() {
  level=0;
  gamePattern= [];
  started = false;
}
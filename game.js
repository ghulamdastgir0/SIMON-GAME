var colors = ["red", "green", "blue", "yellow"];
var randompattern = [];
var userclickedpattern = [];
var level = 0, started = false;

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var colorPicked = colors[randomNumber];
  randompattern.push(colorPicked);
  playSound(colorPicked);
  console.log(randompattern);
  $("#" + colorPicked).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(".btn").click(function() {
  var userChosseColor = $(this).attr("id");
  userclickedpattern.push(userChosseColor);
  playSound(userChosseColor);
  $("#" + userChosseColor).addClass("pressed");
  setTimeout(function() {
    $("#" + userChosseColor).removeClass("pressed");
  }, 50);
    checkAnswer(userclickedpattern.length - 1);
  console.log(userclickedpattern);
});

  $(document).keypress(function(event) {
    if (!started){
        nextSequence();
        started = true;
    }
  });

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  return audio.play();
}

function checkAnswer(currentLevel){
    if( randompattern[currentLevel]=== userclickedpattern[currentLevel] ) {
        console.log("success");
        if(randompattern.length === userclickedpattern.length){
            userclickedpattern.length=0;
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
        $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    randompattern.length=0;
    userclickedpattern.length=0;
    started=false;
    level=0;
}
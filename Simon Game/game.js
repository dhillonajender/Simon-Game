const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = new Array();
const userClickedPattern = new Array();
var count=0;
var level=0;

$(document).on("keydown",function(){
  if(count===0){
    $("#level-title").text("Level 0");
    nextSequence();
    count++;
  }

})
//document.querySelector("button").addEventListener("click",function(){-----}); this will bring array so for loop has to be used
$(".btn").on("click",function(){
  var userChosenColor= this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence(),3000);
    }
  }
  else{
      playSound("wrong");
      //document.querySelector("body").classList.addClass("game-over");
      $("body").addClass("game-over");
      $("#level-title").html("Game Over, Press Any Key to Restart");
      setTimeout(function(){
        //document.querySelector("body").classList.remove("game-over");}
        $("body").removeClass("game-over");}
        ,200);
      //document.querySelector("#level-title").innerHTML="Game Over, Press Any Key to Restart";
      startOver();
    }
}
function nextSequence() {
  userClickedPattern.splice(0,userClickedPattern.length);// empty array
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //document.querySelector("#"+randomChosenColor);
  $(("#" + randomChosenColor)).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
  playSound(randomChosenColor);
  $("#level-title").text("Level"+" "+level);
  level++;
}

function animatePress(currentColor){
  //document.querySelector("."+currentColor).classList.add("pressed");
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    //document.querySelector("."+currentColor).classList.remove("pressed");}
    $("#"+currentColor).removeClass("pressed");}
    ,100);
}


function startOver(){
    level=0;
    gamePattern.splice(0,gamePattern.length);// empty array
    count=0;

}
function playSound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
  }

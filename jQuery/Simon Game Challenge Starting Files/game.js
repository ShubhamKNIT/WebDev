var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

function nextSequence() {
    $("h1").text("Level " + level);
    level++;
    userClickPattern = []; 
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // animatePress(randomChosenColour);
    console.log(gamePattern);
}

var userClickPattern = [];

$(".btn").on("click", function() {
    var userChosenColour = this.id;
    userClickPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickPattern.length - 1)
    console.log(userClickPattern);
});

function playSound(chosenColour) {
    var audio_path = new Audio("./sounds/" + chosenColour + ".mp3");
    audio_path.play();
}

function animatePress(chosenColour) {
    $("#" + chosenColour).addClass("pressed");
    setTimeout(function() {
        $("#" + chosenColour).removeClass("pressed");
    }, 100);
};

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        console.log("success");
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        started = false;
        $("h1").addClass("game-over");
        $("h1").text("Game Over");
        userClickPattern = [];
        gamePattern = [];
        level = 0;
        setTimeout(function() {
            $("h1").removeClass("game-over").text("Press any key to start");
        }, 3000);
        console.log("wrong");
    }
}

document.addEventListener("keydown", function(event) {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});
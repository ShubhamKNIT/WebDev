var level = 0;
var gameSequence = [];
var userSequence = [];
var started = false;

const buttonColours = ['green', 'red', 'yellow', 'blue'];


$(document).on("keypress", function() {
    if (!started) {
        $("level-title").text(`Level: ${level}`);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function() {
    var chosenColor = $(this).attr("id");
    userSequence.push(chosenColor);

    playSound(chosenColor);
    animatePress(chosenColor);

    checkAnswer(userSequence.length - 1);
});

function checkAnswer(currentLevel) {
    if (gameSequence[currentLevel] === userSequence[currentLevel]) {
        console.log("success");

        if (userSequence.length === gameSequence.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function nextSequence() {
    userSequence = [];
    level++;

    $("#level-title").text("Level: " + level);

    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNum];
    gameSequence.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gameSequence = [];
    started = false;
}

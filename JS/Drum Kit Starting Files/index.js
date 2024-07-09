var len = document.querySelectorAll('.drum').length;

var mp = {
    "w": "crash",
    "a": "kick-bass",
    "s": "snare",
    "d": "tom-1",
    "j": "tom-2",
    "k": "tom-3",
    "l": "tom-4"
};

for (var i = 0; i < len; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var btn = this.innerHTML;
        var audio_path = "./sounds/" + mp[btn] + ".mp3"
        var audio = new Audio(audio_path);
        audio.play();
        addAnimation(this.innerHTML);
    });
    document.addEventListener("keydown", function(event) {
        playSound(event);
        addAnimation(event.key);
    });
}

function playSound(event) {
    var btn = event.key;
    var audio_path = "./sounds/" + mp[btn] + ".mp3"
    var audio = new Audio(audio_path);
    audio.play();
}

function addAnimation(btn) {
    var activeBtn = document.querySelector("." + btn);
    activeBtn.classList.add("pressed");
    setTimeout(function() {
        activeBtn.classList.remove("pressed");
    }, 200);
}
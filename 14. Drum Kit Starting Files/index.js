
const drums = document.querySelectorAll(".drum");

for (const drum of drums) {
    drum.addEventListener("click", function () {
        switch(this.innerHTML) {
            case "w":
                var audio = new Audio('sounds/kick-bass.mp3');
                audio.play();
                break;
            case "a":
                var audio = new Audio('sounds/snare.mp3');
                audio.play();
                break;
            case "s":
                var audio = new Audio('sounds/tom-1.mp3');
                audio.play();
                break;
            case "d":
                var audio = new Audio('sounds/tom-2.mp3');
                audio.play();
                break;
            case "j":
                var audio = new Audio('sounds/tom-3.mp3');
                audio.play();
                break;
            case "k":
                var audio = new Audio('sounds/tom-4.mp3');
                audio.play();
                break;
            case "l":
                var audio = new Audio('sounds/crash.mp3');
                audio.play();
                break;
        }
    });
}

document.addEventListener('keypress', function (e) {
    switch(e.key) {
        case "w":
            var audio = new Audio('sounds/kick-bass.mp3');
            audio.play();
            break;
        case "a":
            var audio = new Audio('sounds/snare.mp3');
            audio.play();
            break;
        case "s":
            var audio = new Audio('sounds/tom-1.mp3');
            audio.play();
            break;
        case "d":
            var audio = new Audio('sounds/tom-2.mp3');
            audio.play();
            break;
        case "j":
            var audio = new Audio('sounds/tom-3.mp3');
            audio.play();
            break;
        case "k":
            var audio = new Audio('sounds/tom-4.mp3');
            audio.play();
            break;
        case "l":
            var audio = new Audio('sounds/crash.mp3');
            audio.play();
            break;
    }
}
)



// Can make the switch a function


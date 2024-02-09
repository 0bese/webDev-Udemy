var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['green', 'red', 'yellow', 'blue'];
var level = 0;
var started = false;


//Game
$(document).on('keypress', function(e){
    if (!started){
        $('h1').html(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

//User
$('div.btn').on('click', function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    //check if user & game patterns match
    checkAnswer(userClickedPattern.length - 1)
});




// FUNCTIONS
//Plays the next sound 
function nextSequence(){
    userClickedPattern = [];
    level++;
    $('h1').html(`Level ${level}`);
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //effect to show next sequence
    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //play the sound as well
    playSound(randomChosenColor);
    
}

//Plays the sound
function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

//press effect upon user click
function animatePress(currentColor){
    $('#'+ currentColor).addClass('pressed');
    //delay effect
    setTimeout(function(){
        $('#'+ currentColor).removeClass('pressed');
    }, 100);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else {
        setTimeout(function(){
        $(body).addClass()
        }
        )
    }
}


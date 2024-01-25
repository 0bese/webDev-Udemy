// for player 1
let randomNumber1 = Math.floor(Math.random() * 6) + 1;
if (randomNumber1 == 1){
    randomNumber1 = "images/dice1.png";
}
else if (randomNumber1 == 2) {
    randomNumber1 = "images/dice2.png";
}
else if (randomNumber1 == 3) {
    randomNumber1 = "images/dice3.png";
}
else if (randomNumber1 == 4) {
    randomNumber1 = "images/dice4.png";
}
else if (randomNumber1 == 5) {
    randomNumber1 = "images/dice5.png";
}
else {
    randomNumber1 = "images/dice2.png";
}

// for player 2
let randomNumber2 = Math.floor(Math.random() * 6) + 1;
if (randomNumber2 == 1){
    randomNumber2 = "images/dice1.png";
}
else if (randomNumber2 == 2) {
    randomNumber2 = "images/dice2.png";
}
else if (randomNumber2 == 3) {
    randomNumber2 = "images/dice3.png";
}
else if (randomNumber2 == 4) {
    randomNumber2 = "images/dice4.png";
}
else if (randomNumber2 == 5) {
    randomNumber2 = "images/dice5.png";
}
else {
    randomNumber2 = "images/dice6.png";
}

// displaying the images
document.querySelector(".img1").setAttribute("src", randomNumber1);
document.querySelector(".img2").setAttribute("src", randomNumber2);

//Checking for the winner
if (randomNumber1 > randomNumber2){
    document.querySelector("h1").innerHTML = "Player 1 won!";
}
else if (randomNumber1 < randomNumber2){
    document.querySelector("h1").innerHTML = "Player 2 won!";
}
else {
    document.querySelector("h1").innerHTML = "Draw!";
}
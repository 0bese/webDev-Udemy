$("h1").css("color", "red");

$(document).keypress(function (e){
    $("h1").text(e.key);
});


$("a").attr("href", "http://google.com");

$("input").keypress(function (e){
    console.log(e.key);
});
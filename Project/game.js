var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function()
{
    if(started==false)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
    
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    //console.log(userClickedPattern);
});


function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function()
    {
        $("#" + currentColor).removeClass("pressed");
    },100);
}


function startOver()
{
    level = 0;
    gamePattern=[];
    started = false;
}


function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(gamePattern.length === userClickedPattern)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }

    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("level-title").text("Game Over, Press any Key to Restart");


        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

//console.log(randomChosenColor);

// switch(name){
//     case "blue": audio = new Audio('D:\Coding\WEB-DEV PROJECTS\Simon Game jQuery\Project\sounds\blue.mp3');
//     break;

//     case "green": audio = new Audio('D:\Coding\WEB-DEV PROJECTS\Simon Game jQuery\Project\sounds\green.mp3');
//     break;

//     case "red": audio = new Audio('D:\Coding\WEB-DEV PROJECTS\Simon Game jQuery\Project\sounds\red.mp3');
//     break;

//     case "yellow": audio = new Audio('D:\Coding\WEB-DEV PROJECTS\Simon Game jQuery\Project\sounds\yellow.mp3');
//     break;

//     default:  audio = new Audio('D:\Coding\WEB-DEV PROJECTS\Simon Game jQuery\Project\sounds\wrong.mp3');
//     break;
// }
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var lvl=0;
var gamestate=false;


//SOUNDS

function sound(){
    var noise=new Audio("sounds/"+this.id+".mp3");
    noise.play();
}


//PATTERN FOR GAMEPLAY

function nextSequence(){
    userPattern=[];
    lvl++;
    $("h1").text("Level "+lvl);
    var randomNum=Math.floor(Math.random()*4);
    var randomColor=buttonColours[randomNum];
    gamePattern.push(randomColor);
    console.log(gamePattern);
    $("#"+randomColor).fadeOut(100).fadeIn(100);
    var sound=new Audio("sounds/"+randomColor+".mp3");
    sound.play();
}

//CLICKING BUTTONS

$(".btn").on("click",handler);

function handler(){
    if(gamestate){
        var userColor=this.id;
        userPattern.push(userColor);
        var sound=new Audio("sounds/"+userColor+".mp3")
        sound.play();
        $("#"+userColor).addClass("pressed");
        setTimeout(function(){
            $("#"+userColor).removeClass("pressed");
        },100);
        checkbtn(userPattern.length -1);
    }
}


//START GAME

$(document).on("keypress",function(){
    if(!gamestate){
        $("h1").text("Level 1");
        nextSequence();
        gamestate=true;
    }
});


//CHECKING CLICKED BUTTON


function checkbtn(currbtn){
    if(userPattern[currbtn]===gamePattern[currbtn]){
        if(userPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },700);
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        var sound=new Audio("sounds/wrong.mp3");
        sound.play(); 
        startover();
    }
}



function startover(){
    gamePattern=[];
    userPattern=[];
    lvl=0;
    gamestate=false;
    $("h1").text("Game Over. Press any key to Restart");
}








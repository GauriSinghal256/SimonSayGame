let gameSeq=[];   //basically when the game proceeds gameseq will tackle all the colors so that we can keep a track of whats going on...
let userSeq = [];  //similarly the userseq will keep the track of all the buttons pressed by the user 

// then the main game start where we have to check whether our seq matches the one of that of the game
let btns = ["yellow" ,"red" , "purple" , "green"];

let started =false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");
let highestScoreP = document.querySelector("p");


document.addEventListener("keypress" , function(){
    if (started == false){
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    } , 250);
}

function levelUp(){  //when there will be the condition of level up we need to reset the user array because now user has to again press all the seq
    userSeq = [];
    level++;
    h2.innerText=`level ${level}`;
    // random button choose
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // jab hamara random color generate ho jaega then we have to add it to the array
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    // now we also have to check that which button is pressed by the user so we need to check
    // we know every button knows it color as we have given them unique id
    userColor = btn.getAttribute("id");    // yha par id attribute ki jo value hai wohi uska color hai 
    console.log(userColor);
    userSeq.push(userColor);

    // now we to check whether the button pressed by the user is correct or not so lets see how we can proceed to check it
    // point 1- we only need to check the last color entered by the user we basically haveto match that only as at every level the game is generating only one new color
    checkAns(userSeq.length-1);
}

function checkAns(idx){
    // console.log("curr level :", level);
    // basically the number of level will determine the size of both the arrays
    if(userSeq[idx] == gameSeq[idx]){
        // now if we have pressed the right button then there may be two cases
        // that we are in the middle of the array then we simply have to level up or we can say that we just need to shift the index and then check for the next index
        // or now if we are checking for the last index of game seq then we have to level up and now we have to generate the new color or we just simply need to call level up
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 750);
        }
    }else{
        document.querySelector("body").style.backgroundcolor = "red";
        setTimeout(document.querySelector("body").style.backgroundcolor = "white" , 150);
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        let match = level;
        if(highestScore < match){
            highestScore=match;
            highestScoreP.innerText = `Highest Score is ${highestScore}`;
        }        
        // when the game is over we need to reset the things so we will make a function to reset all the tasks 
        reset();
    }
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click" , btnPress);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");  
    }, 250);
}

function reset(){
    started = false;
    gameSeq =[];
    userSeq =[];
    level = 0;
}


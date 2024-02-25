const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// Initial state
let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// initialize the game
function initGame(){
    //Pointer Evnet enable because of line no 73
    boxes.forEach((box)=>{
        box.style.pointerEvents = "auto";
    });
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //Update Empty everything in UI
    boxes.forEach((box, index) =>{
        box.innerText = "";

        //Apply CSS Property to remove Green Screen after wining Player
        box.classList = `box box${index+1}`;

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    boxes.forEach((box)=>{
        box.style.pointerEvents = "click";
    });
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer= "0";
    }else{
        currentPlayer = "X";
    }

    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

// check game over or not
function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position)=>{
        //All 3 boxes shoud be non-empty and exact same each other
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            // check if winner is X
            if (gameGrid[position[0]] === "X") 
                answer = "X";
            else
                answer = "0";

            //Disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            });

            // Now we know X/0 is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
    }
    });
    // Now we have a winner 
    if(answer !== ""){
        gameInfo.innerText = `Congratulations! Winner is - ${answer}`;
        newGameBtn.classList.add("active");
    }

    //Check when there is no winner (Draw Game)
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });

    //Board is filled, Game over
    if(fillCount === 9){
        gameInfo.innerText = `😂 Game Draw`;
        newGameBtn.classList.add("active");
    }
        

}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; //show in UI Boxes
        gameGrid[index] = currentPlayer;
        // swap the valude of current player
        swapTurn();
        //check any player win or not
        checkGameOver();
    }   
}

boxes.forEach((box, index) =>{
    box.addEventListener('click', ()=>{
        handleClick(index);
    })
})

newGameBtn.addEventListener('click', ()=>{
        initGame();
})
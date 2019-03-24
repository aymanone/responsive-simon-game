
let chain=[];//to add randomly to it 
const idsForParts=["#first-q","#second-q","#third-q","#forth-q"];
let playerCanClick=false;
let indexOfChain=0;//for when player click the parts of oval
let isGameStart=false;
const gameState=document.querySelector("#show-game-state");

function playTheChain(i,l){
    playerCanClick=false;
    gameState.textContent=`play ${i+1} from ${l.length}`;
    
    if (i===l.length){
        // stop sound and back to class
        let lastPartId=l[i-1];
        document.querySelector(lastPartId).className="triangle";
        playerCanClick=true;
        gameState.textContent="your turn";
        
        return;
    }
    else if(i===0){
        // for the first elem so we won't stop sounds or change style
        
        let currPartId=l[i];
        document.querySelector(currPartId).className+=" while-play";
    }
    else{
        // for any other elem except first and last
        let lastPartId=l[i-1];
        document.querySelector(lastPartId).className="triangle";
        let currPartId=l[i];
        document.querySelector(currPartId).className+=" while-play";
    }
    
    setTimeout(()=>{console.log(l[i]);playTheChain(i+1,l)},1000);
    
}
function newGame(){
    chain=[];
    playerCanClick=false;
    indexOfChain=0;
    isGameStart=false;
    gameState.textContent="not starting yet";
}
function addToChain(addTo,addFrom){
        //freeCells[Math.floor(Math.random()*freeCells.length)];
        
        let newPart=addFrom[Math.floor(Math.random()*addFrom.length)];
         addTo.push(newPart);
        return addTo;
}

function startHelper(){
    
    chain=addToChain(chain,idsForParts);
    playTheChain(0,chain);
    
}
function startGame(){
    if(isGameStart===true){return;}
    gameState.textContent="game will start";
    isGameStart=true;
    
    (function(){setTimeout(startHelper,1000)})();
}
function evalPlayerClick(part){
    
    if(!playerCanClick || indexOfChain>=chain.length){return;}
    if('#'+part.id===chain[indexOfChain]){
        if(indexOfChain+1===chain.length){
            
            
            gameState.textContent=`win add more`;
            playerCanClick=false;
            indexOfChain=0;
            (function(){setTimeout(startHelper  ,1000)})();
        }
        else{
            
            gameState.textContent=`${indexOfChain+1} from ${chain.length}`;
            indexOfChain++;
        }
    }
    else{
        gameState.textContent=`wrong new game start`;
        (function(){setTimeout(newGame,1000)})();
    }
    
    
}



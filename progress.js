class Block{
    constructor(x,y,color="black",falling=true,width=blockSize,height=blockHeight,speed=1,type=blockType) {
        this.x=x;
        this.y=y;
        this.color=color;
        this.falling=falling;
        this.width=width;
        this.height=height;
        this.speed=speed;
        this.type=type;
    }
    //Make the blocks fall
    fall(){
        if(this.falling){
            this.y+=this.speed;
        }
    }
    //Stops the blocks from falling
    stopFall(){
        this.falling=false;
    }
}
var blockSize=50;
var blockHeight=50;
var blockType="Regular";
var gameTime=22;
var pause=false;
var progressTime=500;
var progressAdd=1;
//Determines the top of canvas
var slideCanvasTop=0;
var canvasBottom=0;
const grid=document.getElementById("grid");
const achievement=document.getElementById("achievements");
const showAchievement=document.getElementById("showAchievement");
//Sets the cover grid lower due to border width(-1)
document.getElementById("coverGrid").style.top=grid.offsetHeight+grid.offsetTop-1+"px";
document.getElementById("coverGrid").style.width=grid.offsetWidth+"px";
document.getElementById("coverGridTop").style.width=grid.offsetWidth+"px";
showAchievement.addEventListener("click", function(){
    if(achievement.style.bottom=="0%"){
        showAchievement.style.bottom="0%";
        achievement.style.bottom="-28%";
    } else{
        showAchievement.style.bottom="28%";
        achievement.style.bottom="0%";
    }
});
const theme=document.getElementById("theme");
const showTheme=document.getElementById("showTheme");
const info=document.getElementById("info");
const showInfo=document.getElementById("showInfo");
showInfo.addEventListener("click", function(){
    if(info.style.top=="0%"){
        setTimeout(function(){
            showTheme.style.display="block";
        },1000);
        showInfo.style.top="0%";
        info.style.top="-17.5%";
    } else{
        showTheme.style.display="none";
        showInfo.style.top="17.5%";
        info.style.top="0%";
    }
});
showTheme.addEventListener("click", function(){
    if(theme.style.top=="0%"){
        setTimeout(function(){
            showInfo.style.display="block";
        },1000);
        showTheme.style.top="0%";
        theme.style.top="-17.5%";
    } else{
        showInfo.style.display="none";
        showTheme.style.top="17.5%";
        theme.style.top="0%";
    }
});
var max=grid.offsetHeight;
var addHeight=0;
var allBlock=[];
function drawGame(){
    let canvas=document.getElementById("playerCanvas");
    let ds=canvas.getContext("2d");
    canvas.style.left=grid.offsetLeft+"px";
    canvas.style.top=grid.offsetTop+slideCanvasTop+"px";
    canvas.width = grid.offsetWidth;
    canvas.height = grid.offsetHeight+Math.abs(max-grid.offsetHeight-addHeight);
    canvasBottom=canvas.offsetHeight;
    //document.getElementById("h").innerHTML=slideCanvasTop;
    ds.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    for(let i=0;i<allBlock.length;i++){
        //Draws meteor only if it's not dead
        if(!pause){
            ds.fillStyle=allBlock[i].color;
            ds.fillRect(allBlock[i].x,allBlock[i].y,allBlock[i].width,allBlock[i].height);
        }
    }
} 
const blockInfo=document.getElementById("blockInfo");
function drawBlock(){
    let canvas=document.getElementById("blockCanvas");
    let ds=canvas.getContext("2d");
    canvas.style.left=blockInfo.offsetLeft+"px";
    canvas.style.top=blockInfo.offsetTop+"px";
    canvas.width = blockInfo.offsetWidth;
    canvas.height = blockInfo.offsetHeight;
    ds.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    if(allBlock.length>0){
        ds.fillStyle=allBlock[0].color;
        ds.fillRect((blockInfo.offsetWidth-blockSize)/2,(blockInfo.offsetHeight-blockHeight)/2,allBlock[0].width,allBlock[0].height);
    } else{
        ds.fillRect((blockInfo.offsetWidth-blockSize)/2,(blockInfo.offsetHeight-blockHeight)/2,blockSize,blockHeight);
    }
} 
function game(){
    for(let i=0;i<allBlock.length;i++){
        if(!pause){
            allBlock[i].fall();
            //Stops falling when hit other block
            for(let j=0;j<i;j++){
                if(allBlock[i].y+allBlock[i].height>=allBlock[j].y&&(allBlock[i].x+allBlock[i].width>=allBlock[j].x&&allBlock[i].x<=allBlock[j].x+allBlock[j].width)){
                    allBlock[i].stopFall();
                }
            }
            //Stop fall when hit ground
            if(i==0){
                if(allBlock[i].y+allBlock[i].height>=canvasBottom){
                    allBlock[i].stopFall();
                }
            } else{
                //Pther blocks can't fall below the first one
                if(allBlock[i].y>=allBlock[0].y){
                    allBlock[i].stopFall();
                }
            }
            //Move down one block too tall
            if(allBlock[i].y<=Math.floor(grid.offsetHeight/2)&&!allBlock[i].falling){
                for(let j=i;j>=0;j--){
                    //Can think about how to make it transition instead of immediately go down one block
                    allBlock[j].y+=blockHeight;
                }
                addHeight+=50;
            }
            if(allBlock[i].y<max&&!allBlock[i].falling){
                max=allBlock[i].y;
            }
        }
    }
    //Shows the tallest height and the total blocks
    document.getElementById("recordHeight").innerHTML=Math.abs(max-grid.offsetHeight-addHeight);
    document.getElementById("currentHeight").innerHTML=Math.abs(max-grid.offsetHeight-addHeight)+slideCanvasTop;
    document.getElementById("currentBlock").innerHTML=blockType;
    document.getElementById("recordBlocks").innerHTML=allBlock.length;
}
const slideUp=document.getElementById("slideUp");
const slideDown=document.getElementById("slideDown");
slideUp.addEventListener("mouseleave", function(){
    slideUp.style.borderBottomColor="black";
});
slideUp.addEventListener("mouseover", function(){
    slideUp.style.borderBottomColor="rgb(255, 115, 0)";
});
slideDown.addEventListener("mouseleave", function(){
    slideDown.style.borderTopColor="black";
});
slideDown.addEventListener("mouseover", function(){
    slideDown.style.borderTopColor="rgb(255, 115, 0)";
});
slideUp.addEventListener("click", function(){
    if(slideCanvasTop!=0){
        slideCanvasTop+=10;
    }
});
slideDown.addEventListener("click", function(){
    if(slideCanvasTop!=max-grid.offsetHeight-addHeight){
        slideCanvasTop-=10;
    }
});
//Right click to move up/down an entire block
function blockMoveUp(event){
    if(event.button==2&&slideCanvasTop<=-blockHeight){
        slideCanvasTop+=blockHeight;
    } else if(event.button==2&&slideCanvasTop!=0){
        slideCanvasTop=0;
    }
    //Maybe can change color when right click slideUp.style.borderBottomColor="red"; but only for a while
}
function blockMoveDown(event){
    if(event.button==2&&slideCanvasTop>=max-grid.offsetHeight-addHeight+blockHeight){
        slideCanvasTop-=blockHeight;
    } else if(event.button==2&&slideCanvasTop!=max-grid.offsetHeight-addHeight){
        slideCanvasTop=max-grid.offsetHeight-addHeight;
    }
}
//Go to the top/bottom of canvas when bottom pressed
function goTop(){
    slideCanvasTop=0;
}function goBottom(){
    slideCanvasTop=max-grid.offsetHeight-addHeight;
}
//Pauses the game if button pressed
function pauseGame(){
    if(!pause){
        pause=true;
    } else{
        pause=false;
    }
}
//Shows tooltip when over question span
document.addEventListener("mouseover", function(){

});
var button=document.getElementsByClassName("button");
function changeTheme(id){
    let themeColor=document.getElementsByClassName("themeColor");
    let color;
    let background=document.getElementById("background");
    let coverGrid=document.getElementById("coverGrid");
    let coverGridTop=document.getElementById("coverGridTop");
    for(let i=0;i<button.length;i++){
        if(i!=id){
            document.getElementById(i).style.backgroundColor="rgba(255, 255, 255, 0.3)";
        } else{
            document.getElementById(i).style.backgroundColor="rgba(255, 255, 255, 0.65)";
        }
    }
    switch(id){
        case "0":
            background.style.backgroundColor="beige";
            coverGrid.style.backgroundColor=background.style.backgroundColor;
            coverGridTop.style.backgroundColor=background.style.backgroundColor;
            color="rgb(248, 198, 123)";
            break;
        case "1":
            background.style.backgroundColor="rgb(218, 199, 97)";
            coverGrid.style.backgroundColor=background.style.backgroundColor;
            coverGridTop.style.backgroundColor=background.style.backgroundColor;
            color="rgb(220, 135, 0)";
            break;
        case "2":
            background.style.backgroundColor="rgb(202, 203, 241)";
            coverGrid.style.backgroundColor=background.style.backgroundColor;
            coverGridTop.style.backgroundColor=background.style.backgroundColor;
            color="rgb(138, 130, 203)";
            break;
        case "3":
            background.style.backgroundColor="rgb(231, 87, 87)";
            coverGrid.style.backgroundColor=background.style.backgroundColor;
            coverGridTop.style.backgroundColor=background.style.backgroundColor;
            color="rgb(255, 235, 123)";
            break;
        case "4":
            background.style.backgroundColor="red";
            coverGrid.style.backgroundColor=background.style.backgroundColor;
            coverGridTop.style.backgroundColor=background.style.backgroundColor;
            color="rgb(248, 198, 123)";
            break;
        case "5":
            background.style.backgroundColor="red";
            coverGrid.style.backgroundColor=background.style.backgroundColor;
            coverGridTop.style.backgroundColor=background.style.backgroundColor;
            color="rgb(248, 198, 123)";
            break;
        case "6":
            background.style.backgroundColor="red";
            coverGrid.style.backgroundColor=background.style.backgroundColor;
            coverGridTop.style.backgroundColor=background.style.backgroundColor;
            color="rgb(248, 198, 123)";
            break;
        case "7":
            background.style.backgroundColor="red";
            coverGrid.style.backgroundColor=background.style.backgroundColor;
            coverGridTop.style.backgroundColor=background.style.backgroundColor;
            color="rgb(248, 198, 123)";
            break;
        default: 
            break;
    }
    for(let j=0;j<themeColor.length;j++){
        themeColor[j].style.backgroundColor=color;
    }
}
//Set light theme to original theme
document.getElementById("0").style.backgroundColor="rgba(255, 255, 255, 0.65)";
const progressBar=document.getElementById("progressBar");
const barValue=document.getElementById("barValue");
setInterval(function(){
    if(!pause){
        barValue.style.left=progressBar.offsetLeft+(progressBar.offsetWidth-barValue.offsetWidth)/2+"px";
        barValue.style.top=progressBar.offsetTop+(progressBar.offsetHeight-barValue.offsetHeight)/2+"px";
        barValue.innerHTML="<strong>"+progressBar.value+"%</strong>";
        progressBar.value+=progressAdd;
        if(progressBar.value==100){
            //Add in new block when progress hit 100, randomize block x location
            allBlock.push(new Block(Math.floor(Math.random()*(grid.offsetWidth-blockSize)),-blockHeight));
            //Reset progress
            progressBar.value=0;
        }
    }
},progressTime);
setInterval(function(){
    //Updates the color
    grid.style.backgroundColor="rgb("+document.getElementById("blockColor1").value+","+document.getElementById("blockColor2").value+","+document.getElementById("blockColor3").value+")";
    blockInfo.style.backgroundColor=grid.style.backgroundColor;
    document.getElementById("heightInfo").style.backgroundColor=grid.style.backgroundColor;
    if(!pause){
        //Updates the block's width/height on blockInfo page
        document.getElementById("blockWidth").innerHTML=blockSize;
        document.getElementById("blockHeight").innerHTML=blockHeight;
        game();
        drawBlock();
        drawGame();
        //document.getElementById("h").innerHTML=document.getElementById('h').id;
    }
},gameTime);
//Can make block fall faster, change block width/height, make progress run faster, random block x less, add block color/page theme
//Can consider adding tiny screens at sides, one to see block and another for height
//Can press something to show height on the grid, like gridlines
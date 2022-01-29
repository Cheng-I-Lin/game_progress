class Block{
    constructor(x,y,color="red",falling=true,width=blockSize,height=blockHeight,speed=1) {
        this.x=x;
        this.y=y;
        this.color=color;
        this.falling=falling;
        this.width=width;
        this.height=height;
        this.speed=speed;
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
var gameTime=22;
var pause=false;
var progressTime=25;
var progressAdd=1;
const grid=document.getElementById("grid");
const achievement=document.getElementById("achievements");
const showAchievement=document.getElementById("showAchievement");
//Sets the cover grid lower due to border width(-1)
document.getElementById("coverGrid").style.top=grid.offsetHeight+grid.offsetTop-1+"px";
document.getElementById("coverGrid").style.width=grid.offsetWidth+"px";
showAchievement.addEventListener("click", function(){
    if(achievement.style.bottom=="0%"){
        showAchievement.style.bottom="0%";
        achievement.style.bottom="-40%";
    } else{
        showAchievement.style.bottom="40%";
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
        info.style.top="-15%";
    } else{
        showTheme.style.display="none";
        showInfo.style.top="15%";
        info.style.top="0%";
    }
});
showTheme.addEventListener("click", function(){
    if(theme.style.top=="0%"){
        setTimeout(function(){
            showInfo.style.display="block";
        },1000);
        showTheme.style.top="0%";
        theme.style.top="-15%";
    } else{
        showInfo.style.display="none";
        showTheme.style.top="15%";
        theme.style.top="0%";
    }
});
var allBlock=[];
function drawGame(){
    let canvas=document.getElementById("playerCanvas");
    let ds=canvas.getContext("2d");
    canvas.style.left=grid.offsetLeft+"px";
    canvas.style.top=grid.offsetTop+"px";
    canvas.width = grid.offsetWidth;
    canvas.height = grid.offsetHeight+allBlock.length*blockHeight;
    ds.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    for(let i=0;i<allBlock.length;i++){
        //Draws meteor only if it's not dead
        if(!pause){
            ds.fillStyle=allBlock[i].color;
            ds.fillRect(allBlock[i].x,allBlock[i].y,allBlock[i].width,allBlock[i].height);
        }
    }
} 
var max=grid.offsetHeight;
var addHeight=0;
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
            if(allBlock[i].y+allBlock[i].height>=grid.offsetHeight){
                allBlock[i].stopFall();
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
    document.getElementById("h").innerHTML=Math.abs(max-grid.offsetHeight-addHeight);
}
const progressBar=document.getElementById("progressBar");
const barValue=document.getElementById("barValue");
setInterval(function(){
    barValue.style.left=progressBar.offsetLeft+(progressBar.offsetWidth-barValue.offsetWidth)/2+"px";
    barValue.style.top=progressBar.offsetTop+(progressBar.offsetHeight-barValue.offsetHeight)/2+"px";
    barValue.innerHTML="<strong>"+progressBar.value+"%</strong>";
    progressBar.value+=progressAdd;
    if(progressBar.value==100){
        //Add in new block when progress hit 100, randomize block x location
        allBlock.push(new Block(Math.floor(Math.random()*(grid.offsetWidth-blockSize)),0));
        //Reset progress
        progressBar.value=0;
    }
},progressTime);
setInterval(function(){
    game();
    drawGame();
},gameTime);
//Can make block fall faster, change block width/height, make progress run faster, random block x less, add block color/page theme
//Can consider adding tiny screens at sides, one to see block and another for height
//Can press something to show height on the grid, like gridlines
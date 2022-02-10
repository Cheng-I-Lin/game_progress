class Block{
    constructor(x,y,falling=true,width=blockSize,height=blockHeight,speed=1,type=blockType,bonus=true) {
        this.x=x;
        this.y=y;
        this.falling=falling;
        this.width=width;
        this.height=height;
        this.speed=speed;
        this.type=type;
        this.bonus=bonus;
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
var level=0;
var xp=0;
var blockSize=50;
var blockHeight=100;
var blockType="Regular";
var gameTime=22;
var pause=false;
var progressTime=50;
var progressAdd=1;
var bonusProgress=5;
//Determines the top of canvas
var slideCanvasTop=0;
var canvasBottom=0;
var recordHeight=0;
const grid=document.getElementById("grid");
const achievement=document.getElementById("achievements");
const showAchievement=document.getElementById("showAchievement");
//Resets background img position
var blockImg=document.getElementById("blockImg");
blockImg.style.opacity=0;
blockImg.style.width=grid.offsetWidth+"px";
blockImg.style.height=grid.offsetHeight+"px";
//Sets the cover grid lower due to border width(-1)
document.getElementById("coverGrid").style.top=grid.offsetHeight+grid.offsetTop-1+"px";
document.getElementById("coverGrid").style.width=grid.offsetWidth+"px";
document.getElementById("coverGridTop").style.width=grid.offsetWidth+"px";
showAchievement.addEventListener("click", function(){
    if(achievement.style.bottom=="0%"){
        showAchievement.style.bottom="0%";
        achievement.style.bottom="-28%";
        //Closes tooltip when close achievement page
        tooltip.style.display="none";
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
        ds.shadowBlur=0;
        //Draws meteor only if it's not dead
        switch(allBlock[i].type){
            case "Regular":
                ds.fillStyle="black";
                break;
            case "Border Block":
                ds.fillStyle="white";
                break;
            case "Gold Rush":
                ds.fillStyle="gold";
                break;
            case "Ice Cold":
                ds.fillStyle="rgb(202, 203, 241)";
                break;
            case "Flaming Block":
                ds.shadowBlur=10;
                ds.shadowColor="rgba(255, 0, 0, 1)";
                ds.fillStyle="rgb(255, 136, 0)";
                break;
            case "G-Force":
                ds.fillStyle="";
                break;
            case "TNT":
                ds.fillStyle="";
                break;
            case "Gemstone":
                ds.fillStyle="";
                break;
            case "Starstruck":
                ds.fillStyle="";
                break;
            case "":
                break;
            case "":
                break;
            case "Shapeshifter":
                ds.fillStyle="";
                break;
            case "":
                break;
            case "":
                break;
            case "Meteorite":
                ds.fillStyle="";
                break;
            default:
                ds.fillStyle="red";
                break;
        }
        ds.fillRect(allBlock[i].x,allBlock[i].y,allBlock[i].width,allBlock[i].height);
        switch(allBlock[i].type){
            case "Border Block":
                ds.beginPath();
                ds.moveTo(allBlock[i].x+1.5,allBlock[i].y+1.5);
                ds.lineTo(allBlock[i].width+allBlock[i].x-1.5,allBlock[i].y+1.5);
                ds.lineTo(allBlock[i].width+allBlock[i].x-1.5,allBlock[i].height+allBlock[i].y-1.5);
                ds.lineTo(allBlock[i].x+1.5,allBlock[i].height+allBlock[i].y-1.5);
                ds.closePath();
                ds.strokeStyle="black";
                ds.lineWidth=3;
                ds.stroke();
                break;
            case "Gold Rush":
                ds.beginPath();
                ds.moveTo(allBlock[i].x+1.5,allBlock[i].y+1.5);
                ds.lineTo(allBlock[i].width+allBlock[i].x-1.5,allBlock[i].y+1.5);
                ds.lineTo(allBlock[i].width+allBlock[i].x-1.5,allBlock[i].height+allBlock[i].y-1.5);
                ds.lineTo(allBlock[i].x+1.5,allBlock[i].height+allBlock[i].y-1.5);
                ds.closePath();
                ds.strokeStyle="rgb(220, 135, 0)";
                ds.lineWidth=3;
                ds.stroke();
                break;
            case "Ice Cold":
                ds.beginPath();
                ds.moveTo(allBlock[i].x+1.5,allBlock[i].y+1.5);
                ds.lineTo(allBlock[i].width+allBlock[i].x-1.5,allBlock[i].y+1.5);
                ds.lineTo(allBlock[i].width+allBlock[i].x-1.5,allBlock[i].height+allBlock[i].y-1.5);
                ds.lineTo(allBlock[i].x+1.5,allBlock[i].height+allBlock[i].y-1.5);
                ds.closePath();
                ds.strokeStyle="rgb(138, 130, 203)";
                ds.lineWidth=3;
                ds.stroke();
                break;
            case "Flaming Block":
                ds.beginPath();
                ds.moveTo(allBlock[i].x+1.5,allBlock[i].y+1.5);
                ds.lineTo(allBlock[i].width+allBlock[i].x-1.5,allBlock[i].y+1.5);
                ds.lineTo(allBlock[i].width+allBlock[i].x-1.5,allBlock[i].height+allBlock[i].y-1.5);
                ds.lineTo(allBlock[i].x+1.5,allBlock[i].height+allBlock[i].y-1.5);
                ds.closePath();
                ds.strokeStyle="red";
                ds.lineWidth=3;
                ds.stroke();
                break;
            case "G-Force":
                break;
            case "TNT":
                break;
            case "Gemstone":
                break;
            case "Starstruck":
                break;
            case "":
                break;
            case "":
                break;
            case "Shapeshifter":
                break;
            case "":
                break;
            case "":
                break;
            case "Meteorite":
                break;
            default:
                break;
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
        ds.shadowBlur=0;
        let offsetX=(blockInfo.offsetWidth-blockSize)/2;
        let offsetY=(blockInfo.offsetHeight-blockHeight)/2;
        switch(blockType){
            case "Regular":
                ds.fillStyle="black";
                break;
            case "Border Block":
                ds.fillStyle="white";
                break;
            case "Gold Rush":
                ds.fillStyle="gold";
                break;
            case "Ice Cold":
                ds.fillStyle="rgb(202, 203, 241)";
                break;
            case "Flaming Block":
                ds.shadowBlur=10;
                ds.shadowColor="rgba(255, 0, 0, 1)";
                ds.fillStyle="rgb(255, 136, 0)";
                break;
            case "G-Force":
                break;
            case "TNT":
                break;
            case "Gemstone":
                break;
            case "Starstruck":
                break;
            case "":
                break;
            case "":
                break;
            case "Shapeshifter":
                break;
            case "":
                break;
            case "":
                break;
            case "Meteorite":
                break;
            default:
                break;
        }
        ds.fillRect(offsetX,offsetY,blockSize,blockHeight);
        switch(blockType){
            case "Border Block":
                ds.beginPath();
                ds.moveTo(offsetX+1.5,offsetY+1.5);
                ds.lineTo(blockSize+offsetX-1.5,offsetY+1.5);
                ds.lineTo(blockSize+offsetX-1.5,blockHeight+offsetY-1.5);
                ds.lineTo(offsetX+1.5,blockHeight+offsetY-1.5);
                ds.closePath();
                ds.strokeStyle="black";
                ds.lineWidth=3;
                ds.stroke();
                break;
            case "Gold Rush":
                ds.beginPath();
                ds.moveTo(offsetX+1.5,offsetY+1.5);
                ds.lineTo(blockSize+offsetX-1.5,offsetY+1.5);
                ds.lineTo(blockSize+offsetX-1.5,blockHeight+offsetY-1.5);
                ds.lineTo(offsetX+1.5,blockHeight+offsetY-1.5);
                ds.closePath();
                ds.strokeStyle="rgb(220, 135, 0)";
                ds.lineWidth=3;
                ds.stroke();
                break;
            case "Ice Cold":
                ds.beginPath();
                ds.moveTo(offsetX+1.5,offsetY+1.5);
                ds.lineTo(blockSize+offsetX-1.5,offsetY+1.5);
                ds.lineTo(blockSize+offsetX-1.5,blockHeight+offsetY-1.5);
                ds.lineTo(offsetX+1.5,blockHeight+offsetY-1.5);
                ds.closePath();
                ds.strokeStyle="rgb(138, 130, 203)";
                ds.lineWidth=3;
                ds.stroke();
                break;
            case "Flaming Block":
                ds.beginPath();
                ds.moveTo(offsetX+1.5,offsetY+1.5);
                ds.lineTo(blockSize+offsetX-1.5,offsetY+1.5);
                ds.lineTo(blockSize+offsetX-1.5,blockHeight+offsetY-1.5);
                ds.lineTo(offsetX+1.5,blockHeight+offsetY-1.5);
                ds.closePath();
                ds.strokeStyle="red";
                ds.lineWidth=3;
                ds.stroke();
                break;
            case "G-Force":
                break;
            case "TNT":
                break;
            case "Gemstone":
                break;
            case "Starstruck":
                break;
            case "":
                break;
            case "":
                break;
            case "Shapeshifter":
                break;
            case "":
                break;
            case "":
                break;
            case "Meteorite":
                break;
            default:
                break;
        }
    } else{
        ds.fillRect((blockInfo.offsetWidth-blockSize)/2,(blockInfo.offsetHeight-blockHeight)/2,blockSize,blockHeight);
    }
}
const customBlock=document.getElementById("customBlock");
const navigationLinks=document.getElementsByClassName("navigationLinks");
function drawBlockType(){
    let canvas=document.getElementById("blockTypeCanvas");
    let ds=canvas.getContext("2d");
    canvas.style.left=customBlock.offsetLeft+"px";
    canvas.style.top=customBlock.offsetTop+"px";
    canvas.width = customBlock.offsetWidth;
    canvas.height = customBlock.offsetHeight;
    ds.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    for(let i=0;i<navigationLinks.length;i++){
        //Reset shadow first
        ds.shadowBlur=0;
        let offsetX=navigationLinks[i].offsetLeft+(navigationLinks[i].offsetWidth-50)/2;
        let offsetY=(navigationLinks[i].offsetHeight-50)/2;
        //Draws a block in the middle of each text only if question mark is gone
        if(document.getElementById(i+30).style.opacity=="0"){
            //Draw different types of block
            switch(i){
                case 0:
                    ds.fillStyle="black";
                    //Remember to change block color based on blocktype
                    break;
                case 1:
                    ds.fillStyle="white";
                    break;
                case 2:
                    ds.fillStyle="gold";
                    break;
                case 3:
                    //Create icy effects like snow falling
                    ds.fillStyle="rgb(202, 203, 241)";
                    //Use this to create drop shadow effects
                    break;
                case 4:
                    ds.shadowBlur=10;
                    ds.shadowColor="rgba(255, 0, 0, 1)";
                    ds.fillStyle="rgb(255, 136, 0)";
                    break;
                case 5:
                    ds.fillStyle="rgb(51, 128, 70)";
                    break;
                case 6:
                    ds.fillStyle="rgb(253, 77, 54)";
                    break;
                case 7:
                    ds.fillStyle="rgb(0, 255, 200)";
                    break;
                case 8:
                    ds.shadowBlur=10;
                    ds.shadowColor="gold";
                    ds.fillStyle="yellow";
                    break;
                case 9:
                    ds.fillStyle="gold";
                    break;
                case 10:
                    ds.shadowBlur=30;
                    ds.shadowColor=rgb;
                    ds.fillStyle=rgb;
                    break;
                case 11:
                    ds.fillStyle="gold";
                    break;
                case 12:
                    ds.shadowBlur=20;
                    ds.shadowColor="black";
                    ds.fillStyle="rgba(255,255,255,0.3)";
                    break;
                case 13:
                    ds.fillStyle="silver";
                    break;
                case 14:
                    ds.fillStyle="gold";
                    break;
                default:
                    break;
            }
            ds.fillRect(offsetX,offsetY,50,50);
            switch(i){
                case 1:
                    ds.beginPath();
                    ds.moveTo(offsetX+1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,50+offsetY-1.5);
                    ds.lineTo(offsetX+1.5,50+offsetY-1.5);
                    ds.closePath();
                    ds.strokeStyle="black";
                    ds.lineWidth=3;
                    ds.stroke();
                    break;
                case 2:
                    ds.beginPath();
                    ds.moveTo(offsetX+1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,50+offsetY-1.5);
                    ds.lineTo(offsetX+1.5,50+offsetY-1.5);
                    ds.closePath();
                    ds.strokeStyle="rgb(220, 135, 0)";
                    ds.lineWidth=3;
                    ds.stroke();
                    break;
                case 3:
                    ds.beginPath();
                    ds.moveTo(offsetX+1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,50+offsetY-1.5);
                    ds.lineTo(offsetX+1.5,50+offsetY-1.5);
                    ds.closePath();
                    ds.strokeStyle="rgb(138, 130, 203)";
                    ds.lineWidth=3;
                    ds.stroke();
                    break;
                case 4:
                    ds.beginPath();
                    ds.moveTo(offsetX+1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,50+offsetY-1.5);
                    ds.lineTo(offsetX+1.5,50+offsetY-1.5);
                    ds.closePath();
                    ds.strokeStyle="red";
                    ds.lineWidth=3;
                    ds.stroke();
                    break;
                case 5:
                    ds.beginPath();
                    ds.moveTo(offsetX+1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,50+offsetY-1.5);
                    ds.lineTo(offsetX+1.5,50+offsetY-1.5);
                    ds.closePath();
                    ds.strokeStyle="black";
                    ds.lineWidth=3;
                    ds.stroke();
                    ds.beginPath();
                    ds.moveTo(offsetX+10,offsetY+10);
                    ds.lineTo(offsetX+10,offsetY+15);
                    ds.lineTo(offsetX+25,offsetY+25);
                    ds.lineTo(offsetX+40,offsetY+15);
                    ds.lineTo(offsetX+40,offsetY+10);
                    ds.lineTo(offsetX+25,offsetY+20);
                    ds.closePath();
                    ds.fillStyle="gold";
                    ds.fill();
                    ds.lineWidth=1.5;
                    ds.stroke();
                    ds.beginPath();
                    ds.moveTo(offsetX+10,offsetY+15);
                    ds.lineTo(offsetX+10,offsetY+20);
                    ds.lineTo(offsetX+25,offsetY+30);
                    ds.lineTo(offsetX+40,offsetY+20);
                    ds.lineTo(offsetX+40,offsetY+15);
                    ds.lineTo(offsetX+25,offsetY+25);
                    ds.closePath();
                    ds.fill();
                    ds.stroke();
                    ds.beginPath();
                    ds.moveTo(offsetX+10,offsetY+20);
                    ds.lineTo(offsetX+10,offsetY+25);
                    ds.lineTo(offsetX+25,offsetY+35);
                    ds.lineTo(offsetX+40,offsetY+25);
                    ds.lineTo(offsetX+40,offsetY+20);
                    ds.lineTo(offsetX+25,offsetY+30);
                    ds.closePath();
                    ds.fill();
                    ds.stroke();
                    ds.beginPath();
                    ds.moveTo(offsetX+10,offsetY+25);
                    ds.lineTo(offsetX+10,offsetY+30);
                    ds.lineTo(offsetX+25,offsetY+40);
                    ds.lineTo(offsetX+40,offsetY+30);
                    ds.lineTo(offsetX+40,offsetY+25);
                    ds.lineTo(offsetX+25,offsetY+35);
                    ds.closePath();
                    ds.fill();
                    ds.stroke();
                    break;
                case 6:
                    ds.beginPath();
                    ds.moveTo(offsetX,25+offsetY);
                    ds.lineTo(50+offsetX,25+offsetY);
                    ds.strokeStyle="black";
                    ds.lineWidth=15;
                    ds.stroke();
                    break;
                case 7:
                    ds.beginPath();
                    ds.moveTo(offsetX+1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,50+offsetY-1.5);
                    ds.lineTo(offsetX+1.5,50+offsetY-1.5);
                    ds.closePath();
                    ds.strokeStyle="green";
                    ds.lineWidth=3;
                    ds.stroke();
                    break;
                case 8:
                    break;
                case 9:
                    break;
                case 10:
                    ds.beginPath();
                    ds.moveTo(offsetX+1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,50+offsetY-1.5);
                    ds.lineTo(offsetX+1.5,50+offsetY-1.5);
                    ds.closePath();
                    ds.strokeStyle=rgbBorder;
                    ds.lineWidth=3;
                    ds.stroke();
                    break;
                case 11:
                    break;
                case 12:
                    ds.beginPath();
                    ds.moveTo(offsetX+1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,50+offsetY-1.5);
                    ds.lineTo(offsetX+1.5,50+offsetY-1.5);
                    ds.closePath();
                    ds.strokeStyle="silver";
                    ds.lineWidth=3;
                    ds.stroke();
                    break;
                case 13:
                    ds.beginPath();
                    ds.moveTo(offsetX+1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,offsetY+1.5);
                    ds.lineTo(50+offsetX-1.5,50+offsetY-1.5);
                    ds.lineTo(offsetX+1.5,50+offsetY-1.5);
                    ds.closePath();
                    ds.strokeStyle="black";
                    ds.lineWidth=3;
                    ds.stroke();
                    ds.fillStyle="white";
                    ds.fillRect(offsetX+17.5,offsetY+17.5,15,15);
                    break;
                case 14:
                    break;
                default:
                    break;
            }
        }
    }
} 
//Change colors for rainbow block
var rgb="";
var rgbBorder="";
setInterval(function(){
    rgb="rgb("+(Math.random()*255)+","+(Math.random()*255)+","+(Math.random()*255)+")";
    rgbBorder="rgb("+(Math.random()*155)+","+(Math.random()*155)+","+(Math.random()*155)+")";
},500);
//When hovers over powerups, background color is lighted to show you can upgrade if there's enough xp(PU=power up)
const fasterProgressPU=document.getElementById("fasterProgress");
const fasterFallPU=document.getElementById("fasterFall");
const longerWidthPU=document.getElementById("longerWidth");
const tallerHeightPU=document.getElementById("tallerHeight");

fasterProgressPU.addEventListener("mouseover",function(){
    fasterProgressPU.style.backgroundColor="rgba(255, 255, 255, 0.65)";
});
fasterProgressPU.addEventListener("mouseleave",function(){
    fasterProgressPU.style.backgroundColor="transparent";
});

fasterFallPU.addEventListener("mouseover",function(){
    fasterFallPU.style.backgroundColor="rgba(255, 255, 255, 0.65)";
});
fasterFallPU.addEventListener("mouseleave",function(){
    fasterFallPU.style.backgroundColor="transparent";
});

longerWidthPU.addEventListener("mouseover",function(){
    longerWidthPU.style.backgroundColor="rgba(255, 255, 255, 0.65)";
});
longerWidthPU.addEventListener("mouseleave",function(){
    longerWidthPU.style.backgroundColor="transparent";
});

tallerHeightPU.addEventListener("mouseover",function(){
    tallerHeightPU.style.backgroundColor="rgba(255, 255, 255, 0.65)";
});
tallerHeightPU.addEventListener("mouseleave",function(){
    tallerHeightPU.style.backgroundColor="transparent";
});
//Use background color to determine upgrade or not when click
function game(){
    let previousHeight=recordHeight;
    for(let i=0;i<allBlock.length;i++){
        if(!pause){
            allBlock[i].fall();
            //Shows pic based on blocktype
            if(allBlock[i].type=="Ice Cold"&&allBlock[i].falling){
                blockImg.style.opacity=0.45;
            } else{
                blockImg.style.opacity=0;
            }
            //Stops falling when hit other block
            for(let j=0;j<i;j++){
                if(allBlock[i].y+allBlock[i].height>=allBlock[j].y&&(allBlock[i].x+allBlock[i].width>=allBlock[j].x&&allBlock[i].x<=allBlock[j].x+allBlock[j].width)){
                    allBlock[i].stopFall();
                    //Give bonus when stop falling
                    if(allBlock[i].bonus){
                        progressBar.value+=+bonusProgress;
                        allBlock[i].bonus=false;
                    }
                }
            }
            //Stop fall when hit ground
            if(i==0){
                if(allBlock[i].y+allBlock[i].height>=canvasBottom){
                    allBlock[i].stopFall();
                    if(allBlock[i].bonus){
                        progressBar.value+=+bonusProgress;
                        allBlock[i].bonus=false;
                    }
                }
            } else{
                //Pther blocks can't fall below the first one, might move canvas and mess up ground height
                if(allBlock[i].y>=allBlock[0].y){
                    allBlock[i].stopFall();
                    if(allBlock[i].bonus){
                        progressBar.value+=+bonusProgress;
                        allBlock[i].bonus=false;
                    }
                }
            }
            //Move down one block too tall
            if(allBlock[i].y<=Math.floor(grid.offsetHeight/2)&&!allBlock[i].falling){
                for(let j=i;j>=0;j--){
                    //Can think about how to make it transition instead of immediately go down one block
                    allBlock[j].y+=blockHeight;
                }
                addHeight+=allBlock[i].height;
            }
            if(allBlock[i].y<max&&!allBlock[i].falling){
                max=allBlock[i].y;
            }
        }
    }
    //Shows the tallest height and the total blocks
    recordHeight=Math.abs(max-grid.offsetHeight-addHeight);
    //Add xp if achieve new record height
    if(previousHeight<recordHeight){
        xp+=2;
        level++;
    }
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
var tooltip=document.getElementById("tooltip");
var clickedId;
function blockCustomization(id){
    let block=document.getElementById(id);
    let text=document.getElementById("blockType");
    if(tooltip.style.display=="block"&&clickedId==id){
        tooltip.style.display="none";
    } else{
        tooltip.style.display="block";
    }
    clickedId=id;
    switch(id){
        case "10":
            tooltip.style.left="0px";
            break;
        case "24":
            tooltip.style.left=window.innerWidth-tooltip.offsetWidth+"px";
            break;
        default:
            tooltip.style.left=block.offsetLeft+(block.offsetWidth-tooltip.offsetWidth)/2+"px";
            break;
    }
    //Change tooltip text
    switch(id){
        case "10":
            text.innerHTML="<strong>Regular</strong><br>Initial Block At Height 0"; 
            if(recordHeight>=0){
                blockType="Regular";
            }
            break;
        case "11":
            text.innerHTML="<strong>Border Block</strong><br>Unlocks At Height 100";
            if(recordHeight>=100){
                blockType="Border Block";
            }
            break;
        case "12":
            text.innerHTML="<strong>Gold Rush</strong><br>Unlocks At Height 200";
            if(recordHeight>=200){
                blockType="Gold Rush";
            }
            break;
        case "13":
            text.innerHTML="<strong>Ice Cold</strong><br>Unlocks At Height 500";
            if(recordHeight>=500){
                blockType="Ice Cold";
            }
            break;
        case "14":
            text.innerHTML="<strong>Flaming Block</strong><br>Unlocks At Height 1000";
            if(recordHeight>=1000){
                blockType="Flaming Block";
            }
            break;
        case "15":
            text.innerHTML="<strong>G-Force</strong><br>Unlocks At Height 5000";
            if(recordHeight>=5000){
                //Draw arrows or dash line when block falls, indicating fast moving speed
                //Two arrows pointing down in the block for display
                blockType="G-Force";
            }
            break;
        case "16":
            text.innerHTML="<strong>TNT</strong><br>Unlocks At Height 7500";
            if(recordHeight>=7500){
                //Create countdown attribute for blocks, count to 0 explode from 3
                blockType="TNT";
            }
            break;
        case "17":
            text.innerHTML="<strong>Gemstone</strong><br>Unlocks At Height 10000";
            if(recordHeight>=10000){
                //The gem grows bigger
                blockType="Gemstone";
            }
            break;
        case "18":
            //Make it shine
            text.innerHTML="<strong>Starstruck</strong><br>Unlocks At Height 20000";
            if(recordHeight>=20000){
                blockType="Starstruck";
            }
            break;
        case "19":
            text.innerHTML="<strong>Flash</strong><br>Unlocks At Height 45000";
            if(recordHeight>=45000){
                blockType="Flash";
            }
            break;
        case "20":
            text.innerHTML="<strong>Rainbow</strong><br>Unlocks At Height 75000";
            if(recordHeight>=75000){
                blockType="Rainbow";
            }
            break;
        case "21":
            //Change a shape inside the block, use attribute
            text.innerHTML="<strong>Shapeshifter</strong><br>Unlocks At Height 100000";
            if(recordHeight>=100000){
                blockType="Shapeshifter";
            }
            break;
        case "22":
            text.innerHTML="<strong>Ghost</strong><br>Unlocks At Height 500000";
            if(recordHeight>=500000){
                blockType="Ghost";
            }
            break;
        case "23":
            text.innerHTML="<strong>Bouncy Block</strong><br>Unlocks At Height 750000";
            if(recordHeight>=750000){
                //Tiny block inside that bounces around
                blockType="Bouncy Block";
            }
            break;
        case "24":
            //Make transition crushing effects
            text.innerHTML="<strong>Meteorite</strong><br>Unlocks At Height 1000000";
            if(recordHeight>=1000000){
                blockType="Meteorite";
            }
            break;
        default:
            break;
    }
    tooltip.style.top=achievement.offsetTop-tooltip.offsetHeight+"px";
}
//The power ups of the game, see if want to use block height as xp
function fasterProgress(){
    let PUxp=document.getElementById("fasterProgressXP");
    let PUlvl=document.getElementById("fasterProgressLevel");
    //Use parseInt to add xp and level
    if(xp>=parseInt(PUxp.innerHTML)){
        xp-=parseInt(PUxp.innerHTML);
        PUlvl.innerHTML=parseInt(PUlvl.innerHTML)+1;
        //linear decrease or exponential progressTime-=100;
    }
    PUxp.innerHTML=PUlvl.innerHTML;
}
function fasterFall(){
    let PUxp=document.getElementById("fasterFallXP");
    let PUlvl=document.getElementById("fasterFallLevel");
    //Use parseInt to add xp and level
    if(xp>=parseInt(PUxp.innerHTML)){
        xp-=parseInt(PUxp.innerHTML);
        PUlvl.innerHTML=parseInt(PUlvl.innerHTML)+1;
    }
    PUxp.innerHTML=PUlvl.innerHTML;
}
function largerWidth(){
    let PUxp=document.getElementById("longerWidthXP");
    let PUlvl=document.getElementById("longerWidthLevel");
    //Use parseInt to add xp and level
    if(xp>=parseInt(PUxp.innerHTML)){
        xp-=parseInt(PUxp.innerHTML);
        PUlvl.innerHTML=parseInt(PUlvl.innerHTML)+1;
    }
    PUxp.innerHTML=PUlvl.innerHTML;
}
function taller(){
    let PUxp=document.getElementById("tallerHeightXP");
    let PUlvl=document.getElementById("tallerHeightLevel");
    //Use parseInt to add xp and level
    if(xp>=parseInt(PUxp.innerHTML)){
        xp-=parseInt(PUxp.innerHTML);
        PUlvl.innerHTML=parseInt(PUlvl.innerHTML)+1;
    }
    PUxp.innerHTML=PUlvl.innerHTML;
}
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
    //Closes the question mark
    for(let i=30;i<45;i++){
        switch(i){
            case 30:
                if(recordHeight>=0){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 31:
                if(recordHeight>=100){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 32:
                if(recordHeight>=200){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 33:
                if(recordHeight>=500){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 34:
                if(recordHeight>=1000){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 35:
                if(recordHeight>=5000){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 36:
                if(recordHeight>=7500){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 37:
                if(recordHeight>=10000){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 38:
                if(recordHeight>=20000){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 39:
                if(recordHeight>=45000){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 40:
                if(recordHeight>=75000){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 41:
                if(recordHeight>=100000){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 42:
                if(recordHeight>=500000){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 43:
                if(recordHeight>=750000){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            case 44:
                if(recordHeight>=1000000){
                    document.getElementById(i).style.opacity="0";
                }
                break;
            default:
                break;
        }
    }
    if(!pause){
        //Updates the block's width/height on blockInfo page
        document.getElementById("blockWidth").innerHTML=blockSize;
        document.getElementById("blockHeight").innerHTML=blockHeight;
        document.getElementById("xp").innerHTML=xp;
        document.getElementById("level").innerHTML=level;
        drawBlock();
        drawBlockType();
        //document.getElementById("h").innerHTML=allBlock[0].type;
    }
    game();
    drawGame();
},gameTime);
//Can make block fall faster, change block width/height, make progress run faster, random block x less, add block color/page theme
//Can consider adding tiny screens at sides, one to see block and another for height
//Can press something to show height on the grid, like gridlines
const WIDTH=1600;
const HEIGHT=800;
const GRID_COLOR="#9d9d9d";
const DOT_SIZE=11;
const PLAYER_COLORS=["#03cd00","#000000"];
var DotselSize=11;
var DotselOutline=3;
var GridThickness=2;
var GridScale=50;

var canvas = document.getElementById("paper");
canvas.setAttribute("width",WIDTH+"px");
canvas.setAttribute("height",HEIGHT+"px");
var ctx=canvas.getContext("2d");
const MoveList=[];
var move=0;

//https://www.w3docs.com/snippets/javascript/how-to-create-a-two-dimensional-array-in-javascript.html
const Board=new Array(40);
for(var x=0;x<40;x++){
    Board[x]=new Int8Array(20);
}

//drawing grid
var boardWidth,boardHeight;
var gridOffsetX,gridOffsetY;
function DrawGrid(){
    gridOffsetX = Math.floor((((HEIGHT)%(GridScale))+GridScale)/2);
    gridOffsetY = Math.floor((((WIDTH)%(GridScale))+GridScale)/2);
    boardWidth = Math.ceil((WIDTH-gridOffsetX)/GridScale);
    boardHeight = Math.ceil((HEIGHT-gridOffsetY)/GridScale);
    ctx.beginPath();
    ctx.strokeStyle=GRID_COLOR;
    ctx.lineWidth=GridThickness;
    for(var i=0;i<boardHeight;i++){
        ctx.moveTo(0,gridOffsetX+(i*GridScale));
        ctx.lineTo(WIDTH,gridOffsetX+(i*GridScale));
    }
    for(var i=0;i<boardWidth;i++){
        ctx.moveTo(gridOffsetY+(i*GridScale),0);
        ctx.lineTo(gridOffsetY+(i*GridScale),HEIGHT);
    }  
    ctx.stroke();
}
function RoundToGrid(val,type){ //W.I.P: capping the rounding to not go outside the board, will have to add 
    //x
    if(type==0 || type=="x"){
        if(gridOffsetX+Math.round((-gridOffsetX+Math.round(WIDTH*(val)/canvas.clientWidth))/GridScale)*GridScale<WIDTH){
            if(gridOffsetX+Math.round((-gridOffsetX+Math.round(WIDTH*(val)/canvas.clientWidth))/GridScale)*GridScale>=0)
            return Math.floor(gridOffsetX+Math.round((-gridOffsetX+Math.round(WIDTH*(val)/canvas.clientWidth))/GridScale)*GridScale);
            else
            return Math.floor(gridOffsetX);
        }else{
            return Math.floor(gridOffsetX+GridScale);
        }
    }//y
    else{
        if(gridOffsetY+Math.round((-gridOffsetY+Math.round(HEIGHT*(val)/canvas.clientHeight))/GridScale)*GridScale<HEIGHT){
            if(gridOffsetY+Math.round((-gridOffsetY+Math.round(HEIGHT*(val)/canvas.clientHeight))/GridScale)*GridScale>=0)
            return Math.floor(gridOffsetY+Math.round((-gridOffsetY+Math.round(HEIGHT*(val)/canvas.clientHeight))/GridScale)*GridScale); 
            else
            return Math.floor(gridOffsetY);
        }
        else{
            return Math.floor(gridOffsetY);
        }
    }
}
function PlaceDotSel(x,y,c){
    ctx.beginPath();
    ctx.lineWidth=DotselOutline;
    ctx.strokeStyle=c;
    ctx.fillStyle="#ffffff";
    ctx.arc(x,y,DotselSize,0,2*Math.PI,0);
    ctx.stroke();
}
function DrawDot(x,y,c){
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.fillStyle=c;
    ctx.arc(x,y,DOT_SIZE,0,2*Math.PI,0);
    ctx.fill();
}
function ClearDot(x,y){
    var s=GridScale/2;
    ctx.beginPath();
    ctx.fillStyle="#ffffff";
    ctx.rect(x-s,y-s,2*s,2*s);
    ctx.fill()
    ctx.beginPath();
    ctx.strokeStyle=GRID_COLOR;
    ctx.lineWidth=GridThickness;
    ctx.moveTo(x-s,y);
    ctx.lineTo(x+s,y);
    ctx.moveTo(x,y+s);
    ctx.lineTo(x,y-s);
    ctx.stroke();
}
function checkAround(dotX,dotY){
    const newDots=[]
    if(Board[dotX][dotY]==Board[dotX+1][dotY])
    newDots.push({x:dotX+1,y:dotY});
    if(Board[dotX][dotY]==Board[dotX-1][dotY])
    newDots.push({x:dotX-1,y:dotY});
    if(Board[dotX][dotY]==Board[dotX][dotY+1])
    newDots.push({x:dotX,y:dotY+1});
    if(Board[dotX][dotY]==Board[dotX][dotY-1])
    newDots.push({x:dotX,y:dotY-1});
    if(Board[dotX][dotY]==Board[dotX+1][dotY+1])
    newDots.push({x:dotX+1,y:dotY+1});
    if(Board[dotX][dotY]==Board[dotX+1][dotY-1])
    newDots.push({x:dotX+1,y:dotY-1});
    if(Board[dotX][dotY]==Board[dotX-1][dotY+1])
    newDots.push({x:dotX-1,y:dotY+1});
    if(Board[dotX][dotY]==Board[dotX-1][dotY-1])
    newDots.push({x:dotX-1,y:dotY-1});
    return newDots;
}
function MakeMove(x,y){
    const dotX=(x-gridOffsetX)/GridScale,dotY=(y-gridOffsetY)/GridScale;
    ClearDot(x,y);
    MoveList.push(dotX,dotY);
    Board[dotX][dotY]=move%2+1;
    DrawDot(x,y,PLAYER_COLORS[move%2]);
    console.log(checkAround(dotX,dotY));
    move++;
}

DrawGrid();
var mx = RoundToGrid(WIDTH/2,0),my = RoundToGrid(HEIGHT/2,1);
var px=Math.floor((mx-gridOffsetX)/GridScale),py=Math.floor((my-gridOffsetY)/GridScale);
canvas.addEventListener("mousemove", (e)=>{
    if(mx!=RoundToGrid(e.offsetX+1,0) || my!=RoundToGrid(e.offsetY+1,1)){
        ClearDot(mx,my);
        if(Board[px][py]!=0){
            DrawDot(mx,my,PLAYER_COLORS[Board[px][py]-1]);
        }
        mx=RoundToGrid(e.offsetX+1,0);my=RoundToGrid(e.offsetY+1,1);
        px=Math.floor((mx-gridOffsetX)/GridScale),py=Math.floor((my-gridOffsetY)/GridScale);
        PlaceDotSel(mx,my,PLAYER_COLORS[move%2]);
    } 
});
canvas.addEventListener("mousedown", (e)=>{    
    if(Board[px][py]==0){
        MakeMove(mx,my);
        setTimeout(()=>{PlaceDotSel(mx,my,PLAYER_COLORS[move%2]);},200);
    }
});
const WIDTH=1200;
const HEIGHT=600;

var canvas = document.getElementById("paper");
canvas.setAttribute("width",WIDTH+"px");
canvas.setAttribute("height",HEIGHT+"px");
var ctx=canvas.getContext("2d");

//drawing grid
var gridScale,gridOffsetX,gridOffsetY;
function DrawGrid(Scale,Thickness){
    gridScale=Scale;
    gridOffsetX = Math.floor((((HEIGHT)%(Scale))+Scale)/2);
    gridOffsetY = Math.floor((((WIDTH)%(Scale))+Scale)/2);
    ctx.strokeStyle="#9d9d9d";
    ctx.lineWidth=Thickness;
    for(var i=0;i<((HEIGHT- gridOffsetX)/Scale);i++){
        ctx.beginPath();
        ctx.moveTo(0,gridOffsetX+(i*Scale));
        ctx.lineTo(WIDTH,gridOffsetX+(i*Scale));
        ctx.stroke();
    }
    for(var i=0;i<((WIDTH-gridOffsetY)/Scale);i++){
        ctx.beginPath();
        ctx.moveTo(gridOffsetY+(i*Scale),0);
        ctx.lineTo(gridOffsetY+(i*Scale),HEIGHT);
        ctx.stroke();
    }  
}
DrawGrid(30,2);

canvas.addEventListener("mousemove", (e)=>{
    var mouseX = Math.round(WIDTH*(e.offsetX+1)/canvas.clientWidth);
    var mouseY = Math.round(HEIGHT*(e.offsetY+1)/canvas.clientHeight);
    ctx.beginPath();
    ctx.arc(gridOffsetX+Math.round((-gridOffsetX+mouseX)/gridScale)*gridScale,gridOffsetY+Math.round((-gridOffsetY+mouseY)/gridScale)*gridScale,5,0,2*Math.PI,0);
    ctx.strokeStyle="#000000";
    ctx.fill();
});
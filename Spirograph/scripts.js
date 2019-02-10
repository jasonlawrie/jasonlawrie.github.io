var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var ctx2 = document.getElementById("secCanvas").getContext("2d");

var canWidth;
var canHeight;
var can2Width;
var can2Height;

var pointR;
var smallR;
var bigR;
var bigX;
var bigY;
var prevTime;
var speed;

var center = [{x:bigX+bigR, y:bigY}, {x:bigX+bigR, y:bigY}];
var pen = [{x:bigX+bigR-(smallR-pointR),y:bigY,time:0}, {x:bigX+bigR-(smallR-pointR),y:bigY,time:0}];
//var pen2 = [{x:bigX+bigR-(smallR-pointR*1.1),y:bigY,time:0}, {x:bigX+bigR-(smallR-pointR*1.1),y:bigY,time:0}];
//var pen3 = [{x:bigX+bigR-(smallR-pointR/2),y:bigY,time:0}, {x:bigX+bigR-(smallR-pointR/2),y:bigY,time:0}];

var startTime=0;

var today = new Date();

function init(){
    startTime=today.getTime();
    resizeHandler();

    window.requestAnimationFrame(drawCircle);
    
}

function drawCircle(){

    //get the current time and modify units for speed
    //UPDATE THIS TO MAKE NAMES MORE ACCURATE - TIME IS TIME IN SECONDS OR MILLISECONDS AND SPEED IS CALCULATED FROM IT
    var now = new Date();
    var lapseTime = (now.getTime()-startTime)/speed;
    
    //move the center of the traveling circle
    center[0]=center[1];
    center[1]=({x:bigX+Math.cos(lapseTime*smallR/bigR)*(bigR-smallR),y:bigY-Math.sin(lapseTime*smallR/bigR)*(bigR-smallR)});

    //add the location of the next point along the spiral line
    pen[0]=pen[1];
    pen[1]=({x: Math.cos(lapseTime)*(pointR)+center[center.length-1].x,y: Math.sin(lapseTime)*(pointR)+center[center.length-1].y,time:lapseTime});
    
    //pen2.push({x: Math.cos(lapseTime)*(pointR+20)+center[center.length-1].x,y: Math.sin(lapseTime)*(pointR+20)+center[center.length-1].y,time:lapseTime});
    //pen3.push({x: Math.cos(lapseTime)*(pointR*2)+center[center.length-1].x,y: Math.sin(lapseTime)*(pointR*2)+center[center.length-1].y,time:lapseTime});

    //clear the screen
    ctx2.clearRect(0,0,can2Width,can2Height);

    //redraw the spiral so far
    ctx.strokeStyle=document.getElementById("input4").value;

        if(pen[1].time-pen[0].time<50/speed){
            ctx.beginPath();
            ctx.moveTo(pen[0].x,pen[0].y);
            ctx.lineTo(pen[1].x,pen[1].y);
            ctx.stroke();

            
            
            // ctx.beginPath();
            // ctx.moveTo(pen[i-1].x,pen[i-1].y);
            // ctx.lineTo(pen2[i].x,pen2[i].y);
            // ctx.stroke();

            // ctx.beginPath();
            // ctx.moveTo(pen3[i-1].x,pen3[i-1].y);
            // ctx.lineTo(pen3[i].x,pen3[i].y);
            // ctx.stroke();

            // ctx.beginPath();
            // ctx.moveTo(pen[i-1].x+5,pen[i-1].y);
            // ctx.lineTo(pen[i].x+5,pen[i].y);
            // ctx.stroke();

            // ctx.beginPath();
            // ctx.moveTo(pen[i-1].x-(pen[i-1].x-center[i-1].x)*2,pen[i-1].y-(pen[i-1].y-center[i-1].y)*2);
            // ctx.lineTo(pen[i].x-(pen[i].x-center[i].x)*2,pen[i].y-(pen[i].y-center[i].y)*2);
            // ctx.stroke();
        }

    // // THIS IS THE COOL GLOWY BALL THING
    ctx.beginPath();
            var grd = ctx.createRadialGradient(pen[pen.length-1].x,pen[pen.length-1].y,0,pen[pen.length-1].x,pen[pen.length-1].y,500);
            ctx.arc(pen[pen.length-1].x,pen[pen.length-1].y,25,0,360);
            grd.addColorStop(0,document.getElementById("input3").value);
            grd.addColorStop(1,"white");
            ctx.fillStyle=grd;
            ctx.strokeStyle="white";
            ctx.globalAlpha=.5;
            ctx.fill();
            ctx.stroke();
            ctx.strokeStyle="black";
            ctx.globalAlpha=1;






    //draw the moving circle
    var fadeOutTime=lapseTime/(4*Math.PI*bigR/smallR)
    ctx2.beginPath();
    if(fadeOutTime<1){
        ctx2.globalAlpha=1-fadeOutTime;
    } else{
        ctx2.globalAlpha=0;
    }
    ctx2.arc(center[center.length-1].x,center[center.length-1].y,smallR,0,360);
    ctx2.stroke();

    //draw the ouline circle
    ctx2.beginPath();
    ctx2.arc(bigX,bigY,bigR,0,360);
    ctx2.stroke();

    //draw the wand
    ctx2.beginPath();
    ctx2.moveTo(center[center.length-1].x,center[center.length-1].y);
    ctx2.lineTo(pen[pen.length-1].x,pen[pen.length-1].y);
    ctx2.stroke();


    ctx.globalAlpha=1;

    

    //draw the pen tip
    ctx2.beginPath();
    var grd = ctx.createRadialGradient(pen[pen.length-1].x,pen[pen.length-1].y,0,pen[pen.length-1].x,pen[pen.length-1].y,25);
    ctx2.arc(pen[pen.length-1].x,pen[pen.length-1].y,25,0,360);
    grd.addColorStop(0,document.getElementById("input3").value);
    grd.addColorStop(1,"white");
    ctx2.fillStyle=grd;
    ctx2.strokeStyle="white";
    ctx2.globalAlpha=.5;
    ctx2.fill();
    ctx2.stroke();
    ctx2.strokeStyle="black";
    ctx2.globalAlpha=1;
    


    prevTime=lapseTime;

    window.requestAnimationFrame(drawCircle);    
}

function Create(){
    clear();
    var now = new Date;
    startTime=now.getTime();
    pointR=document.getElementById("input1").value;
    smallR=document.getElementById("input2").value;
    bigR=150;
    speed=1000/document.getElementById("input5").value;

    bigX=canWidth/2;
    bigY=canHeight/2;
    center = [{x:bigX+bigR, y:bigY}, {x:bigX+bigR, y:bigY}];
    pen = [{x:bigX+bigR-(smallR-pointR),y:bigY,time:0}, {x:bigX+bigR-(smallR-pointR),y:bigY,time:0}];

}

function clear(){
    for(i=0;i<center.length;i++){
        pen.pop();
        center.pop();
    }
    ctx.clearRect(0,0,canWidth,canHeight);
    ctx2.clearRect(0,0,canWidth,canHeight);
}


function resizeHandler(){
    document.getElementById("myCanvas").setAttribute("width",window.innerWidth*.8);
    document.getElementById("myCanvas").setAttribute("height",window.innerHeight*.5);
    document.getElementById("secCanvas").setAttribute("width",window.innerWidth*.8);
    document.getElementById("secCanvas").setAttribute("height",window.innerHeight*.5);
    document.getElementById("canvasHolder").style.width=window.innerWidth*.8+"px";
    document.getElementById("canvasHolder").style.height=(window.innerHeight*.5+24)+"px";


    document.getElementById("totalBox").style=("Width:"+window.innerWidth*.8+"px;");
    canWidth=document.getElementById("myCanvas").width;
    canHeight=document.getElementById("myCanvas").height;
    can2Width=document.getElementById("secCanvas").width;
    can2Height=document.getElementById("secCanvas").height;
    Create();
}

function emptyBox(){

}


function saveCanvas(){
    window.open(document.getElementById("myCanvas").toDataURL("image/png"));
}

function feedback1Update(){
    
    document.getElementById("inTitle1").innerHTML="Pen Location: " + document.getElementById("input1").value;
}
function feedback2Update(){
    document.getElementById("inTitle2").innerHTML="Small Radius (pixels): " + document.getElementById("input2").value;
}
function feedback5Update(){
    document.getElementById("inTitle5").innerHTML="Speed: " + document.getElementById("input5").value;
}

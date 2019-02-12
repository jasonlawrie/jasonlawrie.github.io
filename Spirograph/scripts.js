//define my canvas contexts
var ctx = document.getElementById("myCanvas").getContext("2d");
var ctx2 = document.getElementById("secCanvas").getContext("2d");

//declare variables that will hold element dimensions
var canWidth;
var canHeight;
var can2Width;
var can2Height;

//declare variables that will hold dimensions for the outline and stencil
var pointR;
var smallR;
var bigR;
var bigX;
var bigY;
var center = [{x:bigX+bigR, y:bigY}, {x:bigX+bigR, y:bigY}];
var pen = [{x:bigX+bigR-(smallR-pointR),y:bigY,time:0}, {x:bigX+bigR-(smallR-pointR),y:bigY,time:0},{x:bigX+bigR-(smallR-pointR),y:bigY,time:0},{x:bigX+bigR-(smallR-pointR),y:bigY,time:0}];
var penScale=1.5;

//declare variables that relate to the motion of the image as controlled by the system clock
var speed=200;
var startTime;
var today = new Date();

//declare boolean variables that will allow user input to change which pattern/path is run
var simplePath=true;
var doublePath=false;
var hashPath=false;
var glowPath=false;
var outline=true;
var stencil=true;
var wand=true;
var penTip=true;

//This method will be run once to set up the first display when the page is loaded
function init(){
    startTime=today.getTime();
    resizeHandler();
    
    window.requestAnimationFrame(drawCircle);
}

function drawCircle(){

    //get the current time and modify units for speed
    var now = new Date();
    var lapseTime = (now.getTime()-startTime)/speed;
    
    //move the center of the traveling circle
    center[0]=center[1];
    center[1]=({x:bigX+Math.cos(lapseTime*smallR/bigR)*(bigR-smallR),y:bigY-Math.sin(lapseTime*smallR/bigR)*(bigR-smallR)});

    //add the location of the next point along the spiral line
    pen[0]=pen[1];
    pen[1]=({x: Math.cos(lapseTime)*(pointR)+center[center.length-1].x,y: Math.sin(lapseTime)*(pointR)+center[center.length-1].y,time:lapseTime});
    pen[2]=pen[3];
    pen[3]=({x: Math.cos(lapseTime)*(pointR)*penScale+center[center.length-1].x,y: Math.sin(lapseTime)*(pointR)*penScale+center[center.length-1].y,time:lapseTime});

    //clear the screen
    ctx2.clearRect(0,0,can2Width,can2Height);

    //redraw the spiral so far
    //ctx.strokeStyle=document.getElementById("input4").value;
    ctx.strokeStyle="black";

    if(simplePath){
        if(pen[1].time-pen[0].time<50/speed){
            ctx.beginPath();
            ctx.moveTo(pen[0].x,pen[0].y);
            ctx.lineTo(pen[1].x,pen[1].y);
            ctx.stroke();
        }   
    }
    if(doublePath){
        if(pen[3].time-pen[2].time<50/speed){
            ctx.beginPath();
            ctx.moveTo(pen[2].x,pen[2].y);
            ctx.lineTo(pen[3].x,pen[3].y);
            ctx.stroke();
        }   
    }

    if(hashPath){
        if(pen[1].time-pen[0].time<50/speed){
            ctx.beginPath();
            ctx.moveTo(pen[0].x,pen[0].y);
            ctx.lineTo(pen[2].x,pen[2].y);
            //ctx.lineTo(pen[1].x,pen[1].y);
            ctx.stroke();
        }  
    }

    if(glowPath){
        // THIS IS THE COOL GLOWY BALL THING
        ctx.beginPath();
        var grd = ctx.createRadialGradient(pen[1].x,pen[1].y,0,pen[1].x,pen[1].y,50);
        ctx.arc(pen[1].x,pen[1].y,25,0,360);
        grd.addColorStop(0,document.getElementById("input3").value);
        grd.addColorStop(1,"white");
        ctx.fillStyle=grd;
        ctx.strokeStyle="white";
        ctx.globalAlpha=.5;
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle="black";
        ctx.globalAlpha=1;
    }

    if(outline){
        //draw the ouline circle
        ctx2.beginPath();
        ctx2.arc(bigX,bigY,bigR,0,360);
        ctx2.stroke();
    }

    if(stencil){
        //draw the moving circle
        var fadeOutTime=lapseTime/(4*Math.PI*bigR/smallR)
        ctx2.beginPath();
        // if(fadeOutTime<1){
        //     ctx2.globalAlpha=1-fadeOutTime;
        // } else{
        //     ctx2.globalAlpha=0;
        // }
        ctx2.arc(center[center.length-1].x,center[center.length-1].y,smallR,0,360);
        ctx2.stroke();
        // ctx.globalAlpha=1;
    }

    if(wand){
        //draw the wand
        ctx2.beginPath();
        ctx2.moveTo(center[1].x,center[1].y);
        ctx2.lineTo(pen[1].x,pen[1].y);
        ctx2.stroke();
    }

    if(penTip){
        //draw the pen tip
        ctx2.beginPath();
        var grd = ctx2.createRadialGradient(pen[1].x,pen[1].y,0,pen[1].x,pen[1].y,25);
        ctx2.arc(pen[1].x,pen[1].y,25,0,360);
        grd.addColorStop(0,document.getElementById("input3").value);
        grd.addColorStop(1,"white");
        ctx2.fillStyle=grd;
        ctx2.strokeStyle="white";
        ctx2.globalAlpha=.5;
        ctx2.fill();
        ctx2.stroke();
        ctx2.strokeStyle="black";
        ctx2.globalAlpha=1;
    }

    window.requestAnimationFrame(drawCircle);    
}

function create(){
    clear();
    feedback6Update();
    var now = new Date;
    startTime=now.getTime();
    
    //speed=1000/document.getElementById("input5").value;
    bigX=canWidth/2;
    bigY=canHeight/2;

    bigR=Math.round(Math.min(bigX,bigY)-50,0);
    
    pointR=document.getElementById("input1").value;
    smallR=bigR*document.getElementById("input5").value/(document.getElementById("input2").value-document.getElementById("input5").value);
    
    center = [{x:bigX+bigR, y:bigY}, {x:bigX+bigR, y:bigY}];
    pen = [{x:bigX+bigR-(smallR-pointR),y:bigY,time:0}, {x:bigX+bigR-(smallR-pointR),y:bigY,time:0},{x:bigX+(bigR-(smallR-pointR)),y:bigY,time:0},{x:bigX+(bigR-(smallR-pointR*penScale)),y:bigY,time:0}];
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

    canWidth=Math.max(window.innerWidth*.8,200);
    canHeight=Math.max(window.innerHeight*.5,200);
    can2Width=canWidth;
    can2Height=canHeight;

    document.getElementById("myCanvas").setAttribute("width",canWidth);
    document.getElementById("myCanvas").setAttribute("height",canHeight);
    document.getElementById("secCanvas").setAttribute("width",can2Width);
    document.getElementById("secCanvas").setAttribute("height",can2Height);
    document.getElementById("totalBox").style.width=canWidth+"px";
    document.getElementById("canvasHolder").style.height=(canHeight+24)+"px";


    
    create();
}

function emptyBox(){

}


function saveCanvas(){
    window.open(document.getElementById("myCanvas").toDataURL("image/png"));
}

function feedback1Update(){
    
    document.getElementById("inTitle1").innerHTML="Size: " + document.getElementById("input1").value;
}
function feedback2Update(){
    document.getElementById("inTitle2").innerHTML="Nodes: " + document.getElementById("input2").value;
    document.getElementById("input5").setAttribute("max",Math.trunc((document.getElementById("input2").value-.25)/2));
    document.getElementById("input5").value=1;
    feedback5Update();
}
function feedback5Update(){
    document.getElementById("inTitle5").innerHTML="Pattern: " + document.getElementById("input5").value;
}

function feedback6Update(){
    var e = document.getElementById("patternSel");
    var patSel = e.options[e.selectedIndex].value;
    simplePath=false;
    doublePath=false;
    hashPath=false;
    glowPath=false;
    if(patSel=="1") simplePath=true;
    if(patSel=="2") {
        simplePath=true;
        doublePath=true;
    }
    if(patSel=="3") hashPath=true;
    if(patSel=="4") glowPath=true;
}

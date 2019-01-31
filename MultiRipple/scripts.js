//Declare array variables needed for EACH circle

var xPos = [250];
var yPos = [250];
var radDes = [0];
var perHold = [3];
var radHold = [radDes[0]/perHold[0]];
var clickHold = [0];
var fillCol = ["#FFFFFF"];
var lineCol = ["#000000"];
var lineWei = [1];
var canWidth = 1500;
var canHeight = 1500;

//var testVar=("Width:"+window.innerWidth*.9+";")

function init(){
    window.requestAnimationFrame(drawCircle);
    resizeHandler();
}

function drawCircle(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var today = new Date();

    ctx.clearRect(0,0,canWidth,canHeight);
    
    for(i = 0;i<xPos.length;i++){
        var lapseTime = today.getTime()/1000-clickHold[i];
        ctx.beginPath();
        ctx.arc(xPos[i],yPos[i],lapseTime%perHold[i]*radHold[i],0,2*Math.PI);
        ctx.lineWidth=lineWei[i];
        ctx.fillStyle=fillCol[i];
        ctx.strokeStyle=lineCol[i];
        ctx.fill();
        ctx.stroke();
        
    }

    var ct2 = document.getElementById("myCanvas2").getContext("2d");
    ct2.clearRect(0,0,100,100);
    ct2.beginPath();
    ct2.arc(50,50,today.getTime()/1000%document.getElementById("input2").value*(document.getElementById("input1").value/document.getElementById("input2").value),0,2*Math.PI);
    ct2.lineWidth=document.getElementById("input5").value;
    ct2.fillStyle=document.getElementById("input3").value;
    ct2.strokeStyle=document.getElementById("input4").value;
    ct2.fill();
    ct2.stroke();

    window.requestAnimationFrame(drawCircle);    
}

function clickHandler(e){
    var c = document.getElementById("myCanvas");
    var today= new Date();
    
    xPos.push(e.clientX-c.getBoundingClientRect().left-11);
    yPos.push(e.clientY-c.getBoundingClientRect().top-11);
    clickHold.push(today.getTime()/1000);
    perHold.push(document.getElementById("input2").value);
    radDes.push(document.getElementById("input1").value);
    radHold.push(radDes[radDes.length-1]/perHold[perHold.length-1]);
    fillCol.push(document.getElementById("input3").value);
    lineCol.push(document.getElementById("input4").value);
    lineWei.push(document.getElementById("input5").value);
}

function resizeHandler(){
    document.getElementById("myCanvas").setAttribute("width",window.innerWidth*.8);
    document.getElementById("myCanvas").setAttribute("height",window.innerHeight*.5);
    document.getElementById("totalBox").style=("Width:"+window.innerWidth*.8+"px;");
    canWidth=document.getElementById("myCanvas").width;
    canHeight=document.getElementById("myCanvas").height;
    document.getElementById("myCanvas").getContext("2d").clearRect(0,0,canWidth,canHeight);
}

function emptyBox(){
    while(xPos.length){xPos.pop()};
    while(yPos.length){yPos.pop()};
    while(radDes.length){radDes.pop()};
    while(perHold.length){perHold.pop()};
    while(radHold.length){radHold.pop()};
    while(clickHold.length){clickHold.pop()};
    while(fillCol.length){fillCol.pop()};
    while(lineCol.length){lineCol.pop()};
    while(lineWei.length){lineWei.pop()};
}
function undoCircle(){
    xPos.pop();
    yPos.pop();
    radDes.pop();
    perHold.pop();
    radHold.pop();
    clickHold.pop();
    fillCol.pop();
    lineCol.pop();
    lineWei.pop();
}

function saveCanvas(){
    window.open(document.getElementById("myCanvas").toDataURL("image/png"));
}

function feedback1Update(){
    
    document.getElementById("inTitle1").innerHTML="Radius (pixels): " + document.getElementById("input1").value;
}
function feedback2Update(){
    document.getElementById("inTitle2").innerHTML="Period (seconds): " + document.getElementById("input2").value;
}
function feedback5Update(){
    document.getElementById("inTitle5").innerHTML="Line Weight (pixels): " + document.getElementById("input5").value;
}

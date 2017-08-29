/*jstephens p5_gungfu 2016_06
perlin noise from shiffman
TODO:
**simplest version possible that still does the following:
[x] switch case function

scan across perlin space such that 
xoff initial value increments at every loop
while it continues to increment across the screen width within each loop

[]  y = sin 
[]  y = additive sin+noise wave (sin dominant)
[]  y = additive sin+noise wave (noise dominant
*/
var pageTitle = "1D Noise Space: Single Value Extraction";

var INNER_WIDTH = window.innerWidth;
var INNER_HEIGHT= window.innerHeight;
var graphVersion = 1;
var graphVersionNum = graphVersion;
var randGraphType = 2;
var randIncrementScl = 1;
var randAnchorXaxis  = 3;
var randMapWidthScl  = 2;

var randFillGrey     = 122;
var randFillAlpha    = 100;
var randWidthFlair   = 1;
var randSkip=15;
var start=0;
var xoff=0;
var start2=1000;
var xoff2=0;

var randFillSwitch   = 0;
var vertex2IsOn = false;
var vertexSwitch = 0;
var isClosed    = true;

var increment = .01;
var color00;
var color01; 
 
function setup(){
  createCanvas(INNER_WIDTH, INNER_HEIGHT);
  background(0);
}

function draw(){
  switchGraphs();
  drawPageTitle();
}
function switchGraphs(){
  fill(255);
  switch(graphVersion){
    case 0:
      graphNoise00();
      break;
    case 1:
      graphNoise01();
      break;
    case 2:
      graphNoise02();
      break;
    case 3:
      graphNoise03();
      break;
    default:
  }
}


function graphNoise00(){
  background(0);
  //color00 = noise(xoff)*255;
  
  if (randFillSwitch == 0){
    noFill();
  } else {
    fill(randFillGrey, randFillAlpha);
    //fill(noise(xoff)*255);
  }
  
  //noFill();
  //fill(255,85);
  stroke(255,150);
  //update xoff initial value at each loop
  xoff = start;
  
  beginShape();
  //randSkip =15;
  for (var x = 0; x < INNER_WIDTH; x+=randSkip){
    var y = noise(xoff)*height;
    var other = noise(xoff+5)*width;
    
    //vertex2IsOn = true;
  
    
    vertex(x,y);
    if (vertex2IsOn){
      //vertex(y,x);
      //vertex(x/y*width,y);//this one
      //vertex(other,x/y*width);//
      //vertex(width-x,y);
      vertex(other,(y/x+(height*.5)));//dope
      vertex(width/2,0);
    }
    
    //randGraphType = 5;
    if (randGraphType == 0){
      line(x*3,height,x,y);
    } else if (randGraphType == 1){
      line(x*randAnchorXaxis,height,x,y);
    } else if (randGraphType == 2){
      var mappedX = map(x,0,width, width*-.5, width+(width*.5));
      line(mappedX,height,x,y);
    } else if (randGraphType == 3){
      var mappedX = map(x,0,width, width*(-randWidthFlair), width*(randWidthFlair*2));
      line(mappedX,height,x,y);
    } else if (randGraphType == 4){
      var mappedY = map(y,0,height, width*(-randWidthFlair), width*(randWidthFlair*2));
      line(width/2,mappedY,x,y);
    } else {
      //line(width/2,other,x,y);
      line(width/2,height,x,y);
    }
    // randomly alter the increment value 
    // multiple by scale compensates for the x+=skip of the forloop
    xoff += (increment*randIncrementScl);
  }
  endShape();
  /*
  if (randSkip < 25){
    endShape(CLOSED);
  } else {
    endShape();
  }
  */
  //then increment start, which will increment xoff
  start += increment;
}


function graphNoise01(){
  //background(0);
  
  if (randFillSwitch == 0){
    background(0);
    noFill();
  } else {
    //fill(randFillGrey, randFillAlpha);
    //fill(randFillGrey, noise(xoff)*100);
    //fill(40, noise(xoff)*100);
    fill(20,90);
  }
  stroke(255,0,0,130);
  //update xoff initial value at each loop
  xoff = start;
  xoff2 = start2;
  
  beginShape();
  //randSkip =45;
  for (var x = 0; x < INNER_WIDTH; x+=randSkip){
    var y = noise(xoff)*height;
    var other = noise(xoff2)*width;
    var mapX = map(x,0,width, -width, 2*width);
    //vertexSwitch = 3;
    switch(vertexSwitch){
      case 0:
        vertex(x,y);
        vertex(other,(y/x+(height*.5)));//dope
        vertex(width/2,y);
        break;
      case 1:
        vertex(x,y);
        vertex(other,y);//
        break;
      case 2:
        //vertex(x,y);
        vertex(other,mapX);//this one
        vertex(x,y);
        break;
      case 3:
        //background(0);
        stroke(255,0,255,200);
        vertex(x,y);
        var xRange = map(other,0,width, -width*(randMapWidthScl, width*randMapWidthScl));
        vertex(xRange,(y*(y/height)));//dop
        vertex(other,(height-y));//dope
        //vertex(x,y);
        break;
      case 4:
        stroke(255,0,0,130);
        //fill(200,100);
        vertex(width-other,y);
        //vertex(x,y);
        var yRange = map(other,0,height, -height*(randMapWidthScl), height*randMapWidthScl);
        var xRange = map(y,0,width, -width*(randMapWidthScl), width*randMapWidthScl);
        vertex(yRange,xRange);
        vertex(other,(height-y));//dope
        vertex(x,y);
        
        break;
      default:
        vertex(x,y);
      }
      /*
    //vertex2IsOn = true;
    if (vertex2IsOn){
      //vertex(y,x);
      //vertex(x/y*width,y);//this one
      //vertex(other,x/y*width);//
      //vertex(width-x,y);
      //vertex(x/y*width,height-y);
      vertex(x,y);
      vertex(other,(y/x+(height*.5)));//dope
      vertex(width/2,0);
    } else {
    vertex(x,y);
    vertex(other,x/y);//dope
    }
    //vertex(other,(y/x+(height*.5)));//dope
    
    //vertex(other,(y/x+(other)));//dope
    //vertex(width/2,0);
    */

    //randGraphType = 5;
    if (randGraphType == 0){
      line(x*3,height,x,y);
    } else if (randGraphType == 1){
      line(x*randAnchorXaxis,height,x,y);
    } else if (randGraphType == 2){
      var mappedX = map(x,0,width, -width, width+(width));
      line(mappedX,height,x,y);
    } else if (randGraphType == 3){
      var mappedX = map(x,0,width, width*(-randWidthFlair), width*(randWidthFlair*2));
      line(mappedX,height,x,y);
    } else if (randGraphType == 4){
      var mappedY = map(y,0,height, width*(-randWidthFlair), width*(randWidthFlair*2));
      //line(width/2,mappedY,x,y);
      line(other,mappedY,x,y);
      //line(mouseX,mouseY,x,y);
      
    } else {
      line(width/2,other,x,y);
      //line(y/5,other,x,y);
      //line(width/2,height,x,y);
    }
    // randomly alter the increment value 
    // multiple by scale compensates for the x+=skip of the forloop
    xoff += (increment*randIncrementScl);
    xoff2 += (increment*randIncrementScl);
  }
  if (randSkip < 5){
    endShape(CLOSED);
  } else {
    endShape();
  }
  //then increment start, which will increment xoff
  start += increment;
  start2 += increment;
}


function mousePressed(){
  background(0);
  graphVersion += 1;
  graphVersion %= 2;
  graphVersionNum = graphVersion;
  
  //pick a new configuration upon each iteration
  randGraphType    = floor(random(7));
  randIncrementScl = floor(random(2,10));
  randSkip         = floor(random(10,46));
  randAnchorXaxis  = random(.1,3);
  randFillSwitch   = floor(random(2));
  randWidthFlair   = random(1,5);
  randFillGrey     = random(255);
  randFillAlpha     = random(255);
  randMapWidthScl  = random(1,15);
  
  
  vertexSwitch +=1;
  vertexSwitch %=5;
  
  //vertexSwitch = floor(random(2));
  if (vertexSwitch ==0){
    vertex2IsOn = !vertex2IsOn;
  }
  
  
  console.log('randGraphType=' + randGraphType + ' randIncrementScl=' + randIncrementScl + ' randSkip=' + randSkip + ' randAnchorXaxis=' + randAnchorXaxis + ' randFillSwitch=' + randFillSwitch + ' randWidthFlair=' + randWidthFlair + ' vertex2IsOn=' + vertex2IsOn + ' vertexSwitch=' + vertexSwitch);
  
  switchGraphs();
  drawPageTitle();  
}

function graphNoise02(){
  color00 = noise(xoff)*255;
  noFill();
  stroke(255-color00,color00*2);
  beginShape();
  for (var x = 0; x < INNER_WIDTH; x++){
    var y = noise(xoff)*height;
    vertex(x,y);
    xoff += increment;
  }
  endShape();
}

function graphNoise03(){
  fill(255,5);
  stroke(0,100);
  //color01 = noise(xoff)*255;
  //fill(color01,90);
  beginShape();
  for (var x = 0; x < INNER_WIDTH; x++){
    var y = noise(xoff)*height;
    vertex(x,y);
    xoff += increment;
  }
  endShape();
}

function graphNoise04(){
  color00 = noise(xoff)*255;
  fill(color00,255);
  //noFill();
  stroke(255-color00);
  beginShape();
  for (var x = 0; x < INNER_WIDTH; x++){
    var y = noise(xoff)*height;
    vertex(x,y);
    xoff += increment;
  }
  endShape();
}


function drawPageTitle(){
  fill(160);
  textSize(25);
  text(pageTitle, width*.05, height*.05);
  text(graphVersionNum,width*.05,height*.98);
}
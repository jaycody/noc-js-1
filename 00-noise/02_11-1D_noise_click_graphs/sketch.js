/*jstephens p5_gungfu 2016_06
perlin noise from shiffman
TODO:
**simplest version possible that still does the following:
[x] switch case function

[]  y = sin 
[]  y = additive sin+noise wave (sin dominant)
[]  y = additive sin+noise wave (noise dominant
*/
var pageTitle = "2D rep of 1D Noise Space: static graphs";

var INNER_WIDTH = window.innerWidth;
var INNER_HEIGHT= window.innerHeight;
var graphVersion = 1;
var graphVersionNum = graphVersion;

var xoff=0;
var increment = .01;
var color00;
var color01; 
 


function setup(){
  createCanvas(INNER_WIDTH, INNER_HEIGHT);
  background(0);
  noLoop();
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

function graphNoise03(){
  color00 = noise(xoff)*255;
  //fill(color00,255);
  var topOrBottom = floor(random(6));
  console.log(topOrBottom);
  noFill();
  stroke(255-color00);
  beginShape();
  for (var x = 0; x < INNER_WIDTH; x++){
    var y = noise(xoff)*height;
    //vertex(y,x);
    vertex(x,y);
    if (topOrBottom == 0){
        line(x,0,x,y);
    } else{
      line(x*topOrBottom,height,x,y);
    }
    
    xoff += increment;
  }
  endShape();
}

function graphNoise02(){
  color00 = noise(xoff)*255;
  //fill(color00,255);
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

function graphNoise01(){
  fill(255,50);
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


function graphNoise00(){
  color00 = noise(xoff)*255;
  //fill(color00,255);
  noFill();
  stroke(255-color00);
  beginShape();
  for (var x = 0; x < INNER_WIDTH; x++){
    var y = noise(xoff)*height;
    vertex(y,x);
    vertex(x,y);
    //line(x,0,x,y);
    xoff += increment;
  }
  endShape();
  //noLoop();
}

function mousePressed(){
  background(0);
  graphVersion += 1;
  graphVersion %= 4;
  //console.log(graphVersion);
  graphVersionNum = graphVersion;
  //draw();
  switchGraphs();
  drawPageTitle();
}

function drawPageTitle(){
  //display pageTitle and graphVersionNumber
  fill(160);
  textSize(25);
  text(pageTitle, width*.05, height*.05);
  text(graphVersionNum,width*.05,height*.98);
}
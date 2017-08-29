/*jstephens p5_gungfu 2016_06
perlin noise from shiffman
TODO:
**simplest version possible that still does the following:
[x] switch case function

[]  y = sin 
[]  y = additive sin+noise wave (sin dominant)
[]  y = additive sin+noise wave (noise dominant
*/
var pageTitle = "1D Noise Space: Single Value Extraction";

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
    
    default:
  }
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


function graphNoise00(){
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

function mousePressed(){
  background(0);
  graphVersion += 1;
  graphVersion %= 3;
  //console.log(graphVersion);
  graphVersionNum = graphVersion;
  //draw();
}

function drawPageTitle(){
  //display pageTitle and graphVersionNumber
  fill(160);
  textSize(25);
  text(pageTitle, width*.05, height*.05);
  text(graphVersionNum,width*.05,height*.98);
}
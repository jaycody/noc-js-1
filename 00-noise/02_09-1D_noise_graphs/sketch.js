/*jstephens p5_gungfu 2016_06
perlin noise from shiffman
TODO:
[x] simples version possible that still does the following
[x] switch case function
calculate y and graph x,y for the following
[x]  y = static
[x]  y = random
[x]  y = noise(0)
[x]  y = noise(xOff) //increment xOffset
[x]  y = noise(xOff) //xOff starts at start. increment xOff and start.

[]  y = sin 
[]  y = additive sin+noise wave (sin dominant)
[]  y = additive sin+noise wave (noise dominant)

      //  inside shape, for every x in width {
      //    calculate y
      //    draw vertex (x,y);
      //  }
*/

var pageTitle = "1D Noise Space: Single Value Extraction";
var currentGraph = 0;
var constantY = 0;
var insideLoopY = 0;
var randomY  = 0;
var graphY   = 0;
var stringOfY = "";
var start = 0;
var xOffset = 0;
var increment = .01;

var INNER_WIDTH = window.innerWidth;
var INNER_HEIGHT= window.innerHeight;

function setup(){
  createCanvas(INNER_WIDTH, INNER_HEIGHT);
  background(0);
  constantY = floor(random(30,height));  //initialize yConstant value
}

function draw(){   
  switchGraph();
}

function switchGraph(){
  background(0);
  switch(currentGraph){
    case 0:
      yIsNoiseOfTerrain();
      break;
    case 1:
      yIsRandom();
      break;
    case 2:
      yIsNoiseOfTerrainCase1();
      break;
    case 3:
      yIsRandomForEachX();
      break;
    case 4:
      yIsNoiseOfConstant();
      break;
    case 5: 
      yIsNoiseOfIncrement();
      break;
    case 6:
      yIsConstant();
      break;
    default:
      randomY = 0;
      insideLoopY = 0;
      stringOfY = "for ALL x\n"
      drawGraph(randomY, stringOfY);
  }
}

function yIsNoiseOfTerrainCase1(){
  ////console.log('function: yIsNoiseOfTerrain');
  noFill();
  smooth();
  increment = .01;
  stroke(255);
  randomY = 0;
  insideLoopY = 0;
  stringOfY = "for every x, y=height*noise(" + xOffset + ")\n"
  drawTerrainCase1(stringOfY);
}
function drawTerrainCase1(_name){
  xOffset = start;
  
  beginShape();
  for (var x = 0; x < width; x ++){
    graphY = floor(noise(xOffset)*height);
    
    vertex(x, graphY);
    stroke(100);
    line(x,height, x, graphY);
    xOffset += increment;
  }
  strokeWeight(3);
  stroke(255);
  endShape();
  
  start += increment;
  
  stringOfY = "for every x, y=height*noise(" + xOffset + ")\n"
  displayText(stringOfY);
}





function yIsNoiseOfTerrain(){
  ////console.log('function: yIsNoiseOfTerrain');
  noFill();
  smooth();
  fill(127);
  stroke(255);
  randomY = 0;
  insideLoopY = 0;
  stringOfY = "for every x, y=height*noise(" + xOffset + ")\n"
  drawTerrain(stringOfY);
}
function drawTerrain(_name){
  xOffset = start;
  
  beginShape();
  for (var x = 0; x < width; x ++){
    graphY = floor(noise(xOffset)*height);
    
    vertex(x, graphY);
    stroke(100);
    //line(x,height, x, graphY);
    xOffset += increment;
  }
  strokeWeight(3);
  stroke(255);
  endShape();
  
  start += increment;
  
  stringOfY = "for every x, y=height*noise(" + xOffset + ")\n"
  displayText(stringOfY);
}

function yIsNoiseOfIncrement(){
  ////console.log('function: yIsNoiseOfIncrement');
  fill(127);
  stroke(255);
  //wipe increments clean for these guys
  start = 0;
  var xOffset  = 0;
  var increment = 0.01;
  
  randomY = 0;
  insideLoopY = 0;
  stringOfY = "for every x, y=height*noise(" + xOffset + ")\n"
  drawNoiseGraph(start, xOffset, increment, stringOfY);
}


function yIsNoiseOfConstant(){
  fill(127);
  stroke(255);
  start = 900;
  var xOffset  = 0;
  var increment = 0;
  
  randomY = 0;
  insideLoopY = 0;
  stringOfY = "for every x, y=height*noise(" + xOffset + ")\n"
  drawNoiseGraph(start, xOffset, increment, stringOfY);
  
}
function drawNoiseGraph(_start, _xOffset, _increment, _stringOfY){
  //xOffset = _xOffset;
  //start   = _start;
  
  _xOffset = _start;
  
  beginShape();
  for (var x = 0; x < width; x ++){
    //var y = noise(_xOffset)*height;
    graphY = floor(noise(_xOffset)*height);
    vertex(x, graphY);
    _xOffset += _increment
  }
  endShape();
  _start += _increment;
  /*
  //console.log('start:' + _start);
  //console.log('xOffset:' + _xOffset);
  //console.log('increment:' + _increment);
  */
  stringOfY = "for every x, y=height*noise(" + _xOffset + ")\n"
  displayText(stringOfY);
  
}
// graph shape with vertex (x,y) for every x in width when y is random for each value of x
function yIsRandomForEachX(){
  fill(127);
  stroke(255);
  randomY = 0;
  insideLoopY = height;
  stringOfY = "for each x\n"
  drawGraph(randomY, stringOfY);
}
// graph (x,y) for every x when y is random for all values of x
function yIsRandom(){
  fill(127);
  stroke(255);
  randomY = floor(random(40,height));
  insideLoopY = 0;
  stringOfY = "for every x\n"
  drawGraph(randomY, stringOfY);
}
function yIsConstant(){
  fill(127);
  stroke(255);
  randomY = 0;
  insideLoopY = 0;
  stringOfY = "for every x\n"
  drawGraph(constantY, stringOfY);
}

function drawGraph(_y, _yValString){
  var y          = _y;
  var yValString = _yValString;
  beginShape();
  for (var x = 0; x < width; x++){
    // increments y by zero unless insideLoopY has values 
    graphY = y + floor(random(insideLoopY));
    vertex(x,graphY);  
  }
  noFill();
  endShape();
  displayText(yValString);
}

function displayText(_yVal){
  yVal = _yVal;
  yVal += "   y = " + graphY;
  fill(255);
  noStroke();
  textSize(18);
  text(yVal, width*.03, 30);
}

function mousePressed(){
  //isolate the get random number so it's called only once, at mousePressed
  constantY = floor(random(40,height));
  
  currentGraph += 1;
  currentGraph %= 7;
  //console.log(currentGraph);
  
}


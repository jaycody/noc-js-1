var pageTitle = "noc_p5_gungfu-01_vectors-03_subtract_vector";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:
[x] create vector for the mouse location
[x] create vector to track the origin
[x] subtract vectors to determine vector between them
[x] subtract origin from the mouse (mouse.sub(origin))
[x] translate screen to the origin
[x] draw a line from origin to the mouse location
*/
/////////////////
////SET GLOBALS
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var backgroundColor   = 127;


function setup(){
  runBasicSetup(); 
}


function draw(){

  var mouse = createVector(mouseX,mouseY);
  var origin = createVector(INNER_WIDTH/2, INNER_HEIGHT/2);  

  mouse.sub(origin);

  translate(origin.x, origin.y);
  //translate(INNER_WIDTH/2, INNER_HEIGHT/2);
  line(0,0, mouse.x, mouse.y);

///////////
//DEBUG
  println('origin.x = ' + origin.x);
  println('mouse.x = ' + mouse.x);
  println('INNER_WIDTH/2 = ' + INNER_WIDTH/2);
}


function mousePressed(){

}




////////////////////////////////////////////////////
////SETUP and CONFIG
////////////////////////////////////////////////////
function runBasicSetup() {
  canvas = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  canvas.position(0,0);
  background(backgroundColor);
  smooth();
  displayPageTitle();
}

function displayPageTitle(){
  //display in canvas
  fill(255);
  textSize(18);
  text(pageTitle, width*.01, 40);
}
////END CONFIG
////////////////////////////////////////////////////







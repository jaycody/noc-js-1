var pageTitle = "noc_p5_gungfu-01_vectors-02_01_add_velocity";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:

*/
/////////////////////////////
////SET GLOBALS
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var backgroundColor   = 127;


var position;
var velocity;

function setup(){
  runBasicSetup();
  
  position = createVector(random(INNER_WIDTH),random(INNER_HEIGHT));
  velocity = createVector(1,1);
}

function draw(){

  //add current velocity to position
  position.add(velocity);

  //check boundary
  if ((position.x > width) || (position.x < 0 )){
    velocity.x *= -1;
  }
  if ((position.y > height) || (position.y < 0)){
    velocity.y *= -1;
  }

  //display circle at new position
  ellipse(position.x, position.y, 50,50);

}


function mousePressed(){

}



///////////////////////////
////SETUP and CONFIG
///////////////////////////
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
//////////////////////////////







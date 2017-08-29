var PAGE_TITLE = "noc_p5_gungfu-01_vectors-05-mag";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:
[ ] create the vect sub example
[ ] mult by a scalar 
[ ] get magnitude
[ ] inform a secondary graph using the scalar.  convert the 2D pixel location to 1D scalar quantity
*/
////////////
//SET GLOBALS
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var CANVAS;
var BGND_COLOR    = 127;

var location;

function setup(){
  runBasicSetup(); 


}


function draw(){
  displayPageTitle();
  
  var mouse = createVector(mouseX, mouseY);
  var center= createVector(width/2, height/2);
  
  mouse.sub(center);
  mouse.mult(1.2);
  var mouseMagnitude = mouse.mag();
  println("mouseMagnitude= " + mouseMagnitude);
  
  fill(0);
  stroke(255);
  rect(0,INNER_HEIGHT-50,mouseMagnitude,50)
  
  

  translate(center.x, center.y);
  line(0,0,mouse.x,mouse.y);
  ellipse(mouse.x,mouse.y,mouseMagnitude*.3,mouseMagnitude*.3);

  
}


function mousePressed(){

}





////////////////////////////////////////////////////
////SETUP and CONFIG
////////////////////////////////////////////////////
function runBasicSetup() {
  CANVAS = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  CANVAS.position(0,0);
  smooth();
  displayPageTitle();
}

function displayPageTitle(){
  background(BGND_COLOR);
  //display PAGE_TITLE in CANVAS
  fill(255);
  stroke(0);
  textSize(18);
  text(PAGE_TITLE, width*.01, 40);
}
////END CONFIG
////////////////////////////////////////////////////







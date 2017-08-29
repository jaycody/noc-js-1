var pageTitle = "noc_p5_gungfu-02_vectors-04_mult";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:
[ ] recreate the vector subtraction example
[ ] mult the resulting vector by a scalar with mult() function
*/
////////////
//SET GLOBALS
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var CANVAS;
var BGND_COLOR   = 150;
var DEFAULT_FILL = 255;



function setup(){
  runBasicSetup(); 

}


function draw(){
  displayPageTitle();
  var mouse = createVector(mouseX, mouseY);
  var center = createVector((INNER_WIDTH/2), (INNER_HEIGHT/2));

  mouse.sub(center);

  mouse.mult(.5);

  translate(center.x, center.y)
  line(0,0, mouse.x, mouse.y);
  ellipse (mouse.x, mouse.y, 30,30);

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
  background(BGND_COLOR);      //clear CANVAS before draw
  //display pageTitle in CANVAS
  fill(DEFAULT_FILL);
  textSize(18);
  text(pageTitle, width*.01, 40);
}
////END CONFIG
////////////////////////////////////////////////////







var PAGE_TITLE = "noc_p5_gungfu-01_vectors-06_normalize";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:
[ ] subtract center from mouse location
[ ] normalize the mouse vector (reduce it to unit vector). keep its direction but normalize its magnitude

*/
////////////
//SET GLOBALS
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var CANVAS;
var BGND_COLOR    = 127;

var lesson;

function setup(){
  runBasicSetup(); 
  
  lesson = '/*\nmouse.sub(center)\nmouse.normalize\nmouse.mult(100)\n*/';

}


function draw(){
  displayPageTitle();

  var mouse = createVector(mouseX, mouseY);
  var center= createVector(INNER_WIDTH/2, INNER_HEIGHT/2);

  mouse.sub(center);

  mouse.normalize();
  mouse.mult(150);

  translate(center.x, center.y);
  line(0,0,mouse.x, mouse.y);
  text(lesson, mouse.x-20, mouse.y-20);
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
  //display PAGE_TITLE in CANVAS
  fill(255);
  textSize(18);
  text(PAGE_TITLE, width*.01, 40);
}
////END CONFIG
////////////////////////////////////////////////////







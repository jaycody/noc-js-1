var PAGE_TITLE = "noc_p5_gungfu-01_vectors-08_acceleration";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:
[ ] create the Mover object
[ ] add acceleration vector with constant acceleration
*/
////////////
//SET GLOBALS
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var CANVAS;
var BGND_COLOR    = 127;

var mover;
var lesson = "/*////CONSTANT ACCELERATION////\nthis.velocity.add(this.acceleration);\nthis.location.add(this.velocity);\nthis.velocity.limit(this.topSpeed);\n*/";

function setup(){
  runBasicSetup(); 
  
  //text(lesson, width*.1, height*.8);

  mover = new Mover();
}


function draw(){
  mover.update();
  mover.display();
  mover.checkBoundary();
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

  text(lesson, width*.01, height*.8);
}
////END CONFIG
////////////////////////////////////////////////////







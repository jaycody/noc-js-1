var PAGE_TITLE = "noc_p5_gungfu-01_vectors-09_rand_acceleration";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:
[x] create the Mover object
[ ] create random acceleration with the p5.Vector.random2D
*/
////////////
//SET GLOBALS
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var CANVAS;
var BGND_COLOR    = 127;
var LESSON = "/*////RANDOM ACCELERATION////\nthis.acceleration = p5.Vector.random2D();\nthis.velocity.add(this.acceleration);\nthis.location.add(this.velocity);\nthis.velocity.limit(this.topSpeed);\n*/";

var movers      = [];
var totalMovers = 10;

function setup(){
  runBasicSetup(); 
  
  for (var i = 0; i < totalMovers; i++){
    movers[i] = new Mover();
  }
}


function draw(){
  for (var i = 0; i < totalMovers; i++){
    movers[i].update();
    movers[i].display();
    movers[i].checkBoundary();
  }
}

function mousePressed(){
  background(BGND_COLOR);
  displayPageTitle();
  for (var i = 0; i < totalMovers; i++){
    movers[i] = new Mover();
  }
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
  text(LESSON, width*.01, height*.8);
}
////END CONFIG
////////////////////////////////////////////////////







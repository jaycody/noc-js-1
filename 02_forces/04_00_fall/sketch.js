var PAGE_TITLE = "noc_p5_gungfu-02_forces-04_attractor";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:

*/
////////////
//SET GLOBALS
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var CANVAS;
var BGND_COLOR    = 127;

var vehicles      = [];
var TOTAL_VEHICLES= 50;



function setup(){
  runBasicSetup(); 
  
  for (var i = 0; i < TOTAL_VEHICLES; i++){
    vehicles[i] = new Vehicle();
  }
}


function draw(){
  for (var i = 0; i < vehicles.length; i++){
    vehicles[i].applyPerlinForce();
    vehicles[i].display();
    vehicles[i].update();
  }
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







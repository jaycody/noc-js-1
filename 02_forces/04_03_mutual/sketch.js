var PAGE_TITLE = "noc_p5_gungfu-02_forces-04_03_mutual";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:

*/
////////////
//SET GLOBALS
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var CANVAS;
var BGND_COLOR    = 127;
var BGND_IS_ON    = true;


var vehicles       = [];
var TOTAL_VEHICLES = 25;

var attractor;
var attractors       = [];
var TOTAL_ATTRACTORS = 5

var wind;


function setup(){
  runBasicSetup(); 
  
  for (var i = 0; i < TOTAL_VEHICLES; i ++){
    vehicles[i] = new Vehicle();
  }
  
  for (var i = 0; i < TOTAL_ATTRACTORS; i ++){
    attractors[i] = new Attractor();
  }
  
}


function draw(){
  if (BGND_IS_ON){
    displayPageTitle();
  }
  
  wind = createVector(0,0);
  
  globalGravity = createVector(0,0);
  
  //vehicle.applyForce(gravity);
  
  
  for (var i = 0; i < vehicles.length; i++){
    //vehicles[i].applyForce(wind);
    //vehicles[i].applyForce(globalGravity);
    
    for (var j = 0; j < vehicles.length; j++){
      //don't calculate forces imposed on the self
      if (vehicles[i] != vehicles[j]){
        mutualAttraction = vehicles[j].attract(vehicles[i]);
        vehicles[i].applyForce(mutualAttraction);
      }
    }
    
    
    
    vehicles[i].update();
    vehicles[i].display();  
    vehicles[i].checkBoundaries();
    
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
  
  //textSize(14);
  var LESSON = "\
  /*\n\
  //////CALCULATE GRAVITATIONAL ATTRACTION//////\n\
  1. subtract location vectors\n\
  2. get distance\n\
  3. constrain distance\n\
  4. get strength\n\
  5. normalize\n\
  6. scale by strength\n\
  7. return force\n\
  */\n ";

  text(LESSON, width*.01, height*.6);
}
////END CONFIG
////////////////////////////////////////////////////







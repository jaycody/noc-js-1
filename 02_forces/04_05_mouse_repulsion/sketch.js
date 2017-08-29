var PAGE_TITLE = "noc_p5_gungfu-02_forces-04_05_mouse_repulsion";

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
var TOTAL_VEHICLES = 45;
var mutualRepulsion = true;

var attractor;
var attractors       = [];
var TOTAL_ATTRACTORS = 2;


var windLeft;
var windRight;
var globalG;
var globalUp;

var mouse;


function setup(){
  runBasicSetup(); 
  
  for (var i = 0; i < TOTAL_VEHICLES; i ++){
    vehicles[i] = new Vehicle(i);
  }
  
  for (var i = 0; i < TOTAL_ATTRACTORS; i ++){
    attractors[i] = new Attractor();
  }
  
}


function draw(){
  if (BGND_IS_ON){
    displayPageTitle();
  }
  
  windLeft    = createVector(25,0);
  windRight   = createVector(-25,0);
  globalG = createVector(0,25);
  globalUp = createVector(0,-25);
  mouse   = createVector(mouseX, mouseY);
  
  // for each vehicle calculate attraction from ALL others - NESTED LOOP
  for (var i = 0; i < vehicles.length; i++){
    //vehicles[i].applyForce(windLeft);
    //vehicles[i].applyForce(windRight);
    //vehicles[i].applyForce(globalG);
    //vehicles[i].applyForce(globalUp);
    for (var j = 0; j < vehicles.length; j++){
      //don't calculate forces imposed on the self
      if (vehicles[i] != vehicles[j]){
        var mutualAttraction = vehicles[i].attract(vehicles[j]);
        vehicles[j].applyForce(mutualAttraction);
      }
    }

    
    
    
    vehicles[i].update();
    vehicles[i].display();  
    vehicles[i].checkBoundaries();
  }
  
  // for each attractor, calculate its attraction on all vehicles
  for (var i = 0; i < attractors.length; i++){
    for (var j = 0; j < vehicles.length; j++){
      var gravitationalForce = attractors[i].attract(vehicles[j]);
      vehicles[j].applyForce(gravitationalForce);
      /*
      var collectiveForce = vehicles[j].attract(attractors[i]);
      attractors[i].applyForce(collectiveForce);
      */
    }
    
    attractors[i].applyEasing(mouse);
    //attractors[i].arriveAt(mouse);
    attractors[i].update();
    attractors[i].display();
    attractors[i].checkBoundaries();
  }
}


function mousePressed(){
  //invert attraction forces for all vehicles
  for (var i = 0; i < TOTAL_VEHICLES; i ++){
    //print(vehicles[i].id + " " + vehicles[i].mutualRepulsion);
    vehicles[i].mutualRepulsion = !vehicles[i].mutualRepulsion;
  }
  
  
  //invert the attraction forces for all attractors
  for (var i = 0; i < attractors.length; i++){
    attractors[i].repulsionIsOn = !attractors[i].repulsionIsOn;
    //print("attractor " + attractors[i].repulsionIsOn);
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







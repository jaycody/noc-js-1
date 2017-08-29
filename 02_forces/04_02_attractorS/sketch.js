var PAGE_TITLE = "noc_p5_gungfu-02_forces-04_02_attractorS";

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
var TOTAL_VEHICLES= 10;

var attractor;
var attractors    = [];
var TOTAL_ATTRACTORS= 10;



function setup(){
  runBasicSetup(); 
  
  for (var i = 0; i < TOTAL_VEHICLES; i++){
    vehicles[i] = new Vehicle();
  }
  
  for (var i = 0; i < TOTAL_ATTRACTORS; i++){
    attractors[i] = new Attractor();
  }
  
  attractor = new Attractor();
}


function draw(){
  
  for (var i = 0; i < vehicles.length; i++){
    vehicles[i].applyPerlinForce();
    
    for (var j = 0; j < attractors.length; j++){
      attractors[j].display();
      var gravitationalForce = attractors[j].calculateAttraction(vehicles[i]);
      vehicles[i].applyForce(gravitationalForce);
    }
    
    
    vehicles[i].display();
    vehicles[i].update();
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
  //\n\
  //1. calculate the direction of the force (subtract attractor's position from vehicles)\n\
  //2. calc distance between the attractor and the vehicle\n\
  //3. limit the distance to eliminate extreme results\n\
  //4. normalize vector to get the direction of the force\n\
  //5. calculate the gravitational force magnitude\n\
  //6. get force vector --> (magnitude * direction)\n\
  //7. return the force\n\
  */\n ";

  text(LESSON, width*.01, height*.6);
}
////END CONFIG
////////////////////////////////////////////////////







var PAGE_TITLE = "noc_p5_gungfu-02_forces-00_apply_force";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
"Anytime we want to calculate a vector based on a rule or a formula, we need to compute two things: magnitude and direction." 
TODO:
[ ]create the apply force method
applyForce algorithm: 
    [ ]immediately account for each object's mass - call the static div for force and mass
    [ ]add the new force to ACCELERATION
    [ ]accumulate the forces from draw inside acceleration
    [ ]apply acceleration to velocity
[ ]transfer all of the current forces out of the mover class and into draw external to movers 

STEPS:
1. calculate the vector that points from the object ot the target location (mouse).
2. Normalize that vector (reducing it to length 1).
3. Scale that vector to an appropriate value (by multiplying it by some value)
4. Assign that vector to acceleration

          dir = p5.Vector.sub(mouse, location);         //COMPUTE DIRECTION with static refernce of sub()
          dir.normalize();                              //NORMALIZE (shrink it to the unit vector)
          dir.setMag(amount_to_accelerate);                //SCALE it up to desired distance
          acceleration = dir;                           //ACCELERATE 

          //PROCEED TO MOTION 101
          velocity.add(acceleration)
          velocity.limit(topspeed);
          location.add(velocity);
*/
////////////
//SET GLOBALS
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var CANVAS;
var BGND_COLOR    = 127;
var LESSON;

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
    
    ////////CREATE FORCES///////////
    var randStep = p5.Vector.random2D();
    var gravity = createVector(0,.1);

    ////////APPLY FORCES////////////
    //ADD random force 
    movers[i].applyForce(randStep);
    //ADD DOWNWARD FORCE 
    movers[i].applyForce(gravity);

    //MOTION 101
    movers[i].update();
    movers[i].display();
    movers[i].checkBoundary();
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
  textSize(14);
  var LESSON = "/*////Downward Force + Perlin + Rand////\naccumulate forces\napply net acceleration*/";

  text(LESSON, width*.01, height*.6);
}
////END CONFIG
////////////////////////////////////////////////////

////////////////////////////////////////////////////
///////RESET
function mousePressed(){
  background(BGND_COLOR);
  displayPageTitle();
  totalMovers = random(11);
  for (var i = 0; i < totalMovers; i++){
    movers[i] = new Mover();
  }
}
/////////////////////////////////////////////////////






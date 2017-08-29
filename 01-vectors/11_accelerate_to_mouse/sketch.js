var PAGE_TITLE = "noc_p5_gungfu-01_vectors-11_accelerate_to_mouse";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
"Anytime we want to calculate a vector based on a rule or a formula, we need to compute two things: magnitude and direction." 
TODO:
[ ] differentiate between the static and non-static use of vectors
[ ] calculate the acceleration vector that will move the Mover toward the mouse 
[ ] to caculcate acceleration toward mouse, find the DIRECTION and MAGNITUDE (toward where? and how far?)
[ ] the direction is the normalized version of the vector that points to the mouse and requires static method

STEPS:
1. calculate the vector that points from the object ot the target location (mouse).
2. Normalize that vector (reducing it to length 1).
3. Scale that vector to an appropriate value (by multiplying it by some value)
4. Assign that vector to acceleration

          dir = p5.Vector.sub(mouse, location);         //COMPUTE DIRECTION with static refernce of sub()
          dir.normalize();                              //NORMALIZE (shrink it to the unit vector)
          dir.mag(amount_to_accelerate);                //SCALE it up to desired distance
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
    movers[i].update();
    movers[i].display();
    //movers[i].checkBoundary();
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
  var LESSON = "/*////ACCELERATE TO MOUSE////\n//CALCULATE DIRECTION by subtracting location vector and target vector using static method of sub()\nvar dir = p5.Vector.sub(this.mouse, this.location);\n//NORMALIZE the direction vector\ndir.normalize();\n//SET MAGNITUDE as an acceleration force\ndir.setMag(this.thrust);\n//add perlin noise as force\nthis.acceleration.add(map(noise(this.perlinForce.x),0,1,-.2,.2), map(noise(this.perlinForce.y),0,1,-.2,.2));\n//APPLY ACCELERATION FORCE\nthis.acceleration = dir;\n//then MOTION 101\nthis.velocity.add(this.acceleration);\nthis.velocity.limit(this.topSpeed);\nthis.location.add(this.velocity);\n*/";

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






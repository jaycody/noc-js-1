var pageTitle = "noc_p5_gungfu-00-noise-02_06-perlin_ellipses";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:
[] create meridan objects
[] creat an array of meridian objects
[] generate a meridian line from each consecutive point to the next upon mouseclick
*/
////////////
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var backgroundColor = 0;
var walker;
var walkers = [];
var totalWalkers   = 0;

var noiseToUpdateSize = 0;
var noiseIncrement    = 0.001;
var mapBoundary;
//var isEllipse         = false;
var circlesPerClick   = 4;


function setup(){
  runBasicSetup();
  
  //initialize an array of walker objects
  for (var i = 0; i < totalWalkers ; i++){
    walkers[i] = new Walker(width/2, height/2);
  }
}

function draw(){
  //background(200);

  for (var i = 0; i < walkers.length; i++){
    walkers[i].colorize();
    walkers[i].update();
    walkers[i].display();
    //walkers[i].walk();
  }
}

//create Walker class
function Walker(x, y, isEllipse) {
  //set initial location
  this.x = x;
  this.y = y;
  
  //set rotation
  //this.theta = 0;

  //set initial shape (circle or ellipse)
  this.isEllipse = isEllipse;
  //////////////////
  // ellipse or circle
  //this.isEllipse          = true;

  // calculate the mapping boundary for diameter (How big can we make it w/o going over?)
  this.mapBoundary        = determineMapBoundary();
  
  // CREATE VECTORS for walkers's location and for the 2D noise which updates walker's location
  //this.location           = createVector(width/2, height/2);
  this.location           = createVector(this.x, this.y);  
  
  // vector for color and color noise offset
  this.colorVector        = createVector(random(255), random(255), random(255));
  this.strokeColorVector  = createVector(random(255), random(255), random(255));
  this.noiseToOffsetColor = createVector(random(255), random(255), random(255));
  this.incrementNoiseColor= createVector(random(.001, .01),random(.001, .01),random(.001, .01));//0.004;
  //this.incrementNoiseColor      = random(.01, .001); //.01;
  this.fillAlpha                = random(10,150);   //80;
  this.noiseToOffsetFillAlpha   = random(1,255);
  this.incrementNoiseFillAlpha  = random(.008, .00001);
  this.strokeAlpha              = random(1,255);
  this.noiseToOffsetStrokeAlpha = random(1,255);
  this.incrementNoiseStrokeAlpha= random(.009, .00001);//.008
  
  
  // vector for circle's size and vector for the noise to offset the size
  this.initialDiameter          = random(this.mapBoundary);
  this.circleSizeVector         = createVector(this.initialDiameter, this.initialDiameter);
  this.noiseToOffsetCircleSize  = createVector(random(this.mapBoundary),random(this.mapBoundary));
  this.incrementNoiseCircleSize = createVector(random(.00001, .003),random(.00001, .003));//0.004;

  //this.incrementNoiseCircleSize = random(.005, .00001);//0.004;
  this.circleSizeScalar         = random(-1.5,1.5);
  this.subScalar                = random(-.5,.5);
  //////////////////

  
  //calc the walkers changing color
  this.colorize = function(){
    //////////SET FILL 
    //calculate fill's noise transformation
    this.colorVector.x = map(noise(this.noiseToOffsetColor.x),0,1,0,255);
    this.colorVector.y = map(noise(this.noiseToOffsetColor.y),0,1,0,255);
    this.colorVector.z = map(noise(this.noiseToOffsetColor.z),0,1,0,255);
    //increment the noiseToOffsetColor
    //this.noiseToOffsetColor.add(this.incrementNoiseColor.x, this.incrementNoiseColor.y, this.incrementNoiseColor.z);
    this.noiseToOffsetColor.add(this.incrementNoiseColor);
    
    //////////SET STROKE's ALPHA and increment the noise
    //caclulate and map the strokeAlpha velocity from noise
    this.strokeAlpha   = map(noise(this.noiseToOffsetStrokeAlpha),0,1,0,50);
    //increment the strokeAlpha noise
    this.noiseToOffsetStrokeAlpha += this.incrementNoiseStrokeAlpha;

    /////////SET FILL's ALPHA and incrmement the noise
    //calculate fillAlpha map to noise offset
    this.fillAlpha     = map(noise(this.noiseToOffsetFillAlpha),0,1,0,8);
    //incrementNoise for fillAlpha
    this.noiseToOffsetFillAlpha += this.incrementNoiseFillAlpha;
  
    //update the fill and stroke
    strokeWeight(1);
    stroke(0, this.strokeAlpha);
    fill(this.colorVector.x, this.colorVector.y, this.colorVector.z,this.fillAlpha);
  };
  
  //calc the walkers changing size
  this.update = function(){
    // calc the noise to change circleSize and map it mapBoundary (max circle size)
    this.circleSizeVector.x = map(noise(this.noiseToOffsetCircleSize.x),0,1,-this.mapBoundary,this.mapBoundary);
    
    ///// ellipses or circles
    if (this.isEllipse) {
      this.circleSizeVector.y = map(noise(this.noiseToOffsetCircleSize.y),0,1,-this.mapBoundary,this.mapBoundary);
    } else {
    this.circleSizeVector.y = this.circleSizeVector.x;
    }
    
    //scale the circle's diameter
    this.circleSizeVector.x *= this.circleSizeScalar;
    this.circleSizeVector.y *= this.circleSizeScalar;

    // use vector add to increment the noise for changing the circle size
    //this.noiseToOffsetCircleSize.add(this.incrementNoiseCircleSize.x, this.incrementNoiseCircleSize.y);
    this.noiseToOffsetCircleSize.add(this.incrementNoiseCircleSize);
  };
  
  this.display = function(){

    //SCALE THE EDGE CIRCLES
    var subDiameterX = this.circleSizeVector.x*this.subScalar;
    var subDiameterY = this.circleSizeVector.y*this.subScalar;
    
  
    /*//SET FLIP POINT FOR EDGE CIRCLES
    //var widthAdjust = width*.15;
    var widthAdjust = mouseX;
    var heightAdjust = mouseY; */
  
    //DRAW LEFT/RIGHT CIRCLES
    //ellipse(this.circleSizeVector.x+(widthAdjust), this.location.y, subDiameterX, subDiameterY);
    //ellipse((width-this.circleSizeVector.x)-(widthAdjust), this.location.y, subDiameterX, subDiameterY);
  
    //DRAW TOP/BOTTOM CIRCLES
    //ellipse(this.location.x, this.circleSizeVector.y+(heightAdjust), subDiameterX, subDiameterY);
    //ellipse(this.location.x, (height-this.circleSizeVector.y)-(heightAdjust), subDiameterX, subDiameterY);
    
    //strokeWeight(0);
    //ellipse((width/2) + this.circleSizeVector.x, (height/2)+this.circleSizeVector.x, //this.circleSizeVector.x*.2, this.circleSizeVector.y*.2);
    
    //ellipse(mouseX, this.location.y, (this.circleSizeVector.x)*.5, (this.circleSizeVector.y)*.5);
    //ellipse(width-mouseX, this.location.y, (this.circleSizeVector.x)*.5, (this.circleSizeVector.y)*.5);
    
    //DRAW CENTER CIRCLE  
    ellipse(this.location.x, this.location.y, this.circleSizeVector.x, this.circleSizeVector.y);
  };

  this.walk = function(){
    //calculate 2D noise, map the 0-1 results to screen dimensions, then update the walker's position
    //this.location.x = map(noise(this.noiseOffset.x), 0, 1, 0, width);
    //this.location.y = map(noise(this.noiseOffset.y), 0, 1, 0, height);

    //then increment the noise vector by using vector math's ADD function
    //this.noiseOffset.add(0.01, 0.01, 0);
  };
  
}
function mousePressed(){
  //isEllipse = !isEllipse;

  //use the push function on the array to add a new walker
  for (var i = 0; i < circlesPerClick; i++){
    walkers.push(new Walker(mouseX, mouseY, true)); //floor(random(2)))
  }  
}

function determineMapBoundary(){
  //determine the max diamater boundary  
  if (INNER_WIDTH > INNER_HEIGHT) {
    mapBoundary = INNER_HEIGHT;
  } else {
    mapBoundary = INNER_WIDTH;
  }
 return mapBoundary;
}

///////////////////////////
////SETUP and CONFIG
///////////////////////////
function runBasicSetup() {
  canvas = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  canvas.position(0,0);
  background(backgroundColor);
  smooth();
  displayPageTitle();
}

function displayPageTitle(){
  //display in canvas
  fill(255);
  //stroke(0,200);
  //strokeWeight(0);
  textSize(18);
  text(pageTitle, width*.01, 40);
}







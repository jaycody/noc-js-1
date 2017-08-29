var pageTitle = "noc_p5_gungfu-00-noise-02_03-perlin_circles";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:
[] calculate 1D perlin noise for the size of an ellipse
[] add an array of walkers, and add to the array upon mouseclick
*/

////////////
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var walker;
var walkers = [];
var totalWalkers   = 1;

var noiseToUpdateSize = 0;
var noiseIncrement    = 0.001;
var mapBoundary;
var isEllipse         = false;


function setup(){
  runBasicSetup();
  
  //determine shape (circle or ellipse)
  isEllipse = floor(random(2));
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
function Walker(x, y) {
  //////////////////
  // ellipse or circle
  //this.isEllipse          = true;
  // calculate the mapping boundary for diameter
  this.mapBoundary        = determineMapBoundary();
  
  // CREATE VECTORS for walkers's location and for the 2D noise which updates walker's location
  //this.location           = createVector(width/2, height/2);
  this.location           = createVector(x, y);  
  
  // vector for color and color noise offset
  this.colorVector        = createVector(random(255), random(255), random(255));
  this.noiseToOffsetColor = createVector(random(255), random(255), random(255));
  this.incrementNoiseColor  = random(.1, .001); //.01;
  this.fillAlpha            = random(10,80);//random(40,110);   //80;
  
  // vector for circle's size and vector for the noise to offset the size
  this.initialDiameter          = random(this.mapBoundary);
  this.circleSizeVector         = createVector(this.initialDiameter, this.initialDiameter);
  this.noiseToOffsetCircleSize  = createVector(random(this.mapBoundary),random(this.mapBoundary));
  this.incrementNoiseCircleSize = random(.008, .00001);//0.004;
  this.circleSizeScalar         = random(-1.5,1.5);
  //////////////////

  
  //calc the walkers changing color
  this.colorize = function(){
    //calculate fill's noise transformation
    this.colorVector.x = map(noise(this.noiseToOffsetColor.x),0,1,0,255);
    this.colorVector.y = map(noise(this.noiseToOffsetColor.y),0,1,0,255);
    this.colorVector.z = map(noise(this.noiseToOffsetColor.z),0,1,0,255);
    
    //increment the noiseToOffsetColor
    this.noiseToOffsetColor.add(this.incrementNoiseColor, this.incrementNoiseColor, this.incrementNoiseColor);
    
    /*
    //calculate fill's alpha
    //calculate stroke, strokeWeight, and alpha
    //stroke();
    //strokeWeight();
    */

    //update the fill
    fill(this.colorVector.x, this.colorVector.y, this.colorVector.z,this.fillAlpha);
};
  
  //calc the walkers changing size
  this.update = function(){
    // calc the noise to change circleSize and map it mapBoundary (max circle size)
    this.circleSizeVector.x = map(noise(this.noiseToOffsetCircleSize.x),0,1,-this.mapBoundary,this.mapBoundary);
    
    ///// ellipses or circles
    if (isEllipse) {
      this.circleSizeVector.y = map(noise(this.noiseToOffsetCircleSize.y),0,1,-this.mapBoundary,this.mapBoundary);
    } else {
    this.circleSizeVector.y = this.circleSizeVector.x;
    }
    
    //scale the circle's diameter
    this.circleSizeVector.x *= this.circleSizeScalar;
    this.circleSizeVector.y *= this.circleSizeScalar;

    // increment the noise for changing the circle size
    this.noiseToOffsetCircleSize.add(this.incrementNoiseCircleSize, this.incrementNoiseCircleSize, this.incrementNoiseCircleSize);

    
    


}
  
  this.display = function(){
    //calculate noise transformation of size
    // get a noise value from the noiseToUpdateSize and store it as the new diameter
    //var rawNoise = noise(noiseToUpdateSize);
    // map the raw noise to the width of screen.  Use the mapBoundary calculated in setup
    //var diameter = map(rawNoise, 0, 1, 0, mapBoundary);
    // increment the noise needed to update the size by adding noiseIncrement
    //noiseToUpdateSize += noiseIncrement;
    //draw an ellipse with the new diameter
    //fill(this.colorVector.x, this.colorVector.y, this.colorVector.z, this.fillAlpha);
    ellipse(this.location.x, this.location.y, this.circleSizeVector.x, this.circleSizeVector.y);
    
    //fill(this.colorVector.y, this.colorVector.z, this.colorVector.x,40);
    //ellipse(this.location.x, this.location.y, 300-diameter*.3, 300-diameter*.3);
  
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
  //walkers.push(new Walker(mouseX, mouseY));
  walkers.push(new Walker(width/2, height/2));
  
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
  background(120);
  smooth();
  displayPageTitle();
}

function displayPageTitle(){
  //display in canvas
  fill(255);
  //stroke(0,1);
  //strokeWeight(0);
  textSize(18);
  text(pageTitle, width*.01, 40);
}







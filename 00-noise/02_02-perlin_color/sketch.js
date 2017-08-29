/* noc_p5_gungfu-00-noise-02_02-perlin_color

**from Nature of Code examples - shiffman**


TODO:
[] calculate 1D perlin noise for the size of an ellipse
[] add an array of walkers, and add to the array upon mouseclick
*/

////////////
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var pageTitle = "noc_p5_gungfu-00-noise-02_02-perlin_color";
var walker;

var noiseToUpdateSize = 0;
var noiseIncrement    = 0.01;
var mapBoundary;


function setup(){
  runBasicSetup();
  
  
  
  walker  = new Walker(mapBoundary);
  //walker2  = new Walker(mapBoundary);

  

}

function draw(){
  //background(200);
  walker.colorize();
  walker.walk();
  walker.render();
  //walker2.colorize();
  //walker2.walk();
  //walker2.render();
}

//create Walker class
function Walker() {
  // calculate the mapping boundary for diameter
  //      - no wider or higher than whichever is smallest, width or height
  this.mapBoundary = determineMapBoundary();
  
  /////////
  // CREATE VECTORS for walkers's location and for the 2D noise which updates walker's location
  this.location         = createVector(width/2, height/2);  
  this.colorVector      = createVector(random(255), random(255), random(255));
  this.noiseOffsetColor = createVector(random(255), random(255), random(255));

  this.colorize = function(){
    // fill with current color vector
    
    //calculate the 3D noise transformation of the fill
    this.colorVector.x = map(noise(this.noiseOffsetColor.x),0,1,0,255);
    this.colorVector.y = map(noise(this.noiseOffsetColor.y),0,1,0,255);
    this.colorVector.z = map(noise(this.noiseOffsetColor.z),0,1,0,255);

    this.noiseOffsetColor.add(0.01, 0.01, 0.01);

    //fill(this.colorVector.x, this.colorVector.y, this.colorVector.z);
    //print("x =" + this.colorVector.x + " y = " + this.colorVector.y );
};

  this.render = function(){
    //calculate noise transformation of size
    // get a noise value from the noiseToUpdateSize and store it as the new diameter
    var rawNoise = noise(noiseToUpdateSize);
    // map the raw noise to the width of screen.  Use the mapBoundary calculated in setup
    var diameter = map(rawNoise, 0, 1, 0, mapBoundary);
    // increment the noise needed to update the size by adding noiseIncrement
    noiseToUpdateSize += noiseIncrement;
    //draw an ellipse with the new diameter

    fill(this.colorVector.x, this.colorVector.y, this.colorVector.z,10);
    ellipse(this.location.x, this.location.y, diameter, diameter);
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
  background(0);
  smooth();
  displayPageTitle();
}

function displayPageTitle(){
  //display in canvas
  fill(255);
  strokeWeight(0);
  textSize(18);
  text(pageTitle, width*.01, 40);
}







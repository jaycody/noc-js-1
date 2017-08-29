/* noc_p5_gungfu-00-noise-02_00-perlin_1D

**from Nature of Code examples - shiffman**


TODO:
[] calculate 1D perlin noise for the size of an ellipse
*/

////////////
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var pageTitle = "noc_p5_gungfu-00-noise-02_00-perlin_1D";
var walker;

var noiseToUpdateSize = 0;
var noiseIncrement    = 0.01;
var mapBoundary;


function setup(){
  canvas = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  canvas.position(0,0);
  smooth();
  displayPageTitle();
    
  //determine the max diamater boundary  
  if (INNER_WIDTH > INNER_HEIGHT) {
    mapBoundary = INNER_HEIGHT;
  } else {
    mapBoundary = INNER_WIDTH;
  }


  walker  = new Walker(mapBoundary);

  

}

function draw(){
  background(0);
  walker.walk();
  walker.render();
  displayPageTitle();
}

//create Walker class
function Walker(mapBoundary) {
  this.mapBoundary = mapBoundary;
  /////////
  // CREATE VECTORS for walkers's location and for the 2D noise which updates walker's location
  this.location = createVector(width/2, height/2);  
  this.noiseOffset = createVector(random(1000), random(1000));

  
  this.render = function(){
    // get a noise value from the noiseToUpdateSize and store it as the new diameter
    var rawNoise = noise(noiseToUpdateSize);
    
    // map the raw noise to the width of screen.  Use the mapBoundary calculated in setup
    var diameter = map(rawNoise, 0, 1, 0, mapBoundary);
    
    // increment the noise needed to update the size by adding noiseIncrement
    noiseToUpdateSize += noiseIncrement;

    //draw an ellipse with the new diameter
    ellipse(this.location.x, this.location.y, diameter, diameter);
    
  };

  this.walk = function(){
    //calculate 2D noise, map the 0-1 results to screen dimensions, then update the walker's position
    //this.location.x = map(noise(this.noiseOffset.x), 0, 1, 0, width);
    //this.location.y = map(noise(this.noiseOffset.y), 0, 1, 0, height);

    //then increment the noise vector by using vector math's ADD function
    this.noiseOffset.add(0.01, 0.01, 0);
    
    
    
  };
}

function displayPageTitle(){
  //display in console
  //println(pageTitle);
  //println('');
  //display in canvas
  fill(255);
  strokeWeight(0);
  textSize(18);
  text(pageTitle, width*.01, 40);
}







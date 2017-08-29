/* noc_p5_gungfu-00-noise-02_01-simple_perlin_walk

**from Nature of Code examples - shiffman**


TODO:
[x] add the createVector function to the Walker object constructor
[x] use createVector function for location and noiseOffset
[x] calculate 2D noise of the noiseOffset vector
[x] update the walker location with the noiseOffset vector 
[x] use vector's add function to update the noiseOffset vector with specified amount after each draw
*/

////////////
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var pageTitle = "noc_p5_gungfu-00-noise-02_01-simple_perlin_walk";

var walker;
var backgoundColor;


function setup(){
  canvas = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  canvas.position(0,0);
  smooth();
  background(0);
  displayPageTitle();
  
  walker  = new Walker();

}

function draw(){
  walker.walk();
  walker.render();
}

//create Walker class
function Walker() {
  /////////
  // CREATE VECTORS for walkers's location and for the 2D noise which updates walker's location
  this.location = createVector(width/2, height/2);  
  this.noiseOffset = createVector(random(1000), random(1000));

  
  this.render = function(){
    ellipse(this.location.x, this.location.y, 10, 10);
    
  };

  this.walk = function(){
    //calculate 2D noise, map the 0-1 results to screen dimensions, then update the walker's position
    this.location.x = map(noise(this.noiseOffset.x), 0, 1, 0, width);
    this.location.y = map(noise(this.noiseOffset.y), 0, 1, 0, height);

    //then increment the noise vector by using vector math's ADD function
    this.noiseOffset.add(0.01, 0.01, 0);
  
  };
}

function displayPageTitle(){
  //display in console
  println(pageTitle);
  println('');
  //display in canvas
  fill(255);
  strokeWeight(0);
  textSize(18);
  text(pageTitle, width*.01, 40);
}







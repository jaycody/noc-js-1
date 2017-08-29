/* noc_p5_gungfu-00-noise-01-perlin_1D_walk

**from Nature of Code examples - shiffman**


TODO:
[x] deploy the location vector
[x] add the createVector function to the Walker object constructor
[ ] add the noise-offset vector (1D)
[ ] add the perlin-ness
[ ] create an array of walkers
[ ] remove top left stats
*/

////////////
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var pageTitle = "noc_p5_gungfu-00-noise-02-perlin_walk";
var h2;

var walker;
var choice;
var c1,c2,c3,c4;
var backgoundColor;
var theta;


function setup(){
  canvas = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  canvas.position(0,0);
  smooth();
  backgoundColor = (random(90));
  background(backgoundColor);
  displayPageTitle();
  
  walker  = new Walker();
  walker2  = new Walker();
  walker3  = new Walker();
  walker4  = new Walker();
  
  theta   = .01;
}

function draw(){
  
  strokeWeight(0);
  fill(walker.c4,walker.c3,walker.c2,1); 
  //fill(random(255),random(255),random(255),1);
  beginShape();
  vertex(walker.location.x, walker.location.y);
  vertex(walker2.location.x, walker2.location.y);
  vertex(walker3.location.x, walker3.location.y);
  vertex(walker4.location.x, walker4.location.y);
  endShape(CLOSE);

  walker.walk();
  walker.render();

  walker2.walk();
  walker2.render();

  walker3.walk();
  walker3.render();

  walker4.walk();
  walker4.render();

}

//create Walker class
function Walker() {
  this.location = createVector(width/2, height/2);
  this.noiseOffset = createVector(random(1000), random(1000));
  this.noiseOffsetSize = (Math.round(random(-20,30))/1700); //17 was a goood number 25
  
  this.walkerWidth  = Math.round(random(-40,40));
  this.walkerHeight = Math.round(random(-40,40));
  this.stepSize     = Math.round(random(-20,30)); //17 was a goood number 25
  
  this.c1           = Math.round(random(0,255));
  this.c2           = Math.round(random(0,255));
  this.c3           = Math.round(random(0,255));
  this.c4           = Math.round(random(0,255));
  

  this.strokeSize   = Math.round(random(-6,10));
  this.strokeAlpha  = Math.round(random(0,25));

  this.theta = 0.1;
  
  
  println("fill (" + this.c1 + "," + this.c2 + "," + this.c3 + "," + this.c4 + ")");
  println("strokeWeight (" + this.strokeSize + ")");
  println('stroke (' + this.c2 + ',' + this.c3 + ',' + this.c4 + ',' + this.c1 + ')');
  println('stepSize:' + this.stepSize);
  println('PVector location.x: ' + this.location.x);
  println('PVector location.y: ' + this.location.y);
  println("");
  
  this.render = function(){
    fill(this.c1,this.c2,this.c3,this.c4);
    stroke(this.c2,this.c3,this.c4,this.strokeAlpha);
    //stroke(this.c2,this.c3,this.c4,this.c1);
    strokeWeight(this.strokeSize);
    ellipse(this.location.x, this.location.y,this.walkerWidth,this.walkerHeight);
    
  };

  this.walk = function(){
    //update location with noiseOffset as a change in velocity
    this.location.x = map(noise(this.noiseOffset.x), 0, 1, 0, width);
    this.location.y = map(noise(this.noiseOffset.y), 0, 1, 0, height);

    //then update the noiseOffset quantity
    this.noiseOffset.add(this.noiseOffsetSize, this.noiseOffsetSize, 0);
    
    

    constrain (this.location.x, 0, width);
    constrain (this.location.y, 0, height);
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







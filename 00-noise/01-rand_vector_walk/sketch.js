/* noc_p5_gungfu-00-noise-01-vector_walk

**from Nature of Code examples - shiffman**

[x] deploy the location vector
[x] add the createVector function to the Walker object constructor
[x] add the perlin-ness
[ ] create an array of walkers
[x] remove top left stats
*/

////////////
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var pageTitle = "noc_p5_gungfu-00-noise-01-vector_walk";
var h2;

var walker;
var choice;
var c1,c2,c3,c4;
var backgoundColor;

function setup(){
  canvas = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  canvas.position(0,0);
  smooth();
  backgoundColor = (random(155));
  background(backgoundColor);
  displayPageTitle();
  
  walker  = new Walker();

}

function draw(){
  walker.walk();
  walker.render(); // +.12 for more
}

//create Walker class
function Walker() {
  this.location = createVector(width/2, height/2);
  //this.x = width/2;
  //this.y = height/2;
  this.walkerWidth  = Math.round(random(-40,40));
  this.walkerHeight = Math.round(random(-40,40));
  this.stepSize     = Math.round(random(-20,30)); //17 was a goood number 25
  this.c1           = Math.round(random(0,255));
  this.c2           = Math.round(random(0,255));
  this.c3           = Math.round(random(0,255));
  this.c4           = Math.round(random(0,255));
  //this.strokeSize   = 0;
  this.strokeSize   = Math.round(random(-6,10));
  this.strokeAlpha  = Math.round(random(0,25));
  
  
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
    choice = floor(random(4));
    //println (choice);
    if (choice === 0){
      this.location.x += this.stepSize;
    } else if (choice === 1){
      this.location.x -= this.stepSize;
    } else if (choice === 2){
      this.location.y += this.stepSize;
    } else {
      this.location.y -= this.stepSize;
    }
    this.location.x = constrain(this.location.x, 0, width-1);
    this.location.y = constrain(this.location.y, 0, height-1);

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







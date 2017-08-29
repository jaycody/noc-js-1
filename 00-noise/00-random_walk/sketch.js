/* noc_p5_gungfu-00-noise-00-rand_walk

**from Nature of Code examples - shiffman**


[x] random function
[x] Walker class
[x] movement in 4 directions
[x] multiple Walker objects
*/

////////////
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var pageTitle = "noc_p5_gungfu-00-noise-00-rand_walk";
var h2;

var walker;
var choice;
var c1,c2,c3,c4;
var backgoundColor;

function setup(){
  h2     = createElement('h2', pageTitle);
  println(pageTitle);
  println('');
  canvas = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  canvas.position(0,0);
  walker  = new Walker();
  walker2 = new Walker();
  walker3 = new Walker();
  walker4 = new Walker();
  walker5 = new Walker();
  walker6 = new Walker();
  backgoundColor = (random(155));
  background(backgoundColor);
  smooth();
  //background(140);
}

function draw(){
  
  strokeWeight(0);
  fill(walker.c4,walker.c3,walker.c2,1);
  //fill(random(255),random(255),random(255),1);
  beginShape();
  vertex(walker.x, walker.y);
  vertex(walker2.x, walker2.y);
  vertex(walker3.x, walker3.y);
  vertex(walker4.x, walker4.y);
  vertex(walker5.x, walker5.y);
  vertex(walker6.x, walker6.y);

  endShape(CLOSE);

  walker.step();
  walker.render(.26);
  walker.displayStats();
  
  walker2.step();
  walker2.render(.38);
  walker2.displayStats();

  walker3.step();
  walker3.render(.50);
  walker3.displayStats();
  
  walker4.step();
  walker4.render(.62);
  walker4.displayStats();

  walker5.step();
  walker5.render(.74);
  walker5.displayStats();

  walker6.step();
  walker6.render(.86);
  walker6.displayStats();

  //slow fadeout
  //fill(0,10);
  //rect(0,0,INNER_WIDTH, INNER_HEIGHT);
  /*
  line(walker.x, walker.y, walker4.x, walker4.y );
  line(walker2.x, walker2.y, walker4.x, walker4.y );
  line(walker3.x, walker3.y, walker4.x, walker4.y );
  */
}

//create Walker class
function Walker() {
  this.x = width/2;
  this.y = height/2;
  this.walkerWidth  = Math.round(random(-40,40));
  this.walkerHeight = Math.round(random(-40,40));
  this.stepSize     = Math.round(random(-30,30)); //17 was a goood number 25
  this.c1           = Math.round(random(0,255));
  this.c2           = Math.round(random(0,255));
  this.c3           = Math.round(random(0,255));
  this.c4           = Math.round(random(0,255));
  //this.strokeSize   = 0;
  this.strokeSize   = Math.round(random(-10,10));

  
  println("fill (" + this.c1 + "," + this.c2 + "," + this.c3 + "," + this.c4 + ")");
  println("strokeWeight (" + this.strokeSize + ")");
  println('stroke (' + this.c2 + ',' + this.c3 + ',' + this.c4 + ',' + this.c1 + ')');
  println("");
  
  this.render = function(heightScale){
    this.heightScale = heightScale;
    fill(this.c1,this.c2,this.c3,this.c4);
    stroke(this.c2,this.c3,this.c4,20);
    //stroke(this.c2,this.c3,this.c4,this.c1);
    strokeWeight(this.strokeSize);
    ellipse(this.x, this.y,this.walkerWidth,this.walkerHeight);
    
    //display a single walker under the stats
    fill(backgoundColor);
    stroke(255);
    strokeWeight(1);
    rectMode(CENTER);                       //make it easier to target these
    rect(60,height*this.heightScale, 100, 100);   //width*.07
    rectMode(CORNER);                      //reset back to the default
    fill(this.c1,this.c2,this.c3,this.c4);
    stroke(this.c2,this.c3,this.c4,this.c1);
    strokeWeight(this.strokeSize);
    ellipse(60,height*this.heightScale,this.walkerWidth*2, this.walkerHeight*2); // display walker under stats
    
    
  };

  this.step   = function(){
    choice = floor(random(4));
    //println (choice);
    if (choice === 0){
      this.x += this.stepSize;
    } else if (choice === 1){
      this.x -= this.stepSize;
    } else if (choice === 2){
      this.y += this.stepSize;
    } else {
      this.y -= this.stepSize;
    }
    this.x = constrain(this.x, 0, width-1);
    this.y = constrain(this.y, 0, height-1);
  };

  this.displayStats = function(){
    fill(0);
    rect(0,25,160,65);
    rect(0,100,120,30);
    rect(0,135,170,30); //fill background
    rect(0,170,115,30); //walker width and height
    

    fill(255);
    textSize(22);
    text("this.x: " + this.x, width*.01, 50);
    text("this.y: " + this.y, width*.01, 80);
    
    textSize(16);
    text("stepSize: " + this.stepSize, width*.01, 120);
    text("fill (" + this.c1 + "," + this.c2 + "," + this.c3 + "," + this.c4 + ")", width*.01, 155);
    text("w: " + this.walkerWidth + "  h: " + this.walkerHeight, width*.01, 190);
    
  };
}







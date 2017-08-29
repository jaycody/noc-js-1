/* noc_p5_gungfu-01-vectors-01-bounce_no_vect

**from Nature of Code examples - shiffman**


TODO:
[ ] store canvas in a variable
    [ ] declare canvas
    [ ] in setup, call createCanvas and store in 'canvas'
    [ ] call position on canvas
[ ] create a h1 header and fill with pageTitle 
*/

////////////
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var pageTitle = "noc_p5_gungfu-01-vectors-01-bounce_no_vect";
var h2;
var ballDiameter = 35;
var randomSeedNum;
var color1;
var color2;
var color3;

var locX;
var locY;

var velocityX;
var velocityY;

function setup() {
  h2 = createElement('h2', pageTitle );
  canvas = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  canvas.position(50,50);

  randomSeedNum = random(width);
  randomSeed(randomSeedNum);
  
  velocityX = random(1,20);
  velocityY = random(1,20);

  locX = width/2;
  locY = height/2;
  
  color1 = random(0,255);
  color2 = random(0,255);
  color3 = random(0,255);

}


function draw() {
//background(150,10,190);




//add speed to position
  locX += velocityX;
  locY += velocityY;
  
  
  fill(0);
  rect(width*.003,25,285,65);
  rect(width*.003,160,250,50);
  
  fill(255);
  textSize(22);
  text("locX: " + locX, width*.01, 50);
  text("locY: " + locY, width*.01, 80);
  
  textSize(15);
  text("velocityX: " + velocityX, width*.01, 180);
  text("velocityY: " + velocityY, width*.01, 200);
  

//set boundary conditions
  
  if ((locX > width - ballDiameter) || (locX < 0 + ballDiameter)){
    velocityX *= -1;
  }

  if ((locY > height - ballDiameter) || (locY < 0 + ballDiameter)){
    velocityY *= -1;
  }


  stroke(color1,color2,color3);
  strokeWeight(2);
  fill(color2);
  ellipse (locX, locY, ballDiameter,ballDiameter);

  
  strokeWeight(0);
  fill(255);
  ellipse (width*.5, height*.1, ballDiameter*2+10,ballDiameter*2+10);

  fill(color2);
  strokeWeight(6);
  ellipse (width*.5, height*.1, ballDiameter*2,ballDiameter*2);
  }






/*
// Example 1-1: Bouncing Ball, no vectors
var x = 100;
var y = 100;
var xspeed = 2.5;
var yspeed = 2;

function setup() {
  h2 = createElement('h2', pageTitle );
  canvas = createCanvas(640, 360);
  canvas.position(50,50);
}

function draw() {
  background(51);

  // Add the current speed to the position.
  x = x + xspeed;
  y = y + yspeed;

  if ((x > width) || (x < 0)) {
    xspeed = xspeed * -1;
  }
  if ((y > height) || (y < 0)) {
    yspeed = yspeed * -1;
  }

  // Display circle at x position
  stroke(0);
  strokeWeight(2);
  fill(127);
  ellipse(x, y, 48, 48);
}
*/
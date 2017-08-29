/* noc_p5_gungfu-00-noise-03-rand_graph
from The Nature of Code p5.js examples by Daniel Shiffman
https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js

TODO:
[] create graph dipicting random distribution
[] create an array of length 20 and initialize each index with 0
[] create a var for the highest index
[] use rand function to select 1 of the 20 indecies 
[] increment the value associate with that index (initialized at 0)
[] draw bar graph 
[] set the width of each bar to the result of the division of the screen width by the highest index  w = width/index
[] draw the bars such that they start at y=hieght and grow by moving up (screenheigh--), and long (rect height ++)
*/

////////////
////////////
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var pageTitle = "noc_p5_gungfu-00-noise-03-rand_graph";

var total = 40;
var randomCounts = [];
var growScale = 15;

function setup(){
  runBasicSetup();
  
  //initialize the randomCounts array with all ZEROs
  for (var i = 0; i < total; i++){
    randomCounts[i] = 0;
  }
  
}

function draw(){
  //populate the randomCounts array with a random num between 0-20
  var index = floor(random(total));
  randomCounts[index]++;
  
  //calculate possible colors as a function of the total options
  var gradient = 255/randomCounts.length;
  
  
  //soften the strobe effect
  fill(gradient*index,20);
  rect(0, 0, width, height);
  fill(gradient*index,2);
  rect(0, 0, width, height);

  //draw the graph
  var w = width/randomCounts.length;
  
  
  for (var x = 0; x < randomCounts.length; x++){
    fill(x*gradient);
    
    //return to begining if bar exceeds boundary
    if (randomCounts[x]*growScale > height+growScale) {
      randomCounts[x] = 0;
    }
      
    rect(x*w, height-randomCounts[x]*growScale, w-1, randomCounts[x]*growScale);
    
  }
  
  displayPageTitle();
}


///////////////////////////
////SETUP and CONFIG
///////////////////////////
function runBasicSetup() {
  canvas = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  canvas.position(0,0);
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







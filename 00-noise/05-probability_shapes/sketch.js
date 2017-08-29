/* noc_p5_gungfu-00-noise-05-probability_shapes
from The Nature of Code p5.js examples by Daniel Shiffman
https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js

TODO:
[] customize probability using the 2-random number method
[] compare 2nd pick to square, cubed of first pick

[] create graph of custom probability

[] draw bar graph 
[] set the width of each bar to the result of the division of the screen width by the highest index  w = width/index
[] draw the bars such that they start at y=hieght and grow by moving up (screenheigh--), and long (rect height ++)

[] create slider controls for standard deviation
[] create slider controls for adjusting the mean
*/

////////////
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var canvas;
var pageTitle = "noc_p5_gungfu-00-noise-05-probability_shapes";

var total = 30;
var randomCounts = [];

var growConstant = 20;
var growScale = growConstant;


var selectShape = 0;
var count       = 0;
var numOfShapes = 7;
var shapeName   = "";


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
  var threshold = floor(random(total));
  
  //calculate possible colors as a function of the total options
  var gradient = 255/randomCounts.length;

  //calc the graph
  var w = width/randomCounts.length;


  // select shape of probability
  if (selectShape === 0) {
    growScale = growConstant;
    shapeName = "random distribution";
    randomCounts[index]++;
    drawRectSoftner(gradient, index);
  } else if (selectShape === 1){  
    // linear threshold. will tend toward more black
    growScale = growConstant;
    shapeName = "linear (compares 2 rand nums)"
    if (index > threshold){
      randomCounts[index]++;
      drawRectSoftner(gradient, index);
    }
  } else if (selectShape === 2){  
    // linear threshold. will tend toward more black
    growScale = growConstant;
    shapeName = "reverse linear"
    if (index > threshold){
      randomCounts[total - index]++;
      drawRectSoftner(gradient, total-index);
    }
  } else if (selectShape === 3){  
    // quadratic threshold. will tend toward more white
    growScale = growConstant;
    shapeName = "quadratic"
    if (index > threshold*threshold){
      randomCounts[index]++;
      drawRectSoftner(gradient, index);
    }
  } else if (selectShape === 4){  
    // quadratic threshold. will tend toward more white
    growScale = growConstant;
    shapeName = "reversed quadratic"
    if (index > threshold*threshold){
      var reverseIndex = total-index;
      randomCounts[reverseIndex]++;
      drawRectSoftner(gradient, reverseIndex);
    }
  } else if (selectShape === 5){  
    // quadratic threshold. will tend toward more white
    growScale = growConstant;
    shapeName = "x cubed"
    if (index > threshold*threshold*threshold){
      randomCounts[index]++;
      drawRectSoftner(gradient, index);
    }
  } else if (selectShape === 6){  
    // quadratic threshold. will tend toward more white
    growScale = growConstant;
    shapeName = "reversed x cubed"
    if (index > threshold*threshold*threshold){
      var reverseIndex = total-index;
      randomCounts[reverseIndex]++;
      drawRectSoftner(gradient, reverseIndex);
    }
  }

  // draw the resulting graph
  for (var x = 0; x < randomCounts.length; x++){
    fill(x*gradient);
    rect(x*w, height-randomCounts[x]*growScale, w-1, randomCounts[x]*growScale);
    
    //check boundary return to begining if bar exceeds boundary
    if (randomCounts[x]*growScale > height+growScale) {
      resetCount();
    }
  }
  
  displayPageTitle();
}

// reset the entire count if the height boundary is crossed by any bar
function resetCount(){
  for (var i = 0; i < randomCounts.length; i++){
    randomCounts[i] = 0;
  }
}

function drawRectSoftner(gradient, ind) {
  
  //soften the strobe effect
  fill(gradient*ind,20);
  rect(0, 0, width, height);
  fill(gradient*ind,2);
  rect(0, 0, width, height);
}

function mousePressed(){
  //reset the screen
  background(0);
  //reset the array
  for (var i = 0; i < randomCounts.length; i++) {
    randomCounts[i]=0;
  }
  //increment to the next shape type
  count++;
  selectShape = count % numOfShapes;
  print (selectShape);
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
  text(shapeName, width*.7, 40);
}


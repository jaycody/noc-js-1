/*jstephens p5_gungfu 2016_06
perlin noise from shiffman
*/
var pageTitle = "1D Noise Space: Single Value Extraction";

/*TODO:
[x] animate noise space incrementer 
[x] add button to toggle to auto incrment the noise space incrementer
*/
var canvas;
var INNER_WIDTH = window.innerWidth;
var INNER_HEIGHT = window.innerHeight;
var xoff = 0;
var x;
var noiseX;
var increment;
var textLoc   = .62;
var textIncrement = 28;
var incrementSlider;
var instance = 0;
var autoIncrementIsOn = false;
var autoIncrement = 0;
var autoIncrementDirection = 1;  //forward backward controls
var rawSliderVal = 0;
var autoVersion = 0;

function setup(){
  colorMode(HSB,255,255,255,255);
  //canvas = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  createCanvas(INNER_WIDTH, INNER_HEIGHT);
  background(120);
  incrementSlider = createSlider(0, 5000, 1100);
  incrementSlider.position(width*.15, height*.1);
  incrementSlider.style('width', '500px');
  
  button = createButton('increment type');
  button.position(width*.01, height*.1);
  button.mousePressed(automate);
  
}

function draw(){  
  switch(autoVersion){
    case 0:
      rawSliderVal = incrementSlider.value();
      increment = map(rawSliderVal, 0,5000, .000001, .04);
      //keep this in case we switch to autoIncrement
      autoIncrement = rawSliderVal;
      break;
    
    case 1:
      incrementSlider.value(autoIncrement);
      increment = map(autoIncrement, 0,5000, .000001, .04);
      autoIncrement = noise(xoff+50)*5000;  //* slider range
      break;
    
    case 2:
      incrementSlider.value(autoIncrement);
      increment = map(autoIncrement, 0,5000, .000001, .04);
      //scale autoIncrement back up to a value between 0,50000
      //console.log('autoIncrement=' + autoIncrement);
      
      //check slider boundary -- flip slider slide direction if boundary exceeded
      if ((autoIncrement >=5000) || (autoIncrement <=0)){
        
        autoIncrementDirection *= -1;
      }
      autoIncrement = autoIncrement + (10 * autoIncrementDirection);
      break;
        
    default:
      ////console.log('default case');
      //no break statement needed
  }
  
  autoIncrement = floor(autoIncrement);
  
  calculateLocation();
  drawText();
  drawRect();
  drawCircle();
  
}

function automate(){
  //background(noiseX*255);
  //background(random(255));
  instance += 1;
  //console.log(instance);
  autoIncrementIsOn = !autoIncrementIsOn;
  //console.log(autoIncrementIsOn);
  
  autoVersion += 1; // increments indefinitely, but... 
  autoVersion %= 3; // limits autoVersion to 0,1, or 2
  //console.log("autoVersion=" + autoVersion);
  
}
function drawRect(){
  fill(noiseX*255,255,255);
  strokeWeight(noiseX*3);
  stroke(255-noiseX*255,255,noiseX*255);
  rect(x, INNER_HEIGHT*.4,45,45);
}

function calculateLocation(){
  noiseX = noise(xoff);
  x = noiseX * INNER_WIDTH;
  x = floor(x);
  xoff += increment;
  
}

function drawCircle(){
  
  strokeWeight(noiseX*5);
  stroke(noiseX*255,255,255);
  fill(noiseX*255,255,noiseX*255, 255-noiseX*255);
  ellipse(width*.8, height*.8,noiseX*250, noiseX*250);
  
  strokeWeight(noiseX*5);
  stroke(255-noiseX*255,255,255);
  fill(255-noiseX*255,255,(255-noiseX*255),noiseX*255);
  
  ellipse(width*.8, height*.8,250-noiseX*250, 250-noiseX*250);
}

function drawText(){
  strokeWeight(noiseX*4);
  stroke(noiseX*255,255,255);
  textSize(18);
  //fill(127);
  fill(255-noiseX*255);
  rect(0, INNER_HEIGHT*.16, width,100);  //background rect for slider
  rect(0, INNER_HEIGHT*.60, width,height);  //background rect for movement info
  
  fill(250);
  //fill(noiseX*255);
  strokeWeight(noiseX*1);
  stroke(noiseX*255);
  text("size of noise space increments: " + increment.toFixed(6), INNER_WIDTH*.1, INNER_HEIGHT*.165 +35);
  text("slider value =  " + autoIncrement, INNER_WIDTH*.1, INNER_HEIGHT*.165 + 65);
  text("location.x=" + x, INNER_WIDTH*.1, (INNER_HEIGHT*(textLoc) + textIncrement*1));
  text("    where loc.x = noiseX * width", INNER_WIDTH*.1, (INNER_HEIGHT*(textLoc) + textIncrement*2));
  text("noiseX=" + noiseX, INNER_WIDTH*.1, (INNER_HEIGHT*(textLoc) + textIncrement*3));
  text("    where noiseX = noise(xoff)", INNER_WIDTH*.1, (INNER_HEIGHT*(textLoc) + textIncrement*4));
  text("    and xoff        = " + xoff.toFixed(6), INNER_WIDTH*.1, (INNER_HEIGHT*(textLoc) + textIncrement*5));
  text("    and increment = " + increment.toFixed(6), INNER_WIDTH*.1, (INNER_HEIGHT*(textLoc) + textIncrement*6));
  
  //draw title
  fill(200);
  noStroke();
  textSize(28);
  var pageTitleToWidthRatio = (pageTitle.length)/width;
  
  //calculate where to start the text if the text is to be centered
  var pageTitleOffset = ((width/2) - (pageTitleToWidthRatio*width*5)-(pageTitle.length));
  //console.log(pageTitleOffset);
  text(pageTitle, pageTitleOffset, height*.06);
  
  
}
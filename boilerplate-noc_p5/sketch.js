var PAGE_TITLE = "noc_p5_gungfu-boilerplate";

/**jstephens 2016_03 - from Nature of Code examples - shiffman**
TODO:

*/
////////////
//SET GLOBALS
var INNER_WIDTH   = window.innerWidth;
var INNER_HEIGHT  = window.innerHeight;
var CANVAS;
var BGND_COLOR    = 127;
var BGND_IS_ON    = true;


function setup(){
  runBasicSetup(); 

}


function draw(){
  if (BGND_IS_ON){
    displayPageTitle();
  }
}


function mousePressed(){

}





////////////////////////////////////////////////////
////SETUP and CONFIG
////////////////////////////////////////////////////
function runBasicSetup() {
  CANVAS = createCanvas(INNER_WIDTH, INNER_HEIGHT);
  CANVAS.position(0,0);
  smooth();
  displayPageTitle();
}

function displayPageTitle(){
  background(BGND_COLOR);      //clear CANVAS before draw
  //display PAGE_TITLE in CANVAS
  fill(255);
  textSize(18);
  text(PAGE_TITLE, width*.01, 40);

  //textSize(14);
  var LESSON = "\
  /*\n\
  //////boilerplate//////\n\
  */\n ";

  text(LESSON, width*.01, height*.6);
}
////END CONFIG
////////////////////////////////////////////////////







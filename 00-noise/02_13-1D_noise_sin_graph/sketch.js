/*jstephens p5_gungfu 2016_06
perlin noise from shiffman
TODO:
**simplest version possible that still does the following:
[x] switch case function

scan across perlin space such that 
xoff initial value increments at every loop
while it continues to increment across the screen width within each loop

[x] create object for page information json
[x] create static graph object
[x] graph noise static image
[]  y = sin 
[]  y = additive sin+noise wave (sin dominant)
[]  y = additive sin+noise wave (noise dominant
*/
var INNER_WIDTH = window.innerWidth;
var INNER_HEIGHT= window.innerHeight;

var page = {
  title: "sin waves and perlin noise graphed",
  show: function(){
      //background(0);
      fill(160);
      textSize(25);
      text(this.title, width*.05, height*.05);
  }
};

var flatLine = {
  heightScl:  .5,
  xoff: 0,
  start: 50,
  y:      INNER_HEIGHT,
  update: function(){
      //set the entry point to the noise space 
      this.xoff = this.start;
      //calculate noise for the same xoff value over and over
      this.y = noise(this.xoff)*height;
      stroke(120);
      fill(255);
  },
  draw:   function(){
    for (var x=0; x<width; x++){
      point(x, this.y);
    }
  },
  graph:    function(){
    this.update();
    this.draw();
  }
};

var flatScan = {
  y: 200,
  xoff: 0,
  start: 0,
  increment: .01,
  update: function(){
    this.xoff=this.start;
    fill(0,255,0);
    stroke(0,255,0);
  },
  draw: function(){
    //for every x in width, calc y, then draw a pixel at that location
    for (var x = 0; x < width; x++){
      this.y = noise(this.xoff)*height;
      point(x, this.y);
      //do NOT increment the xoff here. recalculate the same noise for every x
      //this.xoff += this.increment;
    }
    /* increment the starting position after every full loop, such  that for every pass through the x values of the width, the same noise values will be calculated for every x value.
    */
    this.start += this.increment;
  },
  graph: function(){
    this.update();
    this.draw();
  }
};

var perlinLine = {
  y:         300,
  xoff:      0,
  start:     0,
  increment: .01,
  update: function(){
    this.xoff = this.start;
    fill(255,0,0);
    stroke(255,0,0);
  },
  draw: function(){
    //for every x in width, calculate the y noise.
    for (var x = 0; x < INNER_WIDTH; x++){
      //calc that noise, yo
      this.y = noise(this.xoff)*height;
      point(x,this.y);
      this.xoff += this.increment;
    }
    //reset the xoff so that noise gets recalculated from zero for every loop
    ellipse(INNER_WIDTH/2, flatLine.y, 40,40);
  },
  graph: function(){
    this.update();
    this.draw();
  }
}; 

var perlinScan = {
  y:     0,
  xoff:  0,
  start: 0,
  increment: .01,
  update: function(){
    fill(0,0,255);
    stroke(0,0,255);
  },
  draw: function(){
    this.xoff = this.start;
    for (var x = 0; x < width; x++){
      this.y = noise(this.xoff)*height;
      point(x, this.y);
      //draw an ellipse on the perlinScan at the midway point 
      if (x == floor(width*.5)){
          ellipse(x, this.y, 20,20);
          line(0,this.y, width, this.y);
        }
      this.xoff += this.increment;
    }
    // scan through the entire graph after every inner loop through the width
    this.start += this.increment;
    
  },
  graph: function(){
    this.update();
    this.draw();
  }
}; 

var sinWarble = {
  y: 100,
  xoff: 0,
  start: 0,
  increment: .01,
  update: function(){
    fill(0,255,255);
    stroke(0,255,255);
    strokeWeight(2);
    if (mouseX == 0){
      this.increment = .01;
    } else {
    this.increment = map(mouseX,0,width,.001, .1);
    }
  },
  draw: function(){
    //this.xoff = this.start;
    for (var x = 0; x < width; x++){
      this.y = map(sin(this.xoff), -1,1, 0, height);
      point(x, this.y);
      //draw an ellipse on the perlinScan at the midway point 
      if (x == floor(width*.5)){
          ellipse(x, this.y, 20,20);
          line(0,this.y, width, this.y);
        }
      this.xoff+=this.increment;
    }
    //this.start += this.increment;
  },
  graph: function(){
    this.update();
    this.draw();
  }
};

var sinLine = {
  y: 100,
  xoff: 0,
  start: 0,
  increment: .01,
  update: function(){
    fill(255,0,255);
    stroke(255,0,255);
    strokeWeight(2);
    //this.increment = map(mouseX,0,width,.001, .1);
  },
  draw: function(){
    this.xoff = this.start;
    //for every x in width, get the sin of x and map it to the width or something
    for (var x = 0; x < width; x++){
      //calculate the sin of the xoff value. reset xoff after the loop
      this.y = map(sin(this.xoff), -1,1, 0, height);
      point(x, this.y);
      //draw an ellipse on the perlinScan at the midway point 
      if (x == floor(width*.5)){
          ellipse(x, this.y, 20,20);
          line(0,this.y, width, this.y);
        }
      this.xoff+=this.increment;
    }
    // this stops the wave from scanning forward. forces the resuse of the previously used values for xoff.
    this.start += this.increment;
  },
  graph: function(){
    this.update();
    this.draw();
  }
};

var addSinToNoise = {
  y: 0,
  prevY: 0,
  xoff: 0,
  start: 10000,
  increment: .01,
  
  sinY: 0,
  prevSinY: 0,
  xoffSin: 0,
  startSin: 10,
  incrementSin: .02,
  update: function(){
    fill(255);
    stroke(255);
  },
  draw: function(){
    this.xoff    = this.start;
    this.xoffSin = this.startSin;
    beginShape();
    for (var x = 0; x<width;x+=30){
    
      
      //calc noise
      stroke(55);
      //this.y = map(noise(this.xoff),0,1,height*.25,height*.75);
      this.y = map(noise(this.xoff),0,1,0,height);
      //this.y = noise(this.xoff)*height*.5;
      
      //point(x, this.y);
      stroke(0,255,0);
      line(x,this.y, x-140,this.prevY);
      this.prevY = this.y;
      
      
      //calc sin
      stroke(5,255,255);
      this.sinY = map(sin(this.xoffSin),-1,1,0,height);
      //this.sinY = map(sin(this.xoffSin),-1,1,height*.25,height*.75);
      //point(x, this.sinY);
      //line(x, this.sinY, this.prevY,this.sinY);
      //additive wave
    //  strokeWeight(3);
    //  stroke(noise(this.xoff)*255,155,noise(this.xoffSin)*55);
      var additiveY = (this.y + this.sinY)-(INNER_HEIGHT*.5);
      //point(x, additiveY);
      //line(x, additiveY, x*.5,additiveY);
      //line(x, this.sinY, x+40,additiveY);
      
      //draw the vertecies
      fill(noise(this.xoff)*55, noise(this.xoffSin)*255);
      //fill(190,150);
      //noFill();
      strokeWeight(1);
      stroke(255-noise(this.xoff)*255,100-noise(this.xoff)*100);
      vertex(x, this.y);
      //vertex(this.y,-x*2.7);
      //vertex(height-this.y, 1/this.sinY);
        vertex(x, this.y);
      //vertex(this.sinY*2,x);
    vertex(this.y,-x/5);
    vertex(x*2, additiveY*3);
        vertex(this.sinY*2,x);
      strokeWeight(2);
      stroke(noise(this.xoff)*255,155-noise(this.xoffSin)*55,noise(this.xoffSin)*155);
      line(x, this.sinY, x+40,additiveY);
      
      
      this.xoff    += this.increment;
      this.xoffSin += this.incrementSin;
    }
    endShape();
    this.start += this.increment;
    this.startSin += this.incrementSin;
    
    //ellipse(mouseX, mouseY, 50,50);
  },
  graph: function(){
    this.update();
    this.draw();
  }
};

function setup(){
  createCanvas(INNER_WIDTH, INNER_HEIGHT);
  background(0);  
}

function draw(){  
  page.show();
  //flatLine.graph();  
  //perlinLine.graph();
  //flatScan.graph();
  
  //perlinScan.graph();
  //sinLine.graph();
  //sinWarble.graph();
  
  addSinToNoise.graph();
  
  
  
  
  
}


function mousePressed(){
  background(0);
  
  //reposition the flatline by genearting a 0-1 scalar to apply to height 
  flatLine.start = random(width);
  
  
  //reposition the perline line
  // - give xoff a new starting value
  // - which will be used to calc a fresh set of noise values for  every x in width
  perlinLine.start = random(width);
}

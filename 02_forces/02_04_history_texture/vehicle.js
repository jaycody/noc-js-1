function Vehicle() {
  this.location     = createVector(width/2, height/2);
  this.velocity     = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.fillVector   = createVector(random(255),random(255),random(255));
  
  this.mass         = random(3,35);
  this.diameter     = this.mass*2;
  this.topSpeed     = 7;
  this.constrainBoundary = true;  //

  /////////PERLIN STEERING/////////////
  this.perlinForce  = createVector(random(width), random(height));
  // for uniform perlin across all vehicles, start with same initial perlin Force 
  //this.perlinForce  = createVector(100, 0);
  this.perlinForceRange     = createVector(random(10,30), random(10,30));  //(3,3)
  this.perlinForceIncrement = createVector(random(-.3,.3),random(-.3,.3)); //(.03, .03)
  //this.perlinForceIncrement = createVector(random(.09),random(.09));
  
  /////////STORE HISTORY///////////
  this.history      = [];
  this.maxHistory   = 200;
  this.historyIsOn  = true;
  this.showTexture  = true;
  this.textureImage = angels[randomAngel];
  
  
  /////////////////////////////////////////////
  ////CALCULATE GENERATE APPLY FORCES /////////
  this.applyForce   = function(force){
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);  
  };
  ////CALC & APPLY PERLIN STEERING FORCE
  this.perlinSteer  = function(){
    var f = createVector(map(noise(this.perlinForce.x),0,1,-this.perlinForceRange.x, this.perlinForceRange.x), map(noise(this.perlinForce.y),0,1,-this.perlinForceRange.y, this.perlinForceRange.y));
    this.applyForce(f);
    this.perlinForce.add(this.perlinForceIncrement);
  };
  ////END FORCES////////////////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  ////UPDATE & DISPLAY//////////////////////////////
  this.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);  //clear the acceleration
    
    if (this.historyIsOn){
      this.storeHistory();      //add the current location vector to the history array
    }
  };
  this.display = function(){
    if (this.historyIsOn){
      this.displayHistory();
    } else {
       fill(20,255,20);
       ellipse(this.location.x, this.location.y, 40,40);  
    }
    //image(this.textureImage, width*.87,height*.04, INNER_WIDTH*.1, INNER_HEIGHT*.1);
  };
  ////END UPDATE AND DISPLAY//////////////////////// 
  //////////////////////////////////////////////////
  
  ///////////////////////////////////////////////////
  ////HISTORY: STORE AND DISPLAY
  this.storeHistory = function(){
    //store history
    var v = createVector(this.location.x, this.location.y);
    this.history.push(v);
    //limit history
    if (this.history.length > this.maxHistory){
      //remove 1 item from index 0 (the oldest member of the array)
      this.history.splice(0,1);
    }
  };
  this.displayHistory = function(){
    beginShape();
    //texture(angels[randomAngel]);
    for (var i = 0; i < this.history.length; i+=6){
      // retrieve the location vector and store it in a new vector
      var previousLocation = this.history[i];
      //webgl requires the z-cordinate for the vertex
      vertex(previousLocation.x, previousLocation.y);
      noFill();
      strokeWeight(1);
      stroke(255,(i/this.history.length)*300);
      ellipse(previousLocation.x, previousLocation.y, (this.history.length-i)*.4, (this.history.length-i)*.4);
    }
    //
    fill(0,255,0,20);
    //angels[randomAngel].display();
    
    //texture(pict);
    endShape(CLOSE);
  };
  ////END HISTORY 
  /////////////////////////////////////////////////////
  
  //////////////////////////////////////////////////
  ////BOUNDARY CONDITIONS///////////////////////////
  this.checkBoundary = function(){
    if (this.constrainBoundary){
      if (this.location.x > width+(this.diameter/2)){
        //this.location.x = 0;
        this.location.x = width +(this.diameter/2);
        this.velocity.x *= -1;
      }
      else if (this.location.x < 0 - (this.diameter/2)){
        //this.location.x = width;
        this.location.x = 0 - (this.diameter/2);
        this.velocity.x *= -1;
      }
      if (this.location.y > height + (this.diameter/2)){
        //this.location.y = 0;
        this.location.y = height + (this.diameter/2);
        this.velocity.y *= -1;
      }
      else if (this.location.y < 0 - (this.diameter/2)){
        //this.location.y = height;
        this.location.y = 0 - (this.diameter/2);
        this.velocity.y *= -1;
      }
    } else {
      if (this.location.x > width+(this.diameter/2)){
        this.location.x = 0;
      }
      else if (this.location.x < 0 - (this.diameter/2)){
        this.location.x = width;
      }
      if (this.location.y > height + (this.diameter/2)){
        this.location.y = 0;
      }
      else if (this.location.y < 0 - (this.diameter/2)){
        this.location.y = height;
      }
    }
  };
  ////END BOUNDARY CONDITIONS
  ///////////////////////////////////////////////////
  
  
}
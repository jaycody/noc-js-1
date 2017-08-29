// mover is now a vehicle

function Vehicle() {
  this.location     = createVector(width/2, height/2);
  this.velocity     = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.fillVector   = createVector(random(255),random(255),random(255));
  
  this.mass         = random(3,35);
  this.diameter     = this.mass*2;
  this.topSpeed     = 7;

  /////////PERLIN STEERING/////////////
  this.perlinForce  = createVector(random(width), random(height));
  // for uniform perlin across all vehicles, start with same initial perlin Force 
  //this.perlinForce  = createVector(100, 0);
  this.perlinForceRange     = createVector(random(10,30), random(10,30));  //(3,3)
  this.perlinForceIncrement = createVector(random(-.3,.3),random(-.3,.3)); //(.03, .03)
  //this.perlinForceIncrement = createVector(random(.09),random(.09));
  
  /////////STORE HISTORY///////////
  this.history = [];
  this.maxHistory = 300;
  
/////////////////////////////////////////////
  this.applyForce   = function(force){
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);  
  };
  
  ////VEHICLE CAN ADD ITS OWN PERLIN STEERING FORCE
  this.perlinSteer  = function(){
    var f = createVector(map(noise(this.perlinForce.x),0,1,-this.perlinForceRange.x, this.perlinForceRange.x), map(noise(this.perlinForce.y),0,1,-this.perlinForceRange.y, this.perlinForceRange.y));
    
    this.applyForce(f);
    
    this.perlinForce.add(this.perlinForceIncrement);
  }

  this.update       = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    
    //store history
    var v = createVector(this.location.x, this.location.y);
    this.history.push(v);
    //limit history
    if (this.history.length > this.maxHistory){
      //remove 1 item from index 0 (the oldest member of the array)
      this.history.splice(0,1);
    }
    //println(this.history.length);
  };
  
  this.display      = function(){
    //fill(this.fillVector.x,this.fillVector.y,this.fillVector.z);
    //ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
    
    //display location history
    //iterate through array of location histories and draw an new ellipse
    noFill();
    strokeWeight(1);
    stroke(255);
    beginShape();
    for (var i = 0; i < this.history.length; i++){
      // retrieve the location vector and store it in a new vector
      var previousLocation = this.history[i];
      vertex(previousLocation.x, previousLocation.y);
      
      //fill(random(255), (i/this.history.length)*255);
      //fill(200);
      //fill(255);
      //fill((i/this.history.length)*300);
      //ellipse(previousLocation.x, previousLocation.y, i*.3, i*.3);
      //ellipse(previousLocation.x, previousLocation.y, (this.history.length-i)*.4, (this.history.length-i)*.4);
    }
    endShape(CLOSE);
  };
  
  this.checkBoundary = function(){
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
  };

}
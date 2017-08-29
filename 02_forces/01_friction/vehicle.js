// mover is now a vehicle

function Vehicle() {
  this.location     = createVector(width/2, height/2);
  this.velocity     = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.fillVector   = createVector(random(255),random(255),random(255));
  
  this.mass         = random(3,35);
  this.diameter     = this.mass*2;
  this.topSpeed     = 5;

  /////////PERLIN STEERING/////////////
  this.perlinForce  = createVector(random(width), random(height));
  
  // for uniform perlin across all vehicles, start with same initial perlin Force 
  //this.perlinForce  = createVector(100, 0);
  
  this.perlinForceRange     = createVector(3,3);
  this.perlinForceIncrement = createVector(.03,.03);
  //this.perlinForceIncrement = createVector(random(.09),random(.09));
  
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
  };
  
  this.display      = function(){
    fill(this.fillVector.x,this.fillVector.y,this.fillVector.z);
    ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
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
function Vehicle() {
  this.location = createVector(random(width), random(height));
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  
  this.vehicleColor = color(random(255), random(255), random(255));
  this.G            = random(.1, 2);
  this.mass         = this.G * 30;
  this.diameter     = this.mass;
  //chances of being repulsion
  this.attractorType = floor(random(TOTAL_VEHICLES/2));
  this.topspeed = 10;
  
  
  this.applyForce = function(force){
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };
  
  this.attract = function(other){
    var f = p5.Vector.sub(this.location, other.location);
    var dist = f.mag();
    dist = constrain(dist, 1, 25);
    var strength = (this.G * this.mass * other.mass)/(dist*dist);
    f.normalize();
    f.mult(strength);
    if(this.attractorType === 0){
      stroke(0);
      this.vehicleColor = color(255);
      return f.mult(-1);
    } else {
      stroke(255);
      this.vehicleColor = color(0);
      return f;
    
  }
  };
  
  this.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  };
  
  this.display = function(){
  
    fill(this.vehicleColor);
    ellipse(this.location.x, this.location.y, this.diameter,this.diameter);
  };
  
  this.checkBoundaries = function(){
    if (this.location.x > width) {
      this.location.x = width;
      this.velocity.x *= -1;
    }
    else if (this.location.x < 0) {
      this.location.x = 0
      this.velocity.x *= -1;
    }
    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y *= -1;
    }
    else if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y *= -1;
    }
  };
  
  
}
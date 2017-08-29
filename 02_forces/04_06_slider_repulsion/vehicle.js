function Vehicle(id) {
  this.id       = id;
  this.location = createVector(random(width), random(height));
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  
  this.vehicleColorAttract  = color(0, 100);
  this.vehicleColorRepel    = color(255, 100);
  this.vehicleStrokeAttract = color(255,150);
  this.vehicleStrokeRepel   = color(0,150);
  
  this.G            = random(.1, 2);
  this.mass         = this.G * 30;
  this.diameter     = map(this.mass, .1*30, 2*30, 10,55);//this.mass;
  //chances of being repulsion
  this.attractorType= floor(random(TOTAL_VEHICLES/2));
  this.topspeed     = 10;
  
  this.easing       = .05;
  
  //create vehicles with initial repulsion force
  this.maxOpposers  = 15;
  if (this.id <= this.maxOpposers){
    this.mutualRepulsion = false;
    print(this.id);
  } else {
    this.mutualRepulsion = true;
  }
  print(this.mutualRepulsion);
  
  
  
  
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
    
    //if it's an albino, make it do the opposite other planets
    if(!this.mutualRepulsion){
      return f.mult(-1);
    } else if (this.mutualRepulsion){
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
    if(this.mutualRepulsion){
      fill(this.vehicleColorAttract);
      stroke(this.vehicleStrokeAttract);
    } else {
      fill(this.vehicleColorRepel);
      stroke(this.vehicleStrokeRepel);
    }
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
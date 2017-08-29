function Attractor(){
  this.location       = createVector(random(width), random(height));
  //this.location       = createVector();
  this.velocity       = createVector();
  this.acceleration   = createVector();
  
  this.perlinForce    = createVector(random(1000), random(1000));
  //this.perlinIncrement = createVector(0.002,0.002,0);
  this.perlinIncrement = createVector(random(0.0015,0.003),random(0.0015,0.003),0);
  
  this.G              = random(2, 3);
  this.mass           = this.G * 45;
  this.diameter       = map(this.mass, 1*45, 3*45, 150, 300);//this.mass*2;
  this.repulsionIsOn  = false;
  
  this.fillBW         = color(map(this.G, 1, 3, 0, 155), 20);
  this.fillAlpha      = map(this.G, 1, 3, 0, 50);
  this.attractorColor = color(random(255), random(255), random(255), this.fillAlpha);
  
  this.attractorImage   = loadImage("/assets/alphas/2011-5f-2nd_order-400x400.png");
  this.offsetForEasing  = 0;
  this.easing           = .05;
  this.maxspeed         = 8;
  this.maxforce         = 10;
  
  this.previousMouse    = 0;
  
  this.applyForce = function(force){
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };
  
  this.update = function(){
    //calculate perlin movement
    //caculate acceleration
    //this.acceleration.x = map(noise(this.perlinForce.x),0,1,-.05,.05);
    //this.acceleration.y = map(noise(this.perlinForce.y),0,1,-.05,.05);
    
    this.location.x = map(noise(this.perlinForce.x),0,1,0,width);
    this.location.y = map(noise(this.perlinForce.y),0,1,0,height);
    
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    
    this.perlinForce.add(this.perlinIncrement);
    
    //constrain (this.location.x, this.diameter/2, width-this.diameter);
    //constrain (this.location.y, this.diameter/2, height-this.diameter);
    constrain (this.location.x, 0, width);
    constrain (this.location.y, 0, height);
    
  };
  
  this.display = function(){
    //display the alpha image at attractor point
    var img = this.attractorImage;
    tint(255,50);                 // reduce opacity
    imageMode(CENTER);
    
    image(img, this.location.x, this.location.y, this.diameter, this.diameter);
    //image(img, this.location.x, this.location.y, (img.width/6)*this.G, (img.width/6)*this.G);
    //image(img, this.location.x, this.location.y, img.width, img.width); 
  };
  
  this.applyEasing = function(target){
    if (abs(this.previousMouse - mouseX != 0)){
      this.acceleration = p5.Vector.sub(target, this.location);
      this.acceleration = p5.Vector.mult(this.acceleration, this.easing);
      this.location.add(this.acceleration);
      this.acceleration.mult(0);
    }
    this.previousMouse = mouseX;
  };
  
  this.attract = function(vehicle){
    var force        = p5.Vector.sub(this.location, vehicle.location);
    var dist          = force.mag();
    dist = constrain(dist, 10, 30);
    var strength = (this.G * this.mass * vehicle.mass) / (dist * dist);
    force.normalize();
    force.mult(strength);
    
    /*
    if (vehicle.id <= vehicle.maxOpposers){
      return force.mult(-1);
    } else {
      return force;
    }
    */
    
    //if the vehicle is an opposer, then reverse its attraction to the attractor as well
    if (vehicle.id <= vehicle.maxOpposers){
      force.mult(-1);
      //this.repulsionIsOn = !this.repulsionIsOn;
      //print(vehicle.id);
    }
    
    if (!this.repulsionIsOn){
      return force; 
    } else {
      return force.mult(-1.2);
    }
    
    
  };
  
  //STEER = DESIRED MINUS VELOCITY
  this.arriveAt = function(target){
    //1.find the desired vector between target and current location 
    var desired = p5.Vector.sub(target, this.location);
    //2.extract the distance from the desired vector
    var dist = desired.mag();
    //3.map the distance between target and this location to vehicle velocity
    //as the distance closes the speed drops
    var mappedEasing = map(dist, 0, 100, 0, this.maxspeed);
    desired.setMag(mappedEasing);
    //4.calculate the steering force
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  };
  
  /*
  this.checkBoundaries = function(){
    if (this.location.x > width - (this.diameter/2)) {
      this.location.x = width - (this.diameter/2);
      //this.velocity.x *= -1;
    }
    else if (this.location.x < 0 + this.diameter/2) {
      this.location.x = 0 + this.diameter/2;
      //this.velocity.x *= -1;
    }
    if (this.location.y > height - (this.diameter/2)) {
      this.location.y = height - (this.diameter/2);
      //this.velocity.y *= -1;
    }
    else if (this.location.y < 0 + (this.diameter/2)) {
      this.location.y = 0 + (this.diameter/2);
      //this.velocity.y *= -1;
    }
  };
  */
  
  
  this.checkBoundaries = function(){
    if (this.location.x > width + (this.diameter/2)){
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
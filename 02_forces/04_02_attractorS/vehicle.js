function Vehicle(){
  this.location     = createVector((width/2) + random(-100,100), ((height/2)+random(-100,100)-(.4*height)));
  this.velocity     = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.maxSpeed     = 7;
  
  this.mass         = random(1, 7);
  this.diameter     = map(this.mass, 1, 7, 10,50);
  this.fillMapRed   = map(this.mass, 1, 7, 20,255);
  this.fillMapGreen = 0;
  this.fillMapBlue  = 0;


  this.display = function(){
    //fill map to location
    //this.fillMapGreen = map(this.location.x, 0, width, 0,255);
    this.fillMapBlue = map(this.location.y, 0, height, 0,255);
    //fill(this.fillMapRed,this.fillMapGreen,255-this.fillMapBlue);
    
    //fill mapped to velocity
    //this.fillMapGreen = this.velocity.mag();
    this.fillMapGreen = map(this.velocity.mag(), 0, this.maxSpeed, 0,255);
    
    fill(this.fillMapRed,this.fillMapGreen,this.fillMapBlue,this.fillMapGreen);
    //fill(this.fillMapGreen);
    noStroke();
    //stroke(this.fillMapGreen);
    
    // fill on velocity alone
    //fill(this.fillMapRed,this.fillMapGreen,255-this.fillMapGreen);
    
    // fill based on mass, velocity, location, and mass
    //fill(this.fillMapRed, this.fillMapGreen, this.fillMapBlue);
    
    ellipse(this.location.x, this.location.y, map(this.location.x, 0, width, -this.diameter,this.diameter), this.diameter);
  };
  
  this.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    
  
    this.acceleration.mult(0);
  };
  
  this.applyForce = function(f){
    f = p5.Vector.div(f, this.mass);
    this.acceleration.add(f);
  };
  
  this.applyPerlinForce = function() {
    var randomVector = p5.Vector.random2D();
    randomVector.mult(random(.5));
    this.applyForce(randomVector);
    
    var perlinForce = createVector(0, 0);
    //this.applyForce(perlinForce);  
  };
  
  this.checkBoundaries = function(){
    if ((this.location.x > width) || (this.location.x < 0)){
      this.velocity.x *= -1;
    }
    if ((this.location.y > height) || (this.location.y < 0)){
      this.velocity.y *= -1;
    }
  };
  
}
function Vehicle(){
  this.location     = createVector((width/2) + random(-10,10), ((height/2)+random(-10,10)-(.4*height)));
  this.velocity     = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.maxSpeed     = 6;
  
  this.mass         = random(1, 5);
  this.diameter     = map(this.mass, 1, 5, 5,40);
  this.fillMapRed   = map(this.mass, 1, 5, 20,255);
  this.fillMapGreen = 0;
  this.fillMapBlue  = 0;


  this.display = function(){
    this.fillMapGreen = map(this.location.x, 0, width, 0,255);
    this.fillMapBlue = map(this.location.y, 0, height, 0,255);
    fill(this.fillMapRed,this.fillMapGreen,255-this.fillMapBlue);
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
    randomVector.mult(.1);
    this.applyForce(randomVector);
    
    var perlinForce = createVector(0, 0);
    this.applyForce(perlinForce);  
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
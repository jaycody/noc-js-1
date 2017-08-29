function Mover(){
  //has a
  this.location     = createVector(width/2, height/2);
  this.velocity     = createVector();
  this.acceleration = createVector(random(-1,1), random(-1,1));

  this.topSpeed     = 10;
  this.diameter     = random(100);

  this.fillVector   = createVector(random(255),random(255),random(255));

  //does a
  this.update = function(){
    //caculate acceleration
    
    //update velocity with current acceleration. update location with velocity
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    
    console.log(this.velocity);
    this.velocity.limit(this.topSpeed);
  };

  this.display = function(){
    fill(this.fillVector.x,this.fillVector.y,this.fillVector.z);
    ellipse(this.location.x, this.location.y, this.diameter,this.diameter );
  };

  this.checkBoundary = function(){
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
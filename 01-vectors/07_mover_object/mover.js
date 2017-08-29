

var Mover = function(){
  
  /////////////////////////
  //mover has 
  this.location = createVector(width/2, height/2);
  this.velocity = createVector(random(-2,2), random(-2,2));
  /////////////////////////

  
/////////////////////////
  //mover does 
  this.update = function(){
    this.location.add(this.velocity);
  };

  this.display = function() {
    stroke(255);
    strokeWeight(3);
    fill(0,127,0);
    ellipse(this.location.x,this.location.y,30,30);
  };

  this.checkBoundary = function(){
    if ((this.location.x > width) || (this.location.x < 0)){
      this.velocity.x *= -1;
    } 
    if ((this.location.y > height) || (this.location.y < 0)){
      this.velocity.y *= -1;
    }
  };
};
function Attractor(){
  this.location       = createVector(random(width), height*.5);
  this.velocity       = createVector();
  this.acceleration   = createVector();
  
  this.G              = random(.1, 3);
  this.mass           = this.G * 15;
  this.diameter       = this.mass*2;
  this.fillBW         = color(map(this.G, .1, 3, 0, 155), 20);
  this.fillAlpha      = map(this.G, .1, 3, 0, 50);
  this.attractorColor = color(random(255), random(255), random(255), this.fillAlpha);
  
  
  this.display = function(){
    //fill(this.attractorColor);
    fill(this.fillBW);
    ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
  };
  
  
  this.attract = function(vehicle){
    force        = p5.Vector.sub(this.location, vehicle.location);
    var dist     = force.mag();
    dist = constrain(dist, 5, 20);
    var strength = (this.G * this.mass * vehicle.mass) / (dist * dist);
    force.normalize();
    force.mult(strength);
    
    return force; 
    
  };
  
  
  
}
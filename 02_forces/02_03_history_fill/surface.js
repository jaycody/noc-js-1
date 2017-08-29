/*Surface object 
     - receives a vehicle object
     - determines if a vehicle isOn its Surface
     - if vehicle isOn Surface, then calculates the Force of Friction exerted on vehicle
     - applies the force of friction to the vehicle
     - surface shape is currently a rect with surfaceOrigin and surfaceDimensions

Force of Friction: 
     = -1 * coeffficientOfFriction * magOfNormalForce * velocity_unit_vector

Usage:

    if(surface.contains(vehicle)){
      var frictionForce = surface.frictionOn(vehicle);
      vehicle.applyForce(frictionForce);
    }
    1. Does surface contain vehicle?
    2. If surface contains vehicle, then calculate friction force
*/

function Surface(){
  this.coeffientOfFriction = .9;
  this.magOfNormalForce    = 1;
  this.magOfFriction       = this.coeffientOfFriction*this.magOfNormalForce;
  
  this.surfaceWidth        = random(100,300);
  this.surfaceHeight       = random(100,300);
  this.surfaceOrigin       = createVector(random(width-this.surfaceWidth), random(height-this.surfaceHeight)); //surface falls within the screen
  this.surfaceDimension    = createVector(this.surfaceWidth, this.surfaceHeight);
  
  
  this.display = function(){
    fill(255);
    //rect(this.surfaceOrigin.x, this.surfaceOrigin.y, this.surfaceDimension.x, this.surfaceDimension.y);
  };
  
  // if the vehicle is on surface, draw another ellipse under the vehicle
  this.drawFrictionVehicle = function(vehicle){
    fill(0);
    ellipse(vehicle.location.x, vehicle.location.y, vehicle.diameter*2, vehicle.diameter*2);
    
  };
  
  
  //////////////////////////////////////////////////////
  //1. Determine if vehicle is on the surface (Does surface contain vehicle?)
  //2. If surface contains vehicle, call calculaterictionOn(vehicle) to calculate and apply friction
  this.contains = function(vehicle){
    //RETURNS TRUE if vehicle IS ON surface
    if ((vehicle.location.x > this.surfaceOrigin.x) && (vehicle.location.y > this.surfaceOrigin.y)) {
      
      if ((vehicle.location.x < (this.surfaceOrigin.x + this.surfaceDimension.x)) && (vehicle.location.y < (this.surfaceOrigin.y + this.surfaceDimension.y))){
        
        println('vehicle.location isOn surface');
        return true;
      }
    } else {
      return false;
    }
  };
  
  //////calculates Friction Force and applies it to vehicle
  //-1 * coeffficientOfFriction * magOfNormalForce * velocity_unit_vector
  this.applyFrictionTo = function(vehicle){
    //copy vehicle velocity (static method)
    var frictionForce = vehicle.velocity.copy();
    //normalize velocity to find its direction via its unit vector
    frictionForce.normalize();
    //reverse the velocity unit vector so it points at the oncoming vehicle
    frictionForce.mult(-1);
    //scale to produce the friction force (coefficientOfFriction * magOfNormalForce) 
    frictionForce.mult(this.magOfFriction);
    //apply frictionForce to the vehicle
    vehicle.applyForce(frictionForce);
    
    //draw a secondary ellipse depicting the surface friction 
    this.drawFrictionVehicle(vehicle);
//DEBUG    
    //println("Friction force applied to vehicle = " + frictionForce);
    
  };
}
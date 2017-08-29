function Attractor(){
  this.location = createVector(random(60,width-60), random(60,height-60));

  this.mass     = 20;
  this.G        = 2;
  this.diameter = map(this.mass, 5, 20, 30,70);


  this.calculateAttraction = function(vehicle){
    //steps for calculating attraction
    //1. calculate the direction of the force (subtract attractor's position from vehicles)
    //2. calc distance between the attractor and the vehicle
    //3. limit the distance to eliminate extreme results
    //4. normalize vector to get the direction of the force
    //5. calculate the gravitational force magnitude
    //6. get force vector --> (magnitude * direction)  
    //7. return the force 
    
    //1. force's direction
    var force = p5.Vector.sub(this.location, vehicle.location);
    //2. distance between objects
    var distBetween = force.mag();
    //3. constrain the distance between objects
    distBetween = constrain(distBetween, 5, 25);
    //4. normalize to get the direction
    force.normalize();
    //5. calc gravity force magnitude
    var strength = (this.G * this.mass * vehicle.mass)/(distBetween * distBetween);
    //6. get force Vector
    force.mult(strength);
    //7. return the force
    return force;
  };



  this.display = function(){
   fill(255);
   ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
  };

   
   
   
   
 }
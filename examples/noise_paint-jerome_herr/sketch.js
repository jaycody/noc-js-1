/*noisePainting - p5art web app  http://noize.surge.sh/
  - by jerome herr  http://www.jeromeherr.space/  Weaving.With.Code
  - interview with jerome on WantMinimal http://wantminimal.tumblr.com/post/121783442189/interview-p5art-1
  
referenced in tsulej's post, Drawing Vector Fields
https://generateme.wordpress.com/2016/04/24/drawing-vector-field/

Posted here in my examples directory so that I wouldn't lose it!
*/


var agents = [],
  col = [];
var fieldIntensity, noiseScale, radius, step;
var showText = true,
  saveImg = false,
  showGUI = true;
var a = .15,
  bg = 20,
  c = 0;
var slStep, slRadius, slNoiseScale, slFieldIntensity, slAgents;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  background(bg);
  initGUI();
  step = 5;
  createStuff();
  initColors(a);
  checkSliders();
}

function draw() {

  for (var i = 0; i < agents.length; i++) {
    agents[i].update();
    agents[i].paint();
  }
  if (frameCount % 100 === 0) c++;

  if (showGUI) {
    updateGUI();
    showGUI = false;
  }

  if (saveImg) {
    save("pics/image-" + floor(random(9999)) + ".png");
    saveImg = false;
  }

}

function createStuff() {
  agents = [];

  radius = slRadius.value();
  for (var x = width / 2 - radius; x < width / 2 + radius; x += step) {
    for (var y = height / 2 - radius; y < height / 2 + radius; y += step) {
      var distance = dist(x, y, width / 2, height / 2);
      if (distance < radius) {
        agents.push(new Agent(createVector(x, y)));
      }
    }
  }
}

function Agent(position) {
  this.angle = random(TWO_PI);
  this.stepSize = 1;
  this.position = position;
  this.outside = false;

  this.update = function() {
    this.angle = noise(this.position.x / noiseScale, this.position.y / noiseScale);
    //this.angle2 = noise(this.angle+sin(radians(frameCount))/10, this.angle+.5)* fieldIntensity;
    this.angle2 = noise(this.angle * 10, this.angle * 4);
    this.angle3 = noise(this.angle2 * 4, this.angle2 * .3 * frameCount / 1000) * fieldIntensity;
    this.position.x += cos(this.angle3) * this.stepSize;
    this.position.y += sin(this.angle3) * this.stepSize;
  }

  this.paint = function() {
    fill(col[c % col.length]);
    noStroke();
    ellipse(this.position.x, this.position.y, this.stepSize, this.stepSize);
  }
}

function keyTyped() {
  if (key === 's') save("pics/image-" + floor(random(9999)) + ".png");
  if (key === 'n') {
    showGUI = true;
    init();
  }
}

function init() {
  background(bg);
  noiseSeed(random(9999));
  c = 0;
  showText = true;
  initColors(a);
  createStuff(col);
}

function initColors(alphaValue) {
  col = [color('rgba(84,121,128,' + alphaValue + ')'), color('rgba(69,173,168,' + alphaValue + ')'), color('rgba(157,224,173,' + alphaValue + ')'), color('rgba(229,252,194,' + alphaValue + ')')];
}

function checkSliders() {
  step = slStep.value();
  radius = slRadius.value();
  fieldIntensity = slFieldIntensity.value();
  noiseScale = slNoiseScale.value();
  init();
  showGUI = true;
}

function initGUI() {
  slStep = createSlider(1, 20, 5);
  slStep.position(20, 20);
  slStep.input(checkSliders);
  slRadius = createSlider(20, 300, 150);
  slRadius.position(20, 50);
  slRadius.input(checkSliders);
  slNoiseScale = createSlider(50, 3000, 1000);
  slNoiseScale.position(20, 80);
  slNoiseScale.input(checkSliders);
  slFieldIntensity = createSlider(10, 3000, 100);
  slFieldIntensity.position(20, 110);
  slFieldIntensity.input(checkSliders);
}

function updateGUI() {
  noStroke();
  fill(bg);
  rect(0, 0, 300, 200);
  fill(255);
  textAlign(LEFT);
  text("pixels apart: " + slStep.value(), 165, 35);
  text("radius: " + slRadius.value(), 165, 65);
  text("noiseScale: " + slNoiseScale.value(), 165, 95);
  text("fieldIntensity: " + slFieldIntensity.value(), 165, 125);
  text("type 'n' for new noiseSeed value", 20, 155);
  text("type 's' to download the image", 20, 185);
  textAlign(RIGHT);
  text("www.jeromeherr.space", width - 20, height - 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 4);
  init();
  showGUI = true;
}
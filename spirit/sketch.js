let xspacing = 15; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 290.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

function setup() {
  // Create the canvas
  createCanvas(700, 500, WEBGL);
  
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  
  console.log( getTargetFrameRate() );
}



function draw(){
  background(0);

  move2D();
  
  // calculate and draw waves
  colorMode(HSB);
  makeWaves();

  move3D();
  colorMode(RGB);
  
  directionalLight(204, 204, 204, .5, 0, -1);
  renderBall();
  renderOrbit();

}

function move2D() {
  translate(-width / 2, -height / 2, 0);
}

function move3D() {
  translate(width / 2, height / 2, 0);
}

function renderBall() {
  push();
  specularMaterial(0,26,51);
  sphere(45);
  pop();
}

function renderOrbit() {
  
  push();
  rotateY(millis() / 2000);
  specularMaterial(200,5,5);
  torus(70, 2, 50, 50);
  pop();

  push();
  rotateX(millis() / 2000);
  specularMaterial(185, 218, 255);
  torus(55, 2, 50, 50);
  pop();
  
  /*
  push();
  rotateY(millis() / 2400);
  torus(70, 2, 50, 50);
  pop();

  push();
  rotateX(millis() / 2600);
  torus(70, 2, 50, 50);
  pop();
  */
}

function makeWaves() {
  calcWave1();
  renderWave1();
  calcWave2();
  renderWave2();
  calcWave3();
  renderWave3();
}

function calcWave1() {
  // Increment theta
  theta += 0.009;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    // height of wave
    yvalues[i] = (sin(x) * amplitude)/2.5;
    x += dx;
  }
}


function calcWave2() {
  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    // height of wave
    yvalues[i] = (sin(x) * amplitude)/-3.7;
    x += dx;
  }
}

function calcWave3() {
// For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    // height of wave
    yvalues[i] = (sin(x) * amplitude)/5.5;
    x += dx;
  }
}


function renderWave1() {
  noStroke();
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    fill(255);
    ellipse(x * xspacing, height/2 + yvalues[x], 2, 2);
  }
}

function renderWave2() {
  noStroke();
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    // start @ cool colors
    fill(360-(frameCount % 360), 45, 100);
    ellipse(x * xspacing, height/2 + yvalues[x], 4.5, 4.5);
  }
}

function renderWave3() {
  noStroke();
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    // start @ warm colors
    fill(frameCount % 360, 45, 100);
    ellipse(x * xspacing, height/2 + yvalues[x], 6.5, 6.5);
  }
}
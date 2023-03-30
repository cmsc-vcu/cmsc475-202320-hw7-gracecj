let xspacing = 15; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let amplitude2 = 75.0;
let amplitude3 = 75.0;
let period = 290.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

function setup() {
  // Create the canvas
  
  // add webgl back in for directional light
  createCanvas(700, 500, WEBGL);
  //background( 100, 100 , 200 );
  
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  
  console.log( getTargetFrameRate() );
}




function draw(){
  //background(0);
  //move your mouse to change light direction
  //let dirX = (mouseX / width - 0.5) * 2;
  //let dirY = (mouseY / height - 0.5) * 2;
  //directionalLight(250, 250, 250, -dirX, -dirY, -1);
  //noStroke();
  //sphere(40);
  
  background(0);
  
  colorMode(HSB);

  // move to 2d
  translate(-width / 2, -height / 2, 0);
  
  calcWave1();
  renderWave1();
  
  calcWave2();
  renderWave2();
  
  calcWave3();
  renderWave3();

  colorMode(RGB);
  
  fill(236, 222, 252);

  // move to 3d
  translate(width / 2, height / 2, 0);
  sphere(45);

}

function calcWave1() {
  // Increment theta
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    // height of wave
    yvalues[i] = (sin(x) * amplitude)/2.5;
    x += dx;
  }
}


function calcWave2() {
  // Increment theta
  theta += 0.0009;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    // height of wave
    yvalues[i] = (sin(x) * amplitude2)/-3.7;
    x += dx;
  }
}

function calcWave3() {
  // Increment theta
  theta += 0.0009;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    // height of wave
    yvalues[i] = (sin(x) * amplitude3)/5.5;
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
    fill(360-(frameCount % 360), 100, 100);
    ellipse(x * xspacing, height/2 + yvalues[x], 4.5, 4.5);
  }
}

function renderWave3() {
  noStroke();
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    // start @ warm colors
    fill(frameCount % 360, 100, 100);
    ellipse(x * xspacing, height/2 + yvalues[x], 6.5, 6.5);
  }
}
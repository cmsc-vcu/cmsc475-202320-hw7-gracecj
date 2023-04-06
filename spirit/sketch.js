// Grace Johnson
// Spirit: A Glimpse Into the Human Spirit

let xspacing = 15; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 290.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
var mode = 0;
let pg;

function setup() {
  // Create the canvas
  createCanvas(windowWidth, windowHeight, WEBGL);
  pg = createGraphics(windowWidth, windowHeight);

  a = createButton("start");
  a.position(width/2, height/2);
  a.mousePressed(updatemode);
  a.center('horizontal');
  
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function draw(){
  if (mode == 0) {
    // intro page setup
    pg.background(255);
    move2D();
    pg.rectMode(CENTER);

    // text box
    pg.push();
    pg.stroke(0);
    pg.strokeWeight(4);
    pg.noFill();
    pg.rect(width/2, height/2-40, 180, 200);
    pg.pop();
    
    // intro text
    let intro = "move your mouse around to change the spotlight position";
    pg.fill(0);
    pg.textAlign(CENTER);
    pg.textSize(14);
    pg.text(intro, width/2, height/2-50, 140, 80);

    //texture(pg);
    image(pg, 180, 200);
  }
  else {
    background(0);
    // set lights for 3D
    let locX = mouseX - width / 2;
    let locY = mouseY - height / 2;
    pointLight(255, 255, 255, locX, locY, 50);
    
    // set lights/color/location up for 2D
    move2D();
    colorMode(HSB);
    noLights();
  
    // calculate and draw waves
    makeWaves();
  
    // set lights/color/location back up for 3D
    move3D();
    colorMode(RGB);
    pointLight(255, 255, 255, locX, locY, 50);
  
    // draw sphere and its rings
    renderBall();
    renderOrbit();
  }
}

function updatemode() {
  mode = 1;
  a.hide();
}

function move2D() {
  translate(-width / 2, -height / 2, 0);
}

function move3D() {
  translate(width / 2, height / 2, 0);
}

function renderBall() {
  push();
  rotateY(millis() / 2000);
  rotateX(millis() / 2000);
  specularMaterial(250);
  shininess(50);
  sphere(45);
  pop();
}

function renderOrbit() {
  push();
  rotateY(millis() / 2000);
  specularMaterial(250);
  shininess(50);
  torus(70, 2, 50, 50);
  pop();

  push();
  rotateY(millis() / 3000);
  specularMaterial(250);
  shininess(50);
  torus(80, 2, 50, 50);
  pop();

  push();
  rotateX(millis() / 2000);
  specularMaterial(250);
  shininess(50);
  torus(55, 2, 50, 50);
  pop();
  
  push();
  rotateX(millis() / 3000);
  specularMaterial(250);
  shininess(50);
  torus(65, 2, 50, 50);
  pop();
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
    // white wave
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
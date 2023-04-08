// Grace Johnson
// Belonging: 

let c1, c2, t1, t2, s;
let waveSound, birdSound, crowdSound;
let people = [];
let numPeople;
let tones = [];
let playing = false;
let x;
let y = 0;
let dim = 30.0;
let shark, sand;
let umbrellas = [];
let waterTexture, shape, shape2;
var mode = 0;

function preload() {
  soundFormats('mp3', 'wav');
  waveSound = createAudio('assets/beach.mp3');
  birdSound = createAudio('assets/seagulls.mp3');
  crowdSound = createAudio('assets/crowd.wav');
  shark = loadImage('assets/shark1.png');
  sand = loadImage('assets/sandTexture.jpeg');
  waterTexture = loadImage('assets/waterTexture.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shape = createGraphics(width,height);
  shape2 = createGraphics(width,height);

  /*
  a = createButton("start");
  a.position(width/2, height/2);
  a.mousePressed(updatemode);
  a.center('horizontal');
  */

  waveSound.volume(0.25);
  birdSound.volume(0.7);
  crowdSound.volume(0.1);

  t1 = color(59,34,25);
  t2 = color(255,231,209);

  for(let j=0; j<70; j++){
    t = map(j,0,50,0,1);
    let newt = lerpColor(t2,t1,t);
    tones[j] = newt;
  }

  for (let i = 0; i < random(100,200); i++) {
    s = random(tones);
    people[i] = new Person(random(width), random(height/1.5), 6, 6, color(random(255), random(255), random(255)), s);
  }

  for (let q = 0; q < random(5,12); q++) {
    c = 1;
    umbrellas[q] = new Umbrella(random(width), random(height/2.6), color(random(255), random(255), random(255)));
  }

  x = width;
}

function mousePressed() {
  if (!playing) {
    waveSound.loop();
    birdSound.loop();
    crowdSound.loop();
  } else {
    waveSound.stop();
    birdSound.stop();
    crowdSound.stop();
  }
  playing = !playing;
}

function updatemode() {
  clear();
  mode = 1;
  a.hide();
}

function sinEase(x, scale) {
  return scale * 0.5 * sin(x) + 0.5;
}

function scaledNoise(position, time, speedScale = 1, zoomScale = 1, amplitudeScale = 1, offset = 0) {
  let positionInTime = position + (speedScale * time) + (offset * speedScale);
  return amplitudeScale * noise(positionInTime * zoomScale);
}

function drawShape(points, color, offset = .15*height) {
  fill(color);
  
  beginShape();
  
  for (let x = 0; x <= width; x++) {
    vertex(x, points[x] + offset);
  }
  
  vertex(width + 1, height + 1);
  vertex(0 , height + 1) ;
  
  endShape();
}

function drawShape3(points, color, offset = .15*height) {

  shape2.fill(color);
  shape2.noStroke();

  shape2.beginShape();
  
  for (let x = 0; x <= shape.width; x++) {
    shape2.vertex(x, points[x] + offset);
  }

  shape2.vertex(width + 1, height + 1);
  shape2.vertex(0 , height + 1);

  shape2.endShape();
  
  //image(shape2,0,0);
  //shape2.mask(waterTexture);

  //image(shape2,0,0);
  
}

function drawShape2(points, color, offset = .15*height) {
  
  shape.clear();

  shape.fill(color);
  shape.noStroke();

  shape.beginShape();
  
  for (let x = 0; x <= shape.width; x++) {
    shape.vertex(x, points[x] + offset);
  }
  
  shape.vertex(width + 1, height + 1);
  shape.vertex(0 , height + 1);

  shape.endShape();
  
  //image(waterTexture,0,0);
  //image(shape2,0,0);
  waterTexture.mask(shape2);
  //image(waterTexture,0,0);



  //shape.mask(shape2);
  image(waterTexture, 0, 0);
  image(shape, 0,0);
  
  //image(shape,0,0);
}



let levelOneNoiseScale = 0.02;
let levelTwoNoiseScale = 0.01;
let levelThreeNoiseScale = 0.001;

let t = 0;

function draw() {
  /*
  if (mode==0) {
    // intro page setup
    rectMode(CENTER);
    background(255);

    // text box
    push();
    stroke(0);
    noFill();
    strokeWeight(4);
    rect(width/2, height/2-40, 180, 200);
    pop();

    // intro text
    let intro = "click on the screen to play or stop the beach sounds";
    fill(0);
    textAlign(CENTER);
    textSize(14);
    text(intro, width/2, height/2-50, 140, 80);
  }
  else {
    */
    // gradient background
    c1 = color(246,215,169,255);
    c2 = color(255);

    for(let y=0; y<height; y++){
      n = map(y,0,height,0,1);
      let newc = lerpColor(c1,c2,n);
      stroke(newc);
      line(0,y,width, y);
    }

    /*
    push();
    sand.resize(width,height);
    tint(255, 40);
    image(sand, 0, 0);
    pop();
    */

    waterTexture.resize(width,height);

    noStroke();
    t += 0.25;
    let waves = [];

    for (let x = 0; x <= width; x++) {
      let levelOneNoise = scaledNoise(x, t, 1, levelOneNoiseScale, 1, 0);

      let levelTwoNoise = scaledNoise(x, t, 2, levelTwoNoiseScale, 2, 1000);
      let levelThreeNoise = scaledNoise(x, t, 3.5, levelThreeNoiseScale, 3, 5000);

      let noises = levelOneNoise + levelTwoNoise + levelThreeNoise;

      let noisesScaled = map(noises, 1, 5, 30, 140) + 50;

      waves.push(noisesScaled);
    }

    if (height <= 270) {
      //drawShape2(waves, color(0,75,107, 200), sinEase(t/13, 5) + 30);
      
      drawShape(waves, color(152,194,195), sinEase(t/19, 7)+5);
      drawShape(waves, color(0,129,155), sinEase(t/17, 6) + 15);
      drawShape3(waves, color(0,75,107), sinEase(t/13, 5) + 30);
      drawShape2(waves, color(0,75,107,240), sinEase(t/13, 5) + 30);
      //image(waterTexture, 0, 0);
      //waterTexture.clear();
    }
    else if (height <= 300){
      drawShape(waves, color(152,194,195), sinEase(t/19, 7) + 10);
      drawShape(waves, color(0,129,155), sinEase(t/17, 6) + 20);
      drawShape(waves, color(0,75,107), sinEase(t/13, 5) + 35);
    }
    else if (height <= 350) {
      drawShape(waves, color(152,194,195), sinEase(t/19, 7) + 30);
      drawShape(waves, color(0,129,155), sinEase(t/17, 6) + 40);
      drawShape(waves, color(0,75,107), sinEase(t/13, 5) + 55);
    }
    else if (height <= 480) {
      drawShape(waves, color(152,194,195), sinEase(t/19, 7) + 90);
      drawShape(waves, color(0,129,155), sinEase(t/17, 6) + 100);
      drawShape(waves, color(0,75,107), sinEase(t/13, 5) + 115);
    }
    else {
      drawShape(waves, color(152,194,195), sinEase(t/19, 7) + 150);
      drawShape(waves, color(0,129,155), sinEase(t/17, 6) + 160);

      // Animate by increasing our x value
      x = x - 0.2;
      // If the shape goes off the canvas, reset the position
      if (x < -20) {
        x = width;
      }
      // Even though our rect command draws the shape with its
      // center at the origin, translate moves it to the new
      // x and y position
      push();
      translate(x, height*0.9);
      shark.resize(50, 0);
      image(shark, -dim/2, -dim/2+30);
      pop();

      drawShape(waves, color(0,75,107, 240), sinEase(t/13, 5) + 175);
    }

    for (let i = 0; i < people.length; i++) {
      people[i].showPerson();
    }

    for (let j = 0; j < umbrellas.length; j++) {
      umbrellas[j].showUmbrella();
    }

  //}
}

class Person {
  constructor(x, y, s1, s2, c, s) {
    this.x = x;
    this.y = y;
    this.s1 = s1;
    this.s2 = s2;
    this.c = c;
    this.s = s;
  }

  showPerson() {
    stroke(this.c);
    strokeWeight(3);
    line(this.x, this.y, this.x, this.y+6);

    noStroke();
    fill(this.s);
    ellipse(this.x, this.y, this.s1, this.s2);
    
    this.x += random(-0.5, 0.5);
    this.y += random(-0.5, 0.5);
  }
}

class Umbrella {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
  }

  showUmbrella() {
    push();
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = -5;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(0);
    fill(255);
    ellipse(this.x, this.y, 20, 20);
    pop();

    push();
    angleMode(DEGREES);
    fill(this.c);
    arc(this.x, this.y, 20, 20, 0, 20);
    arc(this.x, this.y, 20, 20, 40, 60);
    arc(this.x, this.y, 20, 20, 80, 100);
    arc(this.x, this.y, 20, 20, 120, 140);
    arc(this.x, this.y, 20, 20, 160, 180);
    arc(this.x, this.y, 20, 20, 200, 220);
    arc(this.x, this.y, 20, 20, 240, 260);
    arc(this.x, this.y, 20, 20, 280, 300);
    arc(this.x, this.y, 20, 20, 320, 340);
    pop();
  }
}
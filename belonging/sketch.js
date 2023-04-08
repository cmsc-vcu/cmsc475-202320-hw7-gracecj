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
var mode = 0;

function preload() {
  soundFormats('mp3', 'wav');
  waveSound = createAudio('assets/beach.mp3');
  birdSound = createAudio('assets/seagulls.mp3');
  crowdSound = createAudio('assets/crowd.wav');
  shark = loadImage('assets/shark1.png');
  sand = loadImage('assets/sandTexture.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  a = createButton("start");
  a.position(width/2, height/2);
  a.mousePressed(updatemode);
  a.center('horizontal');

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

let levelOneNoiseScale = 0.02;
let levelTwoNoiseScale = 0.01;
let levelThreeNoiseScale = 0.001;

let t = 0;

function draw() {
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
    // gradient background
    c1 = color(246,215,169,255);
    c2 = color(255);

    for(let y=0; y<height; y++){
      n = map(y,0,height,0,1);
      let newc = lerpColor(c1,c2,n);
      stroke(newc);
      line(0,y,width, y);
    }

    push();
    sand.resize(width,height);
    tint(255, 40);
    image(sand, 0, 0);
    pop();

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
      drawShape(waves, color(152,194,195), sinEase(t/19, 7)+5);
      drawShape(waves, color(0,129,155), sinEase(t/17, 6) + 15);
      drawShape(waves, color(0,75,107), sinEase(t/13, 5) + 30);
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
  }
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
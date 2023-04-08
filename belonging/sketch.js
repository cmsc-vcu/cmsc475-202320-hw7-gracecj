// Grace Johnson
// Belonging:

//let SCENE_WIDTH = 1600;
let c1, c2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 454 240
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
  // gradient background
  c1 = color(0,103,214,255);
  c2 = color(185, 218, 248);

  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }

  noStroke();

  t += 0.25;

  let waves = [];
  let land = [];
  let mountains = [];

  for (let x = 0; x <= width; x++) {
    let levelOneNoise = scaledNoise(x, t, 1, levelOneNoiseScale, 1, 0);
    let levelOnebNoise = scaledNoise(x, t, 0.2, levelOneNoiseScale, 1, 0);

    let levelTwoNoise = scaledNoise(x, t, 2, levelTwoNoiseScale, 2, 1000);
    let levelTwobNoise = scaledNoise(x, t, 0.4, levelTwoNoiseScale, 2.5, 4000);
    let levelThreeNoise = scaledNoise(x, t, 3.5, levelThreeNoiseScale, 3, 5000);

    let noises = levelOneNoise + levelTwoNoise + levelThreeNoise;

    let noisesScaled = map(noises, 1, 5, 30, 140) + 50;
    let levelOneScaled = map(levelOnebNoise, 0, 5, 50, 200) - 20;
    let levelTwoScaled = map(levelTwobNoise, 0, 5, 50, 200) + 20;

    mountains.push(levelOneScaled);
    land.push(levelTwoScaled);
    waves.push(noisesScaled);
  }

  //drawShape(mountains, color(82, 90, 105));
  //drawShape(land, color(154, 171, 0));
  
  // Three versions of the waves with sine easing applied to the colour and position offsets.
  //drawShape(waves, color(0,75,107), sinEase(t/19, 7) + 100);
  //drawShape(waves, color(0,129,155), sinEase(t/17, 6) + 10);
  //drawShape(waves, color(152,194,195), sinEase(t/13, 5) + 20);

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
    drawShape(waves, color(0,75,107), sinEase(t/13, 5) + 175);
  }
  // 0,75,107
  // 0,129,155
  //152,194,195

}


let x, y;
let c;
let down;
let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //noCursor();

	// x coord of star
	x = width / 2;
	// x coord of star
  y = height / 2;
	// color of star
  c = 255;

	// random number of initial stars
	s = random(100,300);

	// add some stars with random values to the array
  for (let i = 0; i < s; i++) {
    stars[i] = new Star(random(width), random(height), random(255), random(0.1, 3), random(1));
  }
}

function draw() {
  background(0,0,35,25); 

	// show stars 
	for (let i = 0; i < stars.length; i++) {
    stars[i].twinkle();
    stars[i].showStar();
  }
}

function mouseDragged() {
	let x = mouseX;
	let y = mouseY;
  
	// place a star where mouse is
	let b = new Star(x, y, random(255), random(0.1, 3), random(1));
  stars.push(b);

	// make a cluster of stars follow
	starCluster(random(40,60), random(1,5));
}

function mousePressed() {
	let x = mouseX;
	let y = mouseY;
  
	// place a star where mouse is
	let b = new Star(x, y, random(255), random(0.1, 3), random(1));
  stars.push(b);

	// make a cluster of stars around it
	starCluster(random(40,60), random(5,10));
}

function starCluster(o, n) {
	// o = how far away from original star
	// n = how many stars in cluster
	for (let i = 0; i < n; i++) {
    let j = new Star(mouseX+random(1,o), mouseY+random(1,o), random(255), random(0.1, 3), random(1));
		stars.push(j);
  }
}

class Star {
	// constructor for star
  constructor(x, y, c, f, d) {
    this.x = x;
    this.y = y;
    this.c = c;
		this.f = f;
    this.down = d;
  }

	// draw stars from array
	showStar() {
    stroke(this.c)
    point(this.x, this.y);
  }

	// make stars twinkle
  twinkle() {
    if (this.c >= 255) {
      this.down = true;
    }
    if (this.c <= 0) {
      this.down = false;
    }

    if (this.down) {
      this.c -= this.f
    } else {
      this.c += this.f
    }
  }
}

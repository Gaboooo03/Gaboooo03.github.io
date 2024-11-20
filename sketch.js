let particles = [];
const maxParticles = 100;

function setup() {
  noCursor();
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("background-canvas"); // Asocia el lienzo al div del fondo
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }
  noCursor(); // Esconde el puntero predeterminado
}

function draw() {
  background(19, 94, 80, 50); // Fondo translúcido
  for (let particle of particles) {
    particle.move();
    particle.display();
    particle.checkProximity(mouseX, mouseY);
  }

  // Círculo animado como puntero personalizado
  noFill();
  stroke(255, 200, 100);
  strokeWeight(2);
  ellipse(mouseX, mouseY, 20, 20);
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.r = random(3, 8);
    this.color = color(random(255), random(255), random(255));
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r);
  }

  checkProximity(px, py) {
    const d = dist(this.x, this.y, px, py);
    if (d < 100) {
      this.color = color(random(255), random(255), random(255));
      this.vx += (this.x - px) * 0.01;
      this.vy += (this.y - py) * 0.01;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

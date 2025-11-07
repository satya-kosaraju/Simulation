const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const friction = 0.98;
const radius = 40;

// Two big balls
let ball1 = {
  x: canvas.width / 2 - 150,
  y: canvas.height / 2,
  vx: 3,
  vy: 0,
  color: "#00BFFF"
};

let ball2 = {
  x: canvas.width / 2 + 150,
  y: canvas.height / 2,
  vx: -3,
  vy: 0,
  color: "#FF6347"
};

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
}

function updateBall(ball) {
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.vx *= friction;
  ball.vy *= friction;

  // Stop if velocity is very low
  if (Math.abs(ball.vx) < 0.05) ball.vx = 0;
  if (Math.abs(ball.vy) < 0.05) ball.vy = 0;
}

function detectCollision() {
  const dx = ball2.x - ball1.x;
  const distance = Math.abs(dx);
  if (distance <= radius * 2 && dx > 0) {
    // Simple elastic collision: swap and reverse velocities
    let tempVx = ball1.vx;
    ball1.vx = -ball2.vx;
    ball2.vx = -tempVx;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall(ball1);
  drawBall(ball2);

  updateBall(ball1);
  updateBall(ball2);

  detectCollision();

  requestAnimationFrame(animate);
}

animate();

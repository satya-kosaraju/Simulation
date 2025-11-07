const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  resetBalls(); // re-center on resize
});

let ball1, ball2;

function createBall(x, y, vx) {
  return {
    x,
    y,
    vx,
    vy: 0,
    radius: 50,
    color: "rgba(100, 200, 255, 0.9)",
  };
}

function resetBalls() {
  const midY = canvas.height / 2;
  const offset = 150;
  ball1 = createBall(canvas.width / 2 - offset, midY, 3);
  ball2 = createBall(canvas.width / 2 + offset, midY, -3);
}
resetBalls();

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
}

function detectCollision(b1, b2) {
  const dx = b1.x - b2.x;
  const dy = b1.y - b2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < b1.radius + b2.radius;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update positions
  ball1.x += ball1.vx;
  ball2.x += ball2.vx;

  // Detect collision and reverse velocity
  if (detectCollision(ball1, ball2)) {
    const temp = ball1.vx;
    ball1.vx = ball2.vx;
    ball2.vx = temp;
  }

  // Apply friction (slow down)
  ball1.vx *= 0.98;
  ball2.vx *= 0.98;

  // Stop if very slow
  if (Math.abs(ball1.vx) < 0.05) ball1.vx = 0;
  if (Math.abs(ball2.vx) < 0.05) ball2.vx = 0;

  drawBall(ball1);
  drawBall(ball2);

  requestAnimationFrame(animate);
}

animate();

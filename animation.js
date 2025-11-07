const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Ball properties
const radius1 = 40;
const radius2 = 60;

const mass1 = 2; // smaller mass
const mass2 = 4; // bigger mass

let ball1 = {
  x: canvas.width / 2 - 300,
  y: canvas.height / 2,
  vx: 4,
  mass: mass1,
  radius: radius1,
  color: "#00BFFF",
};

let ball2 = {
  x: canvas.width / 2 + 300,
  y: canvas.height / 2,
  vx: -2,
  mass: mass2,
  radius: radius2,
  color: "#FF6347",
};

let hasCollided = false;

function drawBall(ball, label) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(label, ball.x - 10, ball.y + 5);
}

function updateBall(ball) {
  ball.x += ball.vx;
}

function detectAndHandleCollision() {
  const dx = ball2.x - ball1.x;
  const minDist = ball1.radius + ball2.radius;

  if (!hasCollided && Math.abs(dx) <= minDist) {
    hasCollided = true;

    // Use elastic collision equations
    const v1 = ball1.vx;
    const v2 = ball2.vx;
    const m1 = ball1.mass;
    const m2 = ball2.mass;

    const v1Final = ((m1 - m2) / (m1 + m2)) * v1 + (2 * m2 / (m1 + m2)) * v2;
    const v2Final = ((m2 - m1) / (m1 + m2)) * v2 + (2 * m1 / (m1 + m2)) * v1;

    ball1.vx = v1Final;
    ball2.vx = v2Final;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall(ball1, "m₁");
  drawBall(ball2, "m₂");

  updateBall(ball1);
  updateBall(ball2);

  detectAndHandleCollision();

  requestAnimationFrame(animate);
}

animate();

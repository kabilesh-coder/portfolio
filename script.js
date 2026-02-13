const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawStars);
}

drawStars();

/* Shooting Stars */

// ⭐ Realistic Shooting Star

function createShootingStar() {
    let startX = Math.random() * canvas.width;
    let startY = Math.random() * canvas.height / 2;

    let length = Math.random() * 70 + 50;
    let speed = Math.random() * 6 + 8;

    let opacity = 1;

    function animate() {
        ctx.save();
        ctx.globalAlpha = opacity;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX - length, startY + length);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "white";
        ctx.stroke();

        ctx.restore();

        startX -= speed;
        startY += speed;
        opacity -= 0.02;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

// Random interval shooting
setInterval(() => {
    createShootingStar();
}, 2500);

// Typing Animation

const roles = [
    "Junior Data Scientist",
    "Data Analyst"
];

let roleIndex = 0;
let charIndex = 0;
let currentRole = "";
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    currentRole = roles[roleIndex];

    if (!isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            setTimeout(() => isDeleting = true, 1200);
        }
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
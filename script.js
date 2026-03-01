const canvas = document.getElementById("demographicChart");
const ctx = canvas.getContext("2d");

let width, height;
let progress = 0;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const dataPoints = 40;

// Generate stylized demographic trend (aging ratio rising)
function generateData() {
    const data = [];
    for (let i = 0; i < dataPoints; i++) {
        const base = 0.4 + i * 0.01;
        const noise = Math.sin(i * 0.5) * 0.01;
        data.push(base + noise);
    }
    return data;
}

const data = generateData();

function drawChart() {
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(59,130,246,0.15)";
    ctx.beginPath();

    const padding = width * 0.1;
    const chartWidth = width - padding * 2;
    const chartHeight = height * 0.4;
    const startY = height * 0.6;

    data.forEach((value, index) => {
        const x = padding + (index / (dataPoints - 1)) * chartWidth;
        const animatedValue = value + Math.sin(progress + index * 0.2) * 0.005;
        const y = startY - animatedValue * chartHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
}

function animate() {
    progress += 0.01;
    drawChart();
    requestAnimationFrame(animate);
}

animate();

// Fade-in content
window.addEventListener("load", () => {
    document.querySelector(".fade-in").classList.add("visible");
});
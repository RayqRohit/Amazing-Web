let banner = document.querySelector(".banner");
let canvas = document.getElementById("dotsCanvas");
let ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;
}

// Initial resize
resizeCanvas();

// Resize canvas on window resize
window.addEventListener('resize', resizeCanvas);

let dots = [];
let arrayColors = [
    "#4a8d1f", "#f1c62e", "#9934f4", "#7c2a99", "#e4d832",
    "#41afc9", "#9a5742", "#1a8edb", "#d4f372", "#bc2fa9",
    "#89cb3e", "#215a8d", "#a83f9c", "#fe329b", "#433f88"
];

function createDots() {
    dots = [];
    const dotCount = window.innerWidth < 768 ? 30 : 50; // Fewer dots on smaller screens
    for (let index = 0; index < dotCount; index++) {
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: Math.random() * (window.innerWidth < 480 ? 2 : 3) + (window.innerWidth < 480 ? 3 : 5),
            color: arrayColors[Math.floor(Math.random() * arrayColors.length)]
        });
    }
}

createDots();

const drawDots = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
};

drawDots();

banner.addEventListener('mousemove', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x: e.pageX - banner.getBoundingClientRect().left,
        y: e.pageY - banner.getBoundingClientRect().top
    };

    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < (window.innerWidth < 768 ? 150 : 300)) { // Smaller interaction radius on mobile
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
});

banner.addEventListener('mouseout', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
});

// Recreate dots on resize to adjust their positions
window.addEventListener('resize', () => {
    resizeCanvas();
    createDots();
    drawDots();
});
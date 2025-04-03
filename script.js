let banner = document.querySelector(".banner")
let canvas = document.getElementById("dotsCanvas")

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let ctx = canvas.getContext("2d");

let dots = [];
let arrayColors = [
    "#4a8d1f",
    "#f1c62e",
    "#9934f4",
    "#7c2a99",
    "#e4d832",
    "#41afc9",
    "#9a5742",
    "#1a8edb",
    "#d4f372",
    "#bc2fa9",
    "#89cb3e",
    "#215a8d",
    "#a83f9c",
    "#fe329b",
    "#433f88"
];

for (let index = 0; index < 50; index++) {
    dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: arrayColors[Math.floor(Math.random() * 5)]

    })

}


const drawDots = () => {

    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();

        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    })


}

drawDots();

banner.addEventListener('mousemove', (e) => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x : e.pageX - banner.getBoundingClientRect().left,
        y : e.pageY - banner.getBoundingClientRect().top
    }

    dots.forEach(dot => {
        let distance  = Math.sqrt((mouse.x  - dot.x) ** 2 + (mouse.y - dot.y) **2);

        if(distance < 300){
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

        }
    })

})

banner.addEventListener('mouseout' , ()=>{
    ctx.clearRect(0 ,0, canvas.width, canvas.height);
    drawDots();
})

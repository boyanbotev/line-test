const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Line style settings
ctx.strokeStyle = 'white';
ctx.lineWidth = 1;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const pos = {
    x: null,
    y: null,
};

const lastPos = {
    x: null,
    y: null,
};

function drawCircle(){
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(pos.x, pos.y, 50, 0, Math.PI * 2);
    ctx.stroke();
}

canvas.addEventListener("click", function(e) {
    pos.x = e.x;
    pos.y = e.y;
    drawLine(pos);

});

function drawLine(pos){
    // If lastPos is not undefined
    if (lastPos.x != null && lastPos.y != null){  
        // Draw Line  
        console.log(ctx);
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        console.log(`Draw line from ${lastPos.x},${lastPos.y} to ${pos.x},${pos.y}`);
    }
    lastPos.x = pos.x;
    lastPos.y = pos.y;
}

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

const lineImageThickness = 10;

// Adjust canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust canvas size when window resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mousePos = {
    x: undefined,
    y: undefined,
};

const lastPos = {
    x: null,
    y: null,
};

canvas.addEventListener("click", (e) => {
    mousePos.x = e.x;
    mousePos.y = e.y;
    drawLineImage(mousePos);
    drawLine(mousePos);

    lastPos.x = mousePos.x;
    lastPos.y = mousePos.y;
});

function drawLineImage(pos) {
    // Get distance between two points using Pythagoras's theorem
    const xDistance = lastPos.x - pos.x;
    const yDistance = lastPos.y - pos.y;
    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    // Get image
    const line = new Image();
    line.src = "jem 1 glow.png";

    // Get middle of two points
    const averagePos = {
        x: (pos.x + lastPos.x)/2,
        y: (pos.y + lastPos.y)/2,
    }

    // Change Rotation
    rotateLineImage(averagePos, pos);

    // Centre the image:
    // Draw image at the x position between pos and lasPos, minus half the width of the line
    // And y position between the two points, minus half the height of the line
    ctx.drawImage(line, averagePos.x - (lineImageThickness/2), averagePos.y - (distance/2), lineImageThickness, distance);

    // Reset transformation matrix to the identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function rotateLineImage(averagePos, pos) {
    // Translate centre of context to centre of line
    ctx.translate(averagePos.x, averagePos.y);

    // Get angle of line
    angle = calculateAngle(averagePos.x, averagePos.y, pos.x, pos.y);
    // Add 90 degrees in radians
    angle += 1.5708;
    // Rotate
    ctx.rotate(angle);

    // Translate back
    ctx.translate(-averagePos.x, -averagePos.y);
}

// Calculate angle of line in radians
function calculateAngle(originX, originY, targetX, targetY) {
    var dx = originX - targetX;
    var dy = originY - targetY;
    
    var theta = Math.atan2(-dy, -dx);
    return theta;
}

function drawLine(pos) {
    // If lastPos is not null
    if (lastPos.x != null && lastPos.y != null){  
        // Draw Line  
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(pos.x, pos.y);
        // Line settings
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();

        console.log(`Draw line from ${lastPos.x},${lastPos.y} to ${pos.x},${pos.y}`);
    }
}
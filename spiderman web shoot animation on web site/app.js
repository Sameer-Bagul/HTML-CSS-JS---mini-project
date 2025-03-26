let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = banner.offsetWidth; // Use banner's width for canvas width
canvas.height = banner.offsetHeight; // Use banner's height for canvas height
let ctx = canvas.getContext('2d');

let dots = [];
let arrayColors = ['#ffffff', '#ff008c',"#ffa500", "#ff00ff", '#00b3ff'];

// Create dots with random positions and properties
for (let index = 0; index < 70; index++) {
    dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 2 + 3, // Make dots smaller
        color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
        originalX: 0,
        originalY: 0,
        connected: false // Track if the dot is connected
    });
}

// Function to draw dots on the canvas
const drawDots = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
};

// Initial draw of dots
drawDots();

// Function to handle mouse move
const handleMouseMove = (event) => {
    let mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    dots.forEach(dot => {
        dot.connected = false; // Reset connected status
        // Draw dot
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw line if mouse is close to dot
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 200) { // Increase the distance threshold
            dot.connected = true; // Mark dot as connected
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
};

// Function to handle mouse click
const handleMouseClick = (event) => {
    let clickPoint = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
    };

    // Save the original positions of the connected dots
    dots.forEach(dot => {
        if (dot.connected) {
            dot.originalX = dot.x;
            dot.originalY = dot.y;
        }
    });

    // Move connected dots to the click point
    dots.forEach(dot => {
        if (dot.connected) {
            dot.x = clickPoint.x;
            dot.y = clickPoint.y;
        }
    });

    drawDots(); // Redraw dots in their new positions

    // Animate connected dots back to original positions
    setTimeout(() => {
        dots.forEach(dot => {
            if (dot.connected) {
                let startX = dot.x;
                let startY = dot.y;
                let endX = dot.originalX;
                let endY = dot.originalY;
                let step = 0;
                let steps = 30;
                let interval = setInterval(() => {
                    if (step < steps) {
                        dot.x = startX + (endX - startX) * step / steps;
                        dot.y = startY + (endY - startY) * step / steps;
                        step++;
                        drawDots(); // Redraw dots at each step
                    } else {
                        clearInterval(interval);
                        drawDots(); // Final redraw
                    }
                }, 20);
            }
        });
    }, 0); // Delay before moving dots back
};

// Event listeners
banner.addEventListener('mousemove', handleMouseMove);
banner.addEventListener('click', handleMouseClick);

// Clear canvas on mouse leave
banner.addEventListener('mouseleave', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawDots(); // Redraw stationary dots
});

// Resize canvas with window resize
window.addEventListener('resize', () => {
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;
    drawDots(); // Redraw dots after resize
});

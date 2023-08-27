document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.querySelector("#gameCanvas");
    const ctx = canvas.getContext("2d");
    const gridSize = 6;
    const cellSize = 400 / gridSize;
    let points = [];

    canvas.addEventListener("click", handleCanvasClick);
    document.querySelector(".start-button").addEventListener("click", startGame);
    document.querySelector(".reset-button").addEventListener("click", resetGame);

    function handleCanvasClick(event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        let clickedPoint = {
            x: Math.floor(x / cellSize),
            y: Math.floor(y / cellSize)
        };

        if (isPointValid(clickedPoint)) {
            points.push(clickedPoint);
            drawGame();
        } else {
            alert("Invalid move! Try again.");
        }
    }

    function isPointValid(newPoint) {
        if (points.some(p => p.x === newPoint.x || p.y === newPoint.y)) {
            return false;
        }

        for (let i = 0; i < points.length; i++) {
            if (calculateSlope(points[i], newPoint) === calculateSlope(points[i], points[points.length - 1])) {
                return false;
            }
        }

        return true;
    }

    function calculateSlope(p1, p2) {
        if (p2.x === p1.x) return Infinity;
        return (p2.y - p1.y) / (p2.x - p1.x);
    }

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid lines
        for (let i = 1; i < gridSize; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, canvas.height);
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(canvas.width, i * cellSize);
            ctx.stroke();
        }

        // Draw points
        for (const point of points) {
            ctx.beginPath();
            ctx.arc((point.x + 0.5) * cellSize, (point.y + 0.5) * cellSize, cellSize / 3, 0, Math.PI * 2);
            ctx.fillStyle = "#FF3000";
            ctx.fill();
        }
    }

    function startGame() {
        points = [];
        drawGame();
        document.querySelector(".message").textContent = "Game has started! Click on the grid to place your points.";
    }

    function resetGame() {
        points = [];
        drawGame();
        document.querySelector(".message").textContent = "Game has been reset.";
    }

    startGame();
});

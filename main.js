// Get the canvas element
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var explosion_x, explosion_y;
var indicator = 0;
var score = 0;

// Set the canvas dimensions to fill the screen
canvas.width = window.innerWidth*0.8;
canvas.height = window.innerHeight*0.8;

// Create an array to hold the circles
var circles = [];

// Function to create a new circle
function createCircle() {
  if(circles.length < 11) {
  // Generate random x and y coordinates for the circle
  var x = Math.random() * (canvas.width*0.5);
  var y = Math.random() * (canvas.height*0.5);

  // Generate a random imgwidth for the circle
  var imgwidth = Math.random() * 50 + 50;

  // Generate random x and y velocity for the circle
  var xVelocity = Math.random() * 10 - 5;
  var yVelocity = Math.random() * 10 - 5;

  //create image
  var source;
  let idx = Math.random();
  if(idx<0.17)source = "img/ast0.png";
  else if(idx<0.34)source = "img/ast01.png";
  else if(idx<0.51)source = "img/ast02.png";
  else if(idx<0.68)source = "img/ast03.png";
  else if(idx<0.83)source = "img/ast04.png";
  else source = "img/ast05.png";

  // Create the circle object
  var circle = {
    x: x,
    y: y,
    imgwidth: imgwidth,
    imgheight: imgwidth,
    xVelocity: xVelocity,
    yVelocity: yVelocity,
    img: source
  };

  // Add the circle to the array
  circles.push(circle);}
}

function drawScoreboard() {
    ctx.font = "24px ModernW";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 30);
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        if (x+15 > circle.x && x-15 < circle.x + circle.imgwidth && y+15 > circle.y && y-15 < circle.y + circle.imgheight) {
            circles.splice(i, 1);
            i--;
            explosion_x = x;
            explosion_y = y;
            indicator = 100;
            score++;
        }
    }
});

// Function to move and draw the circles
function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Loop through the circles array
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    // Update the x and y position of the circle based on its velocity
    circle.x += circle.xVelocity;
    circle.y += circle.yVelocity;

    // Check if the circle has gone off the edge of the canvas
    if (circle.x + circle.imgwidth > canvas.width || circle.x< 0) {
      circle.xVelocity = -circle.xVelocity;
    }
    if (circle.y + circle.imgheight > canvas.height || circle.y< 0) {
      circle.yVelocity = -circle.yVelocity;
    }

    // Draw image 
    let image = new Image();
    image.src = circle.img;
    ctx.drawImage(image, circle.x, circle.y, circle.imgwidth, circle.imgheight);

    if(indicator>10){
        let imageExp = new Image();
        imageExp.src = "img/explosion1.png";
        ctx.drawImage(imageExp, explosion_x-indicator, explosion_y-indicator, 2*indicator, 2*indicator);
    }
    indicator = indicator-0.5;

  }

  drawScoreboard();

  // Call the animate function again on the next frame
  requestAnimationFrame(animate);
}

// Create a new circle every second
setInterval(createCircle, 800);

// Start the animation
animate();

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = form.elements.name.value;
    const message = form.elements.message.value;

    // Validate form inputs
    if (!name || !message) {
      alert("All fields are required!");
      return;
    }

    window.location.href = "mailto:ed18xy@brocku.ca?subject="+name+"&body="+message;

    // Reset form after submit
    form.reset();
  });
});


// Get the canvas element
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var explosion_x, explosion_y;
var indicator = 0;


// Set the canvas dimensions to fill the screen
canvas.width = window.innerWidth*0.8;
canvas.height = window.innerHeight*0.8;

// Create an array to hold the circles
var circles = [];

// Function to create a new circle
function createCircle() {
  if(circles.length < 5) {
  // Generate random x and y coordinates for the circle
  var x = Math.random() * (canvas.width*0.5);
  var y = Math.random() * (canvas.height*0.5);

  // Generate a random imgwidth for the circle
  var imgwidth = Math.random() * 50 + 50;

  // Generate random x and y velocity for the circle
  var xVelocity = Math.random() * 15 - 5;
  var yVelocity = Math.random() * 15 - 5;

  //create image
  var source;
  let idx = Math.random();
  if(idx<0.33)source = "ast.png";
  else if(idx<0.66)source = "ast2.png";
  else source = "ast3.png";

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

canvas.addEventListener("click", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    console.log( event.clientX+" "+ event.clientY);
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        if (x > circle.x && x < circle.x + circle.imgwidth && y > circle.y && y < circle.y + circle.imgheight) {
            circles.splice(i, 1);
            i--;
            explosion_x = x;
            explosion_y = y;
            indicator = 100;
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

    if(indicator>0){
        let imageExp = new Image();
        imageExp.src = "explosion.png";
        ctx.drawImage(imageExp, explosion_x, explosion_y, 2*indicator, 2*indicator);
    }
    indicator = indicator-1;

  }

  // Call the animate function again on the next frame
  requestAnimationFrame(animate);
}

// Create a new circle every second
setInterval(createCircle, 1000);

// Start the animation
animate();

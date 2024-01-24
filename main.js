// Get the canvas element
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var explosion_x, explosion_y;
var indicator = 0;
var score = 0;

// Set the canvas dimensions to fill the screen
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Create an array to hold the circles
var circles = [];

// Function to create a new circle
function createCircle() {
  if (circles.length < 11) {
    // Generate random x and y coordinates for the circle
    var x = Math.random() * (canvas.width * 0.5);
    var y = Math.random() * (canvas.height * 0.5);

    // Generate a random imgwidth for the circle
    var imgwidth = Math.random() * 50 + 50;

    // Generate random x and y velocity for the circle
    var xVelocity = Math.random() * 10 - 5;
    var yVelocity = Math.random() * 10 - 5;

    //create image
    var source;
    let idx = Math.random();
    if (idx < 0.17) source = "img/ast0.png";
    else if (idx < 0.34) source = "img/ast01.png";
    else if (idx < 0.51) source = "img/ast02.png";
    else if (idx < 0.68) source = "img/ast03.png";
    else if (idx < 0.83) source = "img/ast04.png";
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
    circles.push(circle);
  }
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
    if (x + 15 > circle.x && x - 15 < circle.x + circle.imgwidth && y + 15 > circle.y && y - 15 < circle.y + circle.imgheight) {
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
    if (circle.x + circle.imgwidth > canvas.width || circle.x < 0) {
      circle.xVelocity = -circle.xVelocity;
    }
    if (circle.y + circle.imgheight > canvas.height || circle.y < 0) {
      circle.yVelocity = -circle.yVelocity;
    }

    // Draw image 
    let image = new Image();
    image.src = circle.img;
    ctx.drawImage(image, circle.x, circle.y, circle.imgwidth, circle.imgheight);

    if (indicator > 10) {
      let imageExp = new Image();
      imageExp.src = "img/explosion1.png";
      ctx.drawImage(imageExp, explosion_x - indicator, explosion_y - indicator, 2 * indicator, 2 * indicator);
    }
    indicator = indicator - 0.5;

  }

  drawScoreboard();

  // Call the animate function again on the next frame
  requestAnimationFrame(animate);
}

// Create a new circle every second
setInterval(createCircle, 800);

// Start the animation
animate();

document.addEventListener("DOMContentLoaded", 
function () {

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.elements.name.value;
    const message = form.elements.message.value;

    // Validate form inputs
    if (!name || !message) {
      alert("All fields are required!");
      return;
    }

    window.location.href = "mailto:elyadenysova@gmail.com?subject=" + name + "&body=" + message;

    // Reset form after submit
    form.reset();
  });
});

//dynamically generate portfolio content
document.addEventListener('DOMContentLoaded', generatePortfolio());
window.addEventListener('resize', function(event) {generatePortfolio()});
function generatePortfolio(){
  const portfolioContent = [
    {
      contentPath: "https://www.figma.com/proto/V1i67CPtlrfBdj5PvNBPX1/Stage-4-Prototype---WORK-HERE?node-id=19-195&starting-point-node-id=19%3A195&mode=design&t=CijUGqwODb4JlUPL-1",
      image: "PCweb.png",
      description: "PC Building Website",
      type: "link"
    },
    {
      contentPath: "https://www.physics.brocku.ca/Labs/iOLab/",
      image: "iolab.png",
      description: "iOLab web development",
      type: "link"
    },
    {
      contentPath: "docs/article.pdf",
      image: "article.png",
      description: "MTO News Article",
      type: "download"
    },
    {
      contentPath: "https://www.instagram.com/p/CFScKoipTjJ/",
      image: "international.png",
      description: "Brock International: Interview",
      type: "link"
    },
    {
      contentPath: "docs/reflection.JPG",
      image: "reflection.JPG",
      description: "MTO Co-op Contribution Reflection",
      type: "download"
    },
    {
      contentPath: "docs/feedback.JPG",
      image: "feedback.JPG",
      description: "MTO Co-op Feedback",
      type: "download"
    },
    {
      contentPath: "https://padlet.com/elyadenysova/2p89labs",
      image: "feedbackS.png",
      description: "Student's Feedback",
      type: "link"
    },
    {
      contentPath: "https://www.linkedin.com/feed/update/urn:li:activity:7046505349331234816?utm_source=share&utm_medium=member_desktop",
      image: "spotlight.jpeg",
      description: "Brock Student Spotlight",
      type: "link"
    },
    {
      contentPath: "docs/Report.pdf",
      image: "report.png",
      description: "Cyber Web Security Project: Vulnerability Report",
      type: "download"
    },
    {
      contentPath: "https://github.com/ed18xy/chess",
      image: "chess.png",
      description: "Artificial Intelligence Project: Chess",
      type: "link"
    },
    {
      contentPath: "https://github.com/ed18xy/Genetic-Algorithms",
      image: "ga.png",
      description: "Artificial Intelligence Project: Genetic Algorithms Analysis",
      type: "link"
    },
    {
      contentPath: "https://github.com/ed18xy/ArtificialNeuralNetwork",
      image: "ann.png",
      description: "Artificial Neural Networks: Feed-Forward Network trained with Back-Propagation",
      type: "link"
    },
    {
      contentPath: "https://github.com/ed18xy/KaleidoscopePainter",
      image: "painter.png",
      description: "Graphics Project: Kaleidoscope Painter",
      type: "link"
    },
    {
      contentPath: "docs/transcript.pdf",
      image: "transcript.png",
      description: "Grades Transcript",
      type: "download"
    },
    {
      contentPath: "docs/coop1.pdf",
      image: "feedback1.png",
      description: "Co-op Spring2021 Employer Feedback",
      type: "download"
    },
    {
      contentPath: "docs/coop2.pdf",
      image: "feedback2.png",
      description: "Co-op Fall2021 Employer Feedback",
      type: "download"
    },
    {
      contentPath: "docs/coop3.pdf",
      image: "feedback3.png",
      description: "Co-op Spring2022 Employer Feedback",
      type: "download"
    },
    {
      contentPath: "docs/DH.pdf",
      image: "Dh1.png",
      description: "Brock Dean's Honour List - Year One",
      type: "download"
    },
    {
      contentPath: "docs/DH2.pdf",
      image: "Dh2.png",
      description: "Brock Dean's Honour List - Year Two",
      type: "download"
    },
    {
      contentPath: "docs/DH3.pdf",
      image: "Dh3.png",
      description: "Brock Dean's Honour List - Year Three",
      type: "download"
    },
    {
      contentPath: "docs/GM.pdf",
      image: "GM.png",
      description: "Brock General Motors of Canada Scholars Award",
      type: "download"
    },
    {
      contentPath: "https://padlet.com/elyadenysova/robloxstudio-axzqqmso7yg555q9",
      image: "scripts.png",
      description: "CodeNinjas Roblox Scripts",
      type: "link"
    },
    {
      contentPath: "https://www.roblox.com/games/7738320878/Magic-Forest-Adventure-Secret-of-the-Lost-Village",
      image: "adventure.png",
      description: "Roblox Monetized Adventure Game",
      type: "link"
    },
    {
      contentPath: "https://www.roblox.com/games/7738483938/Space-Advanced-Obby-Beat-It-If-YOU-Can",
      image: "obby.png",
      description: "Roblox Monetized Obby Game",
      type: "link"
    },
    {
      contentPath: "docs/Certificate.pdf",
      image: "certificate.png",
      description: "Live4Dance Club Member of the Month",
      type: "download"
    },
    {
      contentPath: "docs/l4d.JPG",
      image: "l4d.JPG",
      description: "Live4Dance Club: My Class",
      type: "download"
    }
  ];
  const portfolio = document.getElementById('portfolio');
  portfolio.innerHTML = "";
  itemsInLine = Math.floor(window.innerWidth/200);
  for (let i = 0; i < portfolioContent.length / itemsInLine; i++) {
    var contentRow = document.createElement('div');
    contentRow.classList.add('contentRow');
    for (let index = 0; (index + itemsInLine * i < portfolioContent.length) && (index < itemsInLine); index++) {
      var containerDoc = document.createElement('div');
      containerDoc.classList.add('containerDoc');
      containerDoc.style.width = (150 / itemsInLine) + '%';
      var itemIndex = index + itemsInLine * i;
      containerDoc.innerHTML = '<div class="preview-container"><a href="'
        + portfolioContent[itemIndex].contentPath + '" download title="Click to open"><img id="doc1img" class="sectionPimg" src="img/'
        + portfolioContent[itemIndex].image + '" alt="Document Preview"></a></div>'
        + portfolioContent[itemIndex].description + '<a href="'
        + portfolioContent[itemIndex].contentPath + '" download><i class="fa fa-'
        + portfolioContent[itemIndex].type + '"></i></a>'
      contentRow.appendChild(containerDoc);
    }
    portfolio.appendChild(contentRow);
  }
}


p5.disableFriendlyErrors = true; // disables FES

// var dots = [];
let numOfDots = 100;
// let pos;
var lisDot;
let glitchOverlayImg;
let showGlitched = false;
let glitch;


function setup() {
  noStroke();
  createCanvas(1280, 720);



  lisDot = new LisDotSystem();
  lisDot.setup(numOfDots);

  glitchOverlayImg = createImage(1280,720);


}

function draw() {
  background(0);
  translate(width/2,height/2);


  if(showGlitched) {
    push();
    translate(-width/2,-height/2);
    glitch.show();
    pop();
  } else {
    lisDot.draw();
  }

}


function mouseClicked() {
  connectDots(5);
}

function touchStarted() {
  connectDots(5);
}

function keyTyped() {
  if (key === 'k') {
    lisDot.destroyRandomDot();
  }
  // if (key === 'g') {
  //   glitchOverlay();
  //   showGlitched = true;
  // }
}

function keyPressed() {
  if (key === 'g') {
    glitchOverlay();
    showGlitched = true;
  }
}

function keyReleased() {
  if (key === 'g') {
    showGlitched = false;
  }
}

function connectDots(dots) {
  for (let i = 0; i < dots; i++) {
    lisDot.connectRandomDot();
  }
}

function glitchOverlay() {
  glitchOverlayImg = get();
  glitch = new Glitch(glitchOverlayImg);
  // loadImage(glitchOverlayImg, function(img) {
  //     glitch = new Glitch(img);
  //   });
}

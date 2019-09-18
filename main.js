p5.disableFriendlyErrors = true; // disables FES

// var dots = [];
let numOfDots = 100;
// let pos;
var lisDot;


function setup() {
  noStroke();
  createCanvas(1280, 720);


  lisDot = new LisDotSystem();
  lisDot.setup(numOfDots);


}

function draw() {
  background(0);
  translate(width/2,height/2);


  lisDot.draw();

}


function mouseClicked() {
  connectDots(5);
}

function keyTyped() {
  if (key === 'k') {
    lisDot.destroyRandomDot();
  }
}

function connectDots(dots) {
  for (let i = 0; i < dots; i++) {
    lisDot.connectRandomDot();
  }
}

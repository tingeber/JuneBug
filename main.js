var dots = [];
// let numOfDots = 200;
let pos;
var lisDot;


function setup() {
  noStroke();
  createCanvas(1280, 720);

  // var dot1 = new Dot();
  //
  // pos = createVector(abs(random(100)), abs(random(100)));
  //
  // dot1.setup(pos);
  //
  // dots.push(dot1);

  // for(let i=0; i<numOfDots; i++) {
  //   let x = abs(random(width-10/width));
  //   let y = abs(random(height-10/height));
  //   let pos = createVector(x,y);
  //
  //   let d = new Dot();
  //   d.setup(pos);
  //   dots.push(d);
  // }

  lisDot = new LisDotSystem();
  lisDot.setup(100);


}

function draw() {
  background(30);
  translate(width/2,height/2);


  lisDot.draw();

}

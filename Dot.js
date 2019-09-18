const radius = 5;
var jiggleRoom = 1;
const noiseIncrease = 0.03;
var easeCounter = 0;



class Dot {
  constructor(){
    // jiggling offsets
    this.xoff = random(100);
    this.yoff = random(100);

     // boolean that defines the state the node is in
     this.isConnected = false;

     this.offsetX = 0;
     this.offsetY = 0;

     this.offset = createVector(0,0);
     this.initLoc = createVector(0,0);
  }

  setup(pos) {
    // passed from LisNodeSystem
    this.location = pos;
    this.initLoc.set(pos);

  }

  draw() {
    if(this.isConnected) {
        let breathLerp = map(sin(radians(millis()*0.1)), -1, 0.5, 0, 1, true);
        let white = color(255);
        let black = color(0,100);
        let breathDot = lerpColor(white, black, breathLerp);
        fill(breathDot);
        circle(this.location.x, this.location.y, radius);
    }

    // if they're not connected, they're simple dots
    else {
        noStroke();
        fill(255, 100);
        circle(this.location.x, this.location.y, radius);
        noFill();
        // stroke(230);
        // rectMode(CENTER);
        // rect(this.initLoc.x, this.initLoc.y, 20, 20);
    }
  }

  jiggle() {
    // this.offset.x = map(noise(this.xoff), 0, 1,  -jiggleRoom, jiggleRoom);
    // this.offset.y = map(noise(this.yoff), 0, 1, -jiggleRoom, jiggleRoom);

    this.offset.set(map(noise(this.xoff), 0, 1,  -jiggleRoom, jiggleRoom, true), map(noise(this.yoff), 0, 1, -jiggleRoom, jiggleRoom, true));


    this.xoff += noiseIncrease;
    this.yoff += noiseIncrease;


    // if nodes are connected, ease them into their default position
   if(this.isConnected) {
     let easing = 0.1;
     this.location.x = this.location.x + (this.initLoc.x - this.location.x) * easing;
     this.location.y = this.location.y + (this.initLoc.y - this.location.y) * easing;
   }
   // otherwise, have them stroll around the screen
   else {
      this.location.add(this.offset);
   }
  }

}

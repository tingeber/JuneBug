const radius = 5;
var jiggleRoom = 8;
const noiseIncrease = 0.1;
// var isConnected = true;
var easeCounter = 0;



class Dot {
  constructor(){
    // jiggling offsets
    this.xoff = random(50);
    this.yoff = random(50);

     // boolean that defines the state the node is in
     this.isConnected = true;

     this.offsetX = 0;
     this.offsetY = 0;

     this.offset = createVector(0,0);
  }

  setup(pos) {
    // passed from LisNodeSystem
    this.location = pos;
    this.initLoc = pos;

  }

  // setup(x,y) {
  //   // passed from LisNodeSystem
  //   this.location = createVector(x,y);
  //   this.initLoc = createVector(x,y);
  // }

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
        fill(255, 100);
        circle(this.location.x, this.location.y, radius);
    }
  }

  jiggle() {
    this.offset.x = map(noise(this.xoff), 0, 1,  -10, 10);
    this.offset.y = map(noise(this.yoff), 0, 1, -10, 10);

    // this.offsetX = map(noise(this.xoff), 0, 1,  this.initLoc.x-jiggleRoom, this.initLoc.x+jiggleRoom, true);
    // this.offsetY = map(noise(this.yoff), 0, 1, this.initLoc.y-jiggleRoom, this.initLoc.y+jiggleRoom, true);
    this.xoff +=noiseIncrease;
    this.yoff +=noiseIncrease;


    // if nodes are connected, ease them into their default position
   if(this.isConnected) {
       this.easeToInit();
       easeCounter++;
   }
   // otherwise, have them stroll around the screen
   else {

     // let v3 = p5.Vector.add(this.location, this.offset);
     // this.location.add(this.offsetX, this.offsetY);

     // this.location.x = this.offsetX;
     // this.location.y = this.offsetY;

     // this.location += this.offset;

      // this.location.x -= this.offsetX;
      // this.location.y -= this.offsetY;

      // this.location.set(this.location.x+this.offset.x, this.location.y+this.offset.y);

      this.location.add(this.offset);
   }
  }

  easeToInit() {
    this.location = this.initLoc;
  }

}

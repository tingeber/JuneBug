
const cloudBox = 1200;


class Cloud {
  constructor() {

    this.location = createVector(0,0);
    this.angleStore = [];

    this.angleCounter = 0;

    this.pg = createGraphics(cloudBox,cloudBox);
    this.bgCloud = this.pg.get();
    this.bgCloud.loadPixels();

    for(let i=0; i<10000; i++) {
      this.angleStore.push(random(90));
    }
  }

  draw() {


    push();
    // noStroke();
    fill(0,0,0, map(noise(millis()*0.1),0,1,0,100)); // set a pulsing black transparent fill
    circle(this.location.x,this.location.y,400); // draw a circle filled with it
    pop();
    push();
    imageMode(CENTER);
    image(this.bgCloud,this.location.x,this.location.y,cloudBox/2,cloudBox/2); // draw the captured cloud
    pop();


  }

  dotDestruction(x, y) {
    this.location.set(x,y);
    push();
    // this.pg.background(200, 100);
    this.pg.stroke(255,0,0, 5);
    this.pg.strokeWeight(4);
    this.faultLine(30, cloudBox/2, cloudBox/2);
    pop();

    this.bgCloud = this.pg.get(0,0,cloudBox,cloudBox);

    // this.pg.loadPixels(); // Fill up source's pixels[] w/ its current content
    // this.bgCloud.set(this.pg); // Transfer it all to destination's
    // this.bgCloud.updatePixels(); // Refresh destination w/ transferred content
 }


  faultLine(len, x,y) {
   if (len>2) {
     push();
     this.pg.translate(x,y);
     this.pg.rotate(this.angleStore[this.angleCounter]);
     this.pg.line(0,0,len,len);
     this.angleCounter++;
     this.faultLine(len*0.8,len,len);
     this.faultLine(len*0.8,0,0);
     pop();
     // push();
     // line(0,0,-len,-len);
     // faultLine(len*0.25,-len,-len);
     // pop();
   } else {
     // this.angleCounter = 0;
     return false;
   }
 }
}

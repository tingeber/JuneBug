const connectionRadius = 350; //was 400
const connectionRamp = 6;
const lineAlpha = 150;


class LisDotSystem {
  constructor() {
    // lissajous parameters - new shape at each setup
    this.freqX = int(random(11));
    this.freqY = int(random(11));
    this.phi = int(map(random(1),0,1,-10,10)*15);
    this.modFreqX = int(random(11));
    this.modFreqY = int(random(11));

    this.dots = [];

    this.isComplete = false;
    this.numDotsConnected = 0;
    this.numDotsDestroyed = 0;
    this.timeCompleted = 0;
  }

  setup(_numOfDots) {

    this.numOfDots = _numOfDots;

    // cleaning up existing, if any
    // dots.clear();
    // roots.clear();

    // resetting counters and bools
    // killNumber = 0;
    // nodeCounter = 0;


    // filling the dots vector with Dots
    for (let i = 0; i < this.numOfDots; i++) {
        let a = this.numOfDots;
        let angle = map(i, 0, a, 0, TWO_PI);

        // defining positions as per lissajous function
        let x = sin(angle * this.freqX + radians(this.phi) ) * cos(angle * this.modFreqX);
        let y = sin(angle * this.freqY) * cos(angle * this.modFreqY);

        // scaling up the lissajous shape
        x = x * 600;
        y = y * 300;

       // packaging x and y into a vector so it can be passed to dots
        this.pos = createVector(x,y);

        // node setup
        let d = new Dot;
        d.setup(this.pos);
        this.dots.push(d);
    }

  }

  draw() {
    // Draws lines between nodes, if they are connected
   this.drawConnections();


   // draws nodes
   for (let i = 0; i < this.numOfDots; i++) {
       this.dots[i].draw();
       this.dots[i].jiggle();
   }

   }


  drawConnections() {
      var d;
      var a; // distance and alpha

    // measuring distance between each node,
    // deciding whether the line is drawn or not based on distance,
    // defining opacity of the line drawn
    for (let i1 = 0; i1 < this.numOfDots; i1++) {
        for (let i2 = 0; i2 < i1; i2++) {
            let p1 = this.dots[i1].location;
            let p2 = this.dots[i2].location;


            // d =  p5.Vector.dist(p1, p2);
            d = distSquared(p1.x, p1.y, p2.x, p2.y);
            // d = Math.sqrt(d);
            // a = Math.pow(1/(d/connectionRadius+1), connectionRamp); // normalised value, gets bigger as distance is closer


            // only draw if close enough
            if (d <= (connectionRadius * connectionRadius)) {
                // only draw if one of the two nodes are connected
                if(
                   this.dots[i1].isConnected == true || this.dots[i2].isConnected == true)
                   {
                    d = Math.sqrt(d);
                    a = Math.pow(1/(d/connectionRadius+1), connectionRamp); // normalised value, gets bigger as distance is closer
                    stroke(255, 255, 255, a*lineAlpha); // max alpha reduced by a
                    line(p1.x, p1.y, p2.x, p2.y);
                } // nodes
            } // radius
        } // for loop
    } // for loop
    }

    connectRandomDot() {
      let randomDot = floor(random(this.dots.length));
      console.log(randomDot);

      if(this.numDotsConnected < this.dots.length-this.numDotsDestroyed) {
        if (this.dots[randomDot].isConnected == false && this.dots[randomDot].isDestroyed == false) {
          this.dots[randomDot].isConnected = true;
          this.numDotsConnected+=1;
          console.log('we connected dot number '+randomDot+'. '+this.numDotsConnected+' dots connected, '+this.numDotsDestroyed+' dots destroyed.');
        } else {
          this.connectRandomDot();
        }
      } else {
        this.isComplete = true;
        console.log('All dots are connected or destroyed.');
        this.timeCompleted = millis();
      }

    }

    destroyRandomDot() {
      let randomDot = floor(random(this.dots.length));
      console.log(randomDot);

      if(this.numDotsDestroyed < (this.dots.length)-this.numDotsConnected) {
        if (this.dots[randomDot].isConnected == false && this.dots[randomDot].isDestroyed == false) {
          this.dots[randomDot].isDestroyed = true;
          this.numDotsDestroyed+=1;
          console.log('we killed dot number '+randomDot+'. ' +this.numDotsDestroyed+' dots destroyed, '+this.numDotsConnected+' connected.');
        } else {
          this.destroyRandomDot();
        }
      } else {
        this.isComplete = true;
        console.log('All dots are connected or destroyed.');
        this.timeCompleted = millis();
      }
    }

}


function distSquared(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return dx * dx + dy * dy;
}

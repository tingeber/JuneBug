var isComplete = false;
var dots = [];

const connectionRadius = 400; //was 400
const connectionRamp = 6;
const lineAlpha = 150;

var d;
var a; // distance and alpha

class LisDotSystem {
  constructor() {
    // lissajous parameters - new shape at each setup
    this.freqX = map(random(1), 0,1,1,10);
    this.freqY = map(random(1), 0,1,1,10);
    this.phi = map(random(1),0,1,-10,10)*15;
    this.modFreqX = map(random(1),0,1,1,10);
    this.modFreqY = map(random(1),0,1,1,10);
  }

  setup(_numOfDots) {

    this.numOfDots = _numOfDots;

    // cleaning up existing, if any
    // dots.clear();
    // roots.clear();

    // resetting counters and bools
    // killNumber = 0;
    // nodeCounter = 0;


    // filling the nodes and roots vector w Nodes and Roots
    for (let i = 0; i < this.numOfDots; i++) {
        let a = this.numOfDots;
        let angle = map(i, 0, a, 0, TWO_PI);

        // defining positions as per lissajous function
        let x = sin(angle * this.freqX + radians(this.phi) ) * cos(angle * this.modFreqX);
        let y = sin(angle * this.freqY) * cos(angle * this.modFreqY);

        // scaling up the lissajous shape
        x = x * 600;
        y = y * 300;

       // packaging x and y into a vector so it can be passed to dots and roots
        this.pos = createVector(x,y);

        // node setup
        let d = new Dot;
        d.setup(this.pos);
        dots.push(d);

        // root setup
        // Root r;
        // r.setup(pos);
        // roots.push_back(r);
    }

  }

  draw() {
    // Draws lines between nodes, if they are connected
   this.drawConnections();


   // draws nodes
   for (let i = 0; i < this.numOfDots; i++) {
       dots[i].draw();
       dots[i].jiggle();
   }

   // draws roots
   // for(int i = 0; i<roots.size(); i++) {
   //     roots[i].draw();


   }


  drawConnections() {
        // let d;
        // let a; // distance and alpha

    // measuring distance between each node,
    // deciding whether the line is drawn or not based on distance,
    // defining opacity of the line drawn
    for (let i1 = 0; i1 < this.numOfDots; i1++) {
        for (let i2 = 0; i2 < i1; i2++) {
            let p1 = dots[i1].location;
            let p2 = dots[i2].location;

            // d = dist(p1.x,p1.y,p2.x,p2.y);
            d = p1.dist(p2);
            a = pow(1/(d/connectionRadius+1), connectionRamp); // normalised value, gets bigger as distance is closer

            // stroke(0, 0, 0, a*lineAlpha); // max alpha reduced by
            // line(p1.x, p1.y, p2.x, p2.y);

            // only draw if close enough
            if (d <= connectionRadius) {
                // only draw if one of the two nodes are connected
                if(
                   dots[i1].isConnected == true ||
                   dots[i2].isConnected == true)
                   {
                    stroke(255, 255, 255, a*lineAlpha); // max alpha reduced by a
                    line(p1.x, p1.y, p2.x, p2.y);
                    // line(dots[i1].location.x, dots[i1].location.y, dots[i2].location.x, dots[i2].location.y);
                } // nodes
            } // radius
        } // for loop
    } // for loop
    }


}

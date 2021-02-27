import p5 from "p5"
import HalfKite from "./half_kite"

const sketch = (p: p5) => {
  var hk = new HalfKite();

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
    p.noStroke();
    p.background("#131821");
    var str = hk.hello();
    console.log(str);
  };


  p.draw = () => {
    p.fill(p.color("fffbe3"));
    let l = Math.max(p.width, p.height) / 3;
    p.translate(p.width / 2, p.height / 2);
    p.triangle(0, 0, l, 0, l * p.cos(36), l * p.sin(36));
    p.triangle(0, 0, l, 0, l * p.cos(36), -l * p.sin(36));
  };


};

new p5(sketch);

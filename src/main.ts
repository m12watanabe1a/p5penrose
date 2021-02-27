import p5 from "p5"

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
    p.noStroke();
    p.background("#131821");
  };


  p.draw = () => {
    p.fill(p.color("fffbe3"));
    let l = p.width / 3;
    p.translate(p.width / 2, p.height / 2);
    p.triangle(0, 0, l, 0, l*p.cos(36), l*p.sin(36));
    p.triangle(0, 0, l, 0, l*p.cos(36), -l*p.sin(36));
  };

};

new p5(sketch);

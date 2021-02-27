import p5 from "p5"
import HalfKite from "./half_kite"
import HalfDart from "./half_dart"

const sketch = (p: p5) => {
  var hk_list: HalfKite[] = [];
  var new_hk_list: HalfKite[] = [];
  var hd_list: HalfDart[] = [];
  var new_hd_list: HalfDart[] = [];

  const initHalfKite = () => {

  }

  const drawHalfKite = (hk: HalfKite) => {
    p.fill(p.color("#00ff00"));
    p.triangle(
      hk.pointA.x, hk.pointA.y,
      hk.pointB.x, hk.pointB.y,
      hk.pointC.x, hk.pointC.y
    );
  }

  const drawHalfDart = (hk: HalfDart) => {
    p.fill(p.color("#ff0000"));
    p.triangle(
      hk.pointA.x, hk.pointA.y,
      hk.pointB.x, hk.pointB.y,
      hk.pointC.x, hk.pointC.y
    );
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
    p.background("#131821");

    let l = Math.max(p.width, p.height) * 0.25;
  };

  var loop_num = 0;
  p.draw = () => {
    p.translate(p.width / 2, p.height / 2);

    hk_list.forEach(hk => {
      drawHalfKite(hk);
      hk.YieldHalfKiteList().forEach(kite => {
        new_hk_list.push(kite);
      });
      hk.YieldHalfDartList().forEach(dart => {
        hd_list.push(dart)
      })
    });
    hd_list.forEach(hd => {
      drawHalfDart(hd);
      // hd.YieldHalfKiteList().forEach(kite => {
      //   new_hk_list.push(kite);
      // });
      hd.YieldHalfDartList().forEach(dart => {
        new_hd_list.push(dart)
      })
    })
    console.log(new_hd_list);
    hk_list = new_hk_list;
    hd_list = new_hd_list;
    if (loop_num > 2) p.noLoop();
    loop_num++;
  };


};

new p5(sketch);

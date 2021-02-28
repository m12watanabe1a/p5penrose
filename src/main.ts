import p5 from "p5"
import HalfKite from "./half_kite"
import HalfDart from "./half_dart"
import Point from "./point"

const sketch = (p: p5) => {
  var kite_list: HalfKite[] = [];
  var new_kite_list: HalfKite[] = [];
  var dart_list: HalfDart[] = [];
  var new_dart_list: HalfDart[] = [];
  let canvas;

  // const KITE_COLOR1 = p.color("#071a52");
  // const KITE_COLOR2 = p.color("#086972");
  // const DART_COLOR1 = p.color("#17b978");
  // const DART_COLOR2 = p.color("#a7ff83");

  const KITE_COLOR1 = p.color("#ec610a");
  const KITE_COLOR2 = p.color("#ffc300");
  const DART_COLOR1 = p.color("#6b0848");
  const DART_COLOR2 = p.color("#a40a3c");

  const drawHalfKite = (kite: HalfKite) => {
    p.fill(kite.isMirror ? KITE_COLOR1 : KITE_COLOR2);
    p.triangle(
      kite.pointA.x, kite.pointA.y,
      kite.pointB.x, kite.pointB.y,
      kite.pointC.x, kite.pointC.y
    );
  }

  const drawFullKite = (kite: HalfKite) => {
    p.fill(kite.isMirror ? KITE_COLOR1 : KITE_COLOR2);
    p.triangle(
      kite.pointA.x, kite.pointA.y,
      kite.pointB.x, kite.pointB.y,
      kite.pointC.x, kite.pointC.y
    );
    p.fill(kite.isMirror ? KITE_COLOR2 : KITE_COLOR1);
    p.triangle(
      kite.pointA.x, -kite.pointA.y,
      kite.pointB.x, -kite.pointB.y,
      kite.pointC.x, -kite.pointC.y
    );
  }

  const drawHalfDart = (dart: HalfDart) => {
    p.fill(dart.isMirror ? DART_COLOR1 : DART_COLOR2);
    p.triangle(
      dart.pointA.x, dart.pointA.y,
      dart.pointB.x, dart.pointB.y,
      dart.pointC.x, dart.pointC.y
    );
  }

  const drawFullDart = (dart: HalfDart) => {
    p.fill(dart.isMirror ? DART_COLOR1 : DART_COLOR2);
    p.triangle(
      dart.pointA.x, dart.pointA.y,
      dart.pointB.x, dart.pointB.y,
      dart.pointC.x, dart.pointC.y
    );
    p.fill(dart.isMirror ? DART_COLOR2 : DART_COLOR1);
    p.triangle(
      dart.pointA.x, -dart.pointA.y,
      dart.pointB.x, -dart.pointB.y,
      dart.pointC.x, -dart.pointC.y
    );
  }

  const initKite = (l: number) => {
    let PointA: Point = { x: 0, y: 0 };
    let PointB: Point = { x: l, y: 0 };
    let PointC: Point = { x: l / 2, y: l / 2 * p.tan(36) };
    let dart = new HalfDart(PointA, PointB, PointC);
    dart_list.push(dart);
  }

  const initDart = (l: number) => {
    let PointA: Point = { x: 0, y: 0 };
    let PointB: Point = { x: l, y: 0 };
    let PointC: Point = { x: l * p.cos(36), y: l * p.sin(36) };
    let kite = new HalfKite(PointA, PointB, PointC);
    kite_list.push(kite);
  }

  const yieldNewDartFromKite = (kite: HalfKite): HalfDart[] => {
    let tmp: HalfDart[] = [];
    tmp.push(new HalfDart(kite.pointA, kite.pointD, kite.pointE));
    tmp.push(new HalfDart(kite.pointA, kite.pointF, kite.pointE));
    return tmp;

  }

  const yieldNewKiteFromKite = (kite: HalfKite): HalfKite[] => {
    let tmp: HalfKite[] = [];
    tmp.push(new HalfKite(kite.pointC, kite.pointD, kite.pointB));
    tmp.push(new HalfKite(kite.pointC, kite.pointD, kite.pointE));
    return tmp;
  }

  const yieldNewDartFromDart = (dart: HalfDart): HalfDart[] => {
    let tmp: HalfDart[] = [];
    tmp.push(new HalfDart(dart.pointB, dart.pointC, dart.pointD));
    tmp.push(new HalfDart(dart.pointB, dart.pointE, dart.pointD));
    return tmp;
  }

  const yieldNewKiteFromDart = (dart: HalfDart): HalfKite[] => {
    let tmp: HalfKite[] = [];
    tmp.push(new HalfKite(dart.pointA, dart.pointC, dart.pointD));
    return tmp;
  }

  p.setup = () => {
    canvas = p.createCanvas(p.windowHeight, p.windowHeight);
    p.angleMode(p.DEGREES);
    p.background("#131821");
    p.noStroke();
    p.frameRate(1);

    kite_list = [];
    dart_list = [];
    let l = Math.min(p.width, p.height) * 0.3;
    initDart(l);
  };

  var loop_num = 0;
  p.draw = () => {
    p.translate(p.width / 2, p.height / 2);
    new_dart_list = [];
    new_kite_list = [];

    kite_list.forEach(kite => {
      yieldNewKiteFromKite(kite).forEach(kite_child => {
        new_kite_list.push(kite_child);
      });
      yieldNewDartFromKite(kite).forEach(dart_child => {
        new_dart_list.push(dart_child);
      })
    });

    dart_list.forEach(dart => {
      yieldNewDartFromDart(dart).forEach(dart_child => {
        new_dart_list.push(dart_child);
      });
      yieldNewKiteFromDart(dart).forEach(kite_child => {
        new_kite_list.push(kite_child);
      })
    })

    for (let i = 0; i < 5; i++) {
      p.rotate(72);
      new_dart_list.forEach(dart => {
        drawFullDart(dart);
      })

      new_kite_list.forEach(kite => {
        drawFullKite(kite);
      })
    }

    if (loop_num > 6) p.noLoop();
    // p.saveCanvas(canvas, 'img'+loop_num, 'png');

    kite_list = new_kite_list;
    dart_list = new_dart_list;
    loop_num++;
  };


};

new p5(sketch);

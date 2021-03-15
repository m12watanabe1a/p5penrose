import p5 from "p5"
import HalfKite from "./half_kite"
import HalfDart from "./half_dart"
import Point from "./point"
//@ts-ignore
import Imgs from "./images/*.png";

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

  const isInsideTriangle = (pointP: Point, pointA: Point, pointB: Point, pointC: Point): boolean => {
    let vecAB: Point = subVec(pointB, pointA);
    let vecBP: Point = subVec(pointP, pointB);

    let vecBC: Point = subVec(pointC, pointB);
    let vecCP: Point = subVec(pointP, pointC);

    let vecCA: Point = subVec(pointA, pointC);
    let vecAP: Point = subVec(pointP, pointA);

    let c1: Number = vecAB.x * vecBP.y - vecAB.y * vecBP.x;
    let c2: Number = vecBC.x * vecCP.y - vecBC.y * vecCP.x;
    let c3: Number = vecCA.x * vecAP.y - vecCA.y * vecAP.x;

    return ((c1 > 0 && c2 > 0 && c3 > 0) || (c1 < 0 && c2 < 0 && c3 < 0));
  }

  const subVec = (pointA: Point, pointB: Point): Point => {
    return { x: pointA.x - pointB.x, y: pointA.y - pointB.y }
  }


  const drawHalfKite = (kite: HalfKite) => {
    p.fill(kite.isMirror ? KITE_COLOR1 : KITE_COLOR2);
    p.triangle(
      kite.pointA.x, kite.pointA.y,
      kite.pointB.x, kite.pointB.y,
      kite.pointC.x, kite.pointC.y
    );
  }

  const drawRazyTiledHalfKite = (kite: HalfKite) => {
    let mean_x = (kite.pointA.x + kite.pointB.x + kite.pointC.x) / 3;
    let mean_y = (kite.pointA.y + kite.pointB.y + kite.pointC.y) / 3;

    let color = p.get(mean_x - 2 * p.width, mean_y);
    p.fill(color);
    p.triangle(
      kite.pointA.x, kite.pointA.y,
      kite.pointB.x, kite.pointB.y,
      kite.pointC.x, kite.pointC.y
    );
  }

  const drawTiledHalfKite = (kite: HalfKite) => {
    let min_x = p.min([kite.pointA.x, kite.pointB.x, kite.pointC.x]);
    let max_x = p.max([kite.pointA.x, kite.pointB.x, kite.pointC.x]);

    let min_y = p.min([kite.pointA.y, kite.pointB.y, kite.pointC.y]);
    let max_y = p.max([kite.pointA.y, kite.pointB.y, kite.pointC.y]);

    let ittrR = 0;
    let ittrG = 0;
    let ittrB = 0;
    let px_num = 0;
    for (let i = min_x; i <= max_x; i++) {
      for (let j = min_y; j <= max_y; j++) {
        if (isInsideTriangle({ x: i, y: j }, kite.pointA, kite.pointB, kite.pointC)) {
          let c = p.get(i - 2 * p.width, j);
          ittrR += c[0];
          ittrG += c[1];
          ittrB += c[2];
          px_num++;
        }
      }
    }
    let color = [ittrR / px_num, ittrG / px_num, ittrB / px_num, 255];
    p.fill(color);
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

  const drawRazyTiledHalfDart = (dart: HalfDart) => {
    let mean_x = (dart.pointA.x + dart.pointB.x + dart.pointC.x) / 3;
    let mean_y = (dart.pointA.y + dart.pointB.y + dart.pointC.y) / 3;

    let color = p.get(mean_x - 2 * p.width, mean_y);
    p.fill(color);
    p.triangle(
      dart.pointA.x, dart.pointA.y,
      dart.pointB.x, dart.pointB.y,
      dart.pointC.x, dart.pointC.y
    );
  }

  const drawTiledHalfDart = (dart: HalfDart) => {
    let min_x = p.min([dart.pointA.x, dart.pointB.x, dart.pointC.x]);
    let max_x = p.max([dart.pointA.x, dart.pointB.x, dart.pointC.x]);

    let min_y = p.min([dart.pointA.y, dart.pointB.y, dart.pointC.y]);
    let max_y = p.max([dart.pointA.y, dart.pointB.y, dart.pointC.y]);

    let ittrR = 0;
    let ittrG = 0;
    let ittrB = 0;
    let px_num = 0;
    for (let i = min_x; i <= max_x; i++) {
      for (let j = min_y; j <= max_y; j++) {
        if (isInsideTriangle({ x: i, y: j }, dart.pointA, dart.pointB, dart.pointC)) {
          let c = p.get(i - 2 * p.width, j);
          ittrR += c[0];
          ittrG += c[1];
          ittrB += c[2];
          px_num++;
        }
      }
    }
    let color = [ittrR / px_num, ittrG / px_num, ittrB / px_num, 255];
    p.fill(color);
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
    return tmp;
  }

  const yieldNewKiteFromDart = (dart: HalfDart): HalfKite[] => {
    let tmp: HalfKite[] = [];
    tmp.push(new HalfKite(dart.pointA, dart.pointC, dart.pointD));
    return tmp;
  }

  let img;
  let filename = "monalisa"
  p.preload = () => {
    img = p.loadImage(Imgs[filename]);
  }

  p.setup = () => {
    canvas = p.createCanvas(p.windowHeight, p.windowHeight);
    p.angleMode(p.DEGREES);
    p.background("#131821");
    p.noStroke();
    p.frameRate(1);

    kite_list = [];
    dart_list = [];
    let l = Math.min(p.width, p.height) * 4.0;
    initDart(l);

    for (let i = 0; i < 10; i++) {
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

      kite_list = new_kite_list;
      dart_list = new_dart_list;
    }

    p.image(img, 0, 0);

  };

  p.draw = () => {
    p.translate(-2 * p.width, 0);

    new_dart_list.forEach(dart => {
      drawRazyTiledHalfDart(dart);
    })

    new_kite_list.forEach(kite => {
      drawRazyTiledHalfKite(kite);
    })


    p.noLoop();

    p.saveCanvas(canvas, filename+'_tiling', 'png');
  };


};

new p5(sketch);

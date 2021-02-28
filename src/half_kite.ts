import Triangle from "./triangle"
import Point from "./point"

const rad72degree = 1.2566370614359172;
const rad36degree = 0.6283185307179586;

class HalfKite implements Triangle {
  public pointA;
  public pointB;
  public pointC;

  public pointD: Point = { x: 0, y: 0 };
  public pointE: Point = { x: 0, y: 0 };
  public pointF: Point = { x: 0, y: 0 };

  public isMirror: boolean = false;

  constructor(pointA: Point, pointB: Point, pointC: Point) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.pointC = pointC;

    // check is mirrored
    let vecAB_x: number = this.pointB.x - this.pointA.x;
    let vecAB_y: number = this.pointB.y - this.pointA.y;

    let vecAC_x: number = this.pointC.x - this.pointA.x;
    let vecAC_y: number = this.pointC.y - this.pointA.y;

    this.isMirror = vecAB_x * vecAC_y - vecAB_y * vecAC_x < 0;

    // CW is Positive
    let radBCD = rad36degree;
    let radBCE = rad72degree;
    let radEAF = -rad72degree;

    if (this.isMirror) {
      radBCD = -radBCD;
      radBCE = -radBCE;
      radEAF = -radEAF;
    }

    let vecCB_x: number = this.pointB.x - this.pointC.x;
    let vecCB_y: number = this.pointB.y - this.pointC.y;

    this.pointD.x = pointC.x + (vecCB_x * Math.cos(radBCD) + vecCB_y * Math.sin(radBCD));
    this.pointD.y = pointC.y + (- vecCB_x * Math.sin(radBCD) + vecCB_y * Math.cos(radBCD));

    this.pointE.x = pointC.x + (vecCB_x * Math.cos(radBCE) + vecCB_y * Math.sin(radBCE));
    this.pointE.y = pointC.y + (-vecCB_x * Math.sin(radBCE) + vecCB_y * Math.cos(radBCE));

    let vecAD_x: number = this.pointD.x - this.pointA.x;
    let vecAD_y: number = this.pointD.y - this.pointA.y;

    this.pointF.x = pointA.x + (vecAD_x * Math.cos(radEAF) + vecAD_y * Math.sin(radEAF));
    this.pointF.y = pointA.y + (-vecAD_x * Math.sin(radEAF) + vecAD_y * Math.cos(radEAF));
  }
};
export = HalfKite;
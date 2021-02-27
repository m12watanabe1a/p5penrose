import Triangle from "./triangle"
import HalfKite from "./half_kite"
import Point from "./point"

const rad36degree = 0.6283185307179586;
class HalfDart implements Triangle {
  public pointA;
  public pointB;
  public pointC;

  public pointD: Point = { x: 0, y: 0 };

  public isMirror: boolean = false;

  constructor(pointA: Point, pointB: Point, pointC: Point) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.pointC = pointC;

    let vecAB_x: number = this.pointB.x - this.pointA.x;
    let vecAB_y: number = this.pointB.y - this.pointA.y;

    let vecAC_x: number = this.pointC.x - this.pointA.x;
    let vecAC_y: number = this.pointC.y - this.pointA.y;

    this.isMirror = vecAB_x * vecAC_y - vecAB_y * vecAC_x < 0;

    let radCAD = rad36degree;
    if (this.isMirror) {
      radCAD = -radCAD;
    }

    this.pointD.x = pointA.x + (vecAC_x * Math.cos(radCAD) - vecAC_y * Math.sin(radCAD));
    this.pointD.y = pointA.y + (-vecAC_x * Math.sin(radCAD) - vecAC_y * Math.cos(radCAD));
  }

  public YieldHalfDartList(): HalfDart[] {
    let hd1 = new HalfDart(this.pointB, this.pointC, this.pointD);
    return [hd1];
  }

  public YieldHalfKiteList(): HalfKite[] {
    let hk1 = new HalfKite(this.pointA, this.pointC, this.pointD);
    return [hk1];
  }
};
export = HalfDart;
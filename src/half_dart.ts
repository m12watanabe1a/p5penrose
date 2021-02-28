import Triangle from "./triangle"
import Point from "./point"

const rad72degree = 1.2566370614359172;
const rad36degree = 0.6283185307179586;
class HalfDart implements Triangle {
  public pointA;
  public pointB;
  public pointC;

  public pointD: Point = { x: 0, y: 0 };
  public pointE: Point = { x: 0, y: 0 };

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
    let radCBE = -rad72degree;
    if (this.isMirror) {
      radCAD = -radCAD;
      radCBE = -radCBE;
    }

    this.pointD.x = pointA.x + (vecAC_x * Math.cos(radCAD) + vecAC_y * Math.sin(radCAD));
    this.pointD.y = pointA.y + (-vecAC_x * Math.sin(radCAD) + vecAC_y * Math.cos(radCAD));

    let vecBC_x: number = this.pointC.x - this.pointB.x;
    let vecBC_y: number = this.pointC.y - this.pointB.y;

    this.pointE.x = pointB.x + (vecBC_x * Math.cos(radCBE) + vecBC_y * Math.sin(radCBE));
    this.pointE.y = pointB.y + (-vecBC_x * Math.sin(radCBE) + vecBC_y * Math.cos(radCBE));
  }
};
export = HalfDart;
import Triangle from "./triangle"
import HalfDart from "./half_dart"
import Point from "./point"

const rad72degree = 1.2566370614359172;
const rad36degree = 0.6283185307179586;

class HalfKite implements Triangle {
  public pointA;
  public pointB;
  public pointC;

  public pointD;
  public pointE;

  public pointF;


  constructor(pointA: Point, pointB: Point, pointC: Point) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.pointC = pointC;
    this.CalcPointD();
    this.CalcPointE();
    this.CalcPointF();
  }

  private CalcPointD() {
    let vecBA_x: number = this.pointA.x - this.pointB.x;
    let vecBA_y: number = this.pointA.y - this.pointB.y;

    let normBA: number = Math.sqrt(vecBA_x ** 2 + vecBA_y ** 2);

    let nvecBA_x: number = vecBA_x / normBA;
    let nvecBA_y: number = vecBA_y / normBA;

    let normCB: number = (this.pointC.x - this.pointB.x) ** 2 + (this.pointC.x - this.pointB.y) ** 2;
    let normBD: number = 2.0 * normCB * Math.cos(rad72degree);
    this.pointD.x = this.pointB.x + nvecBA_x * normBD;
    this.pointD.y = this.pointB.y + nvecBA_y * normBD;
  }

  private CalcPointE() {
    let vecAD_x: number = this.pointD.x - this.pointA.x;
    let vecAD_y: number = this.pointD.y - this.pointA.y;

    let normAD: number = Math.sqrt(vecAD_x ** 2 + vecAD_y ** 2);

    let normAE: number = normAD * .5 / Math.cos(rad36degree);

    let vecAC_x: number = this.pointC.x - this.pointA.x;
    let vecAC_y: number = this.pointC.y - this.pointA.y

    let normAC: number = Math.sqrt(vecAC_x ** 2 + vecAC_y ** 2);

    let nvecAC_x: number = vecAC_x / normAC;
    let nvecAC_y: number = vecAC_y / normAC;

    this.pointE.x = this.pointA.x + nvecAC_x * normAE;
    this.pointE.y = this.pointA.y + nvecAC_y * normAE;
  }

  private CalcPointF() {
    let vecAB_x: number = this.pointB.x - this.pointA.x;
    let vecAB_y: number = this.pointB.y - this.pointA.y;

    let vecAC_x: number = this.pointC.x - this.pointA.x;
    let vecAC_y: number = this.pointC.y - this.pointA.y;

    let raidan;
    if(vecAB_x * vecAC_y - vecAB_y * vecAC_x > 0) {
      // CW
    } else {
      // CCW
    }
  }


  public YieldHalfDartList(): HalfDart[] {
    let hd1 = new HalfDart();
    return [hd1];
  }

  public YieldHalfKiteList(): HalfKite[] {
    let hk1 = new HalfKite(this.pointC, this.pointD, this.pointB);
    let hk2 = new HalfKite(this.pointC, this.pointD, this.pointE);
    return [hk1, hk2];
  }
};
export = HalfKite;
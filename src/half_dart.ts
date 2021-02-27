import Triangle from "./triangle";
import HalfKite from "./half_kite";

class HalfDart implements Triangle {
  public pointA;
  public pointB;
  public pointC;

  public YieldHalfDartList(): HalfDart[] {
    let hd1 = new HalfDart();
    return [hd1];
  }

  public YieldHalfKiteList(): HalfKite[] {
    let hk1 = new HalfKite();
    return [hk1];
  }
};
export = HalfDart;
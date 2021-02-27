import HalfDart from "./half_dart";
import HalfKite from "./half_kite";
import Point from "./point"
interface Triangle {
  pointA: Point;
  pointB: Point;
  pointC: Point;
  YieldHalfKiteList(): HalfKite[];
  YieldHalfDartList(): HalfDart[];
};

export = Triangle;
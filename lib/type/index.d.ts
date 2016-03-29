import {TypeAny} from "./any";
import {TypeArray} from "./array";
import {TypeBoolean} from "./boolean";
import {TypeDate} from "./date";
import {TypeNumber} from "./number";
import {TypeObject} from "./object";
import {TypeString} from "./string";

// TODO: Add point / virtual

export interface Type {
  any(): TypeAny;
  array(): TypeArray;
  boolean(): TypeBoolean;
  date(): TypeDate;
  number(): TypeNumber;
  object(): TypeObject;
  string(): TypeString;
}
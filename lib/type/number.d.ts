import {TypeAny} from "./any";

export class TypeNumber extends TypeAny {
  /**
   * Set the minimum acceptable value
   */
  min(number: number): this;
  /**
   * Set the maximum acceptable value
   */
  max(number: number): this;
  /**
   * Requires the number to be an integer
   */
  integer(): this;
}
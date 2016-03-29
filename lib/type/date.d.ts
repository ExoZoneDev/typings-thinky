import {TypeAny} from "./any";

export class TypeDate extends TypeAny {
  /**
   * Set the minimum acceptable value. Note that this will not be enforced for ReQL types like r.now()
   */
  min(date: Date): this;
  /**
   * Set the maximum acceptable value. Note that this will not be enforced for ReQL types like r.now()
   */
  max(date: Date): this;
}
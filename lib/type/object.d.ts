import {TypeAny} from "./any";

export class TypeObject extends TypeAny {
  /**
   * Whether we should allow extra fields and save them.
   */
  allowExtra(value: boolean): this;
  /**
   * Remove the fields not defined in the schema before saving.
   */
  removeExtra(): this;
}
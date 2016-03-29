export class TypeAny {
  /**
   * Set the field as required (cannot be undefined)
   */
  required(): this;
  /**
   * Set the field as optional (can be undefined)
   */
  optional(): this;
  /**
   * Whether null is considered valid or not.
   */
  allowNull(value: boolean): this;
  /**
   * The first argument can be constant value or a function that will be called with the document as the context.
   */
  default(value: any): this;
  default(value: () => any): this;
  /**
   * A function that will be used to validate a field before saving the document. The function should return true if the field is valid, false otherwise. The function can also throw an error.
   */
  validator(fn: () => boolean): this;
}
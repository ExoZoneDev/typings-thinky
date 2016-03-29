import {TypeAny} from "./any";

export class TypeString extends TypeAny {
  /**
   * Set the minimum length of the string
   */
  min(length: number): this;
  /**
   * Set the maximum length of the string
   */
  max(length: number): this;
  /**
   * Set the length of the string
   */
  length(length: number): this;
  /**
   * Requires the string to be alphanumeric ([a-zA-Z0-9])
   */
  alphanum(): this;
  /**
   * Requires the string to match the given regex.
   */
  regex(regex: RegExp): this;
  /**
   * Requires the string to be an email.
   */
  email(): this;
  /**
   * Requires the string to be lowercase.
   */
  lowercase(): this;
  /**
   * Requires the string to be uppercase.
   */
  uppercase(): this;
  /**
   * The possible values for this string.
   */
  enum(values: string[]): this;
}
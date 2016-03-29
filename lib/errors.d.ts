export interface ThinkyErrors {
  /**
   * Thrown or returned when `get` returns `null`.
   */
  DocumentNotFound: Error;
  /**
   * Thrown or returned when an in place update/replace returns an invalid document.
   */
  InvalidWrite: Error;
  /**
   * Thrown or returned when validation of a document fails.
   */
  ValidationError: Error;
  /**
   * Thrown or returned when the primary key unique document constraint fails.
   */
  DuplicatePrimaryKey: Error;
  /**
   * Regular expressions used to determine which errors should be thrown
   */
  DOCUMENT_NOT_FOUND_REGEX: RegExp;
  DUPLICATE_PRIMARY_KEY_REGEX: RegExp;  
  /**
   * Creates an appropriate error given either an instance of Error or a message
   * from the RethinkDB driver
   */
  create(errorOrMessage: string): Error;
}
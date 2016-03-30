import {Model} from "./model";
import {Document} from "./document";

export interface QueryStatic {
  new (model: Model, query?: any, options?: any, error?: any): Query;
}

/**
 * A Query basically wraps a ReQL queries to keep track of the model returned and if a post-query validation is required.
 */
export class Query {
  /**
   * Execute a Query and expect the results to be object(s) that can be converted to instances of the model.
   */
  run(options: any, cb: (...args) => any): Promise<any>;
  /**
   * Execute a Query.
   */
  execute(options: any, cb: (...args) => any): Promise<any>;
  /**
   * Perform a join given the relations on this._model.
   */
  getJoin(modelToGet: any, getAll: boolean, gotModel: any): this; // TODO: Make the interface for the "modelToGet" field.
  /**
   * Add a relation.
   */
  addRelation(field: string, joinedDocument: Document): Promise<any>;
  /**
   * Remove the provided relation.
   */
  removeRelation(field: string, joinedDocument: Document): Promise<any>;
  /**
   * Convert the query to its string representation.
   */
  toString(): string;
}
import {Document} from "./document";

export class Model {
  /**
   * Create a new instance of the model and get back a document.
   */
  new (...args): Document; // TODO: Schema needs working on. (Args)
  /**
   * Return the name of the table used for this model.
   */
  getTableName(): string;
  /**
   * Define a function that documents will be available for documents of this Model.
   */
  define(key: string, fn: () => any): void;
  /**
   * Define a function that will be available for this Model and on its query.
   */
  defineStatic(key: string, fn: () => any): void;
  /**
   * Ensure that an index named "name" exists. If it does not, it will create an index based on the name and the function fn provided.
   */
  ensureIndex(name: string, fn?: (document: Document) => any, options?: {multi: boolean}): void;
  /**
   * Define a “has one” relation between two models. The foreign key is rightKey and will be stored in OtherModel.
   */
  hasOne(otherModel: Model, fieldName: string, leftKey: string, rightKey: string, options?: {init: boolean}): void;
  /**
   * Define a “belongs to” relation between two models. The foreign key is leftKey and will be stored in Model.
   */
  belongsTo(otherModel: Model, fieldName: string, leftKey: string, rightKey: string, options?: {init: boolean}): void;
  /**
   * Define a “has many” relation between two models where the reciprocal relation is a “belongs to”.
   * The foreign key is rightKey and will be stored in OtherModel.
   */
  hasMany(otherModel: Model, fieldName: string, leftKey: string, rightKey: string, options?: {init: boolean}): void;
  /**
   * Define a “has and belongs to many” relation between two models where the reciprocal relation is another “has and belongs to many”.
   */
  hasAndBelongsToMany(otherModel: Model, fieldName: string, leftKey: string, rightKey: string, options?: {init?: boolean, type?: string}): void;
  /**
   * Add a hook that will be executed just before an event. The available pre-hooks are save, delete, validate.
   */
  pre(event: string, hook: (next: () => any) => any): void;
  /**
   * Add a hook that will be execcuted just after an event. The available post-hooks are save, delete, validate, init, retrieve.
   */
  post(event: string, hook: (next: () => any) => any): void;
  /**
   * Insert documents in the database. If an array of documents is provided, thinky will execute a batch insert with only one insert command.
   * The object options can be the options provided to insert, that is to say {conflict: 'error'/'replace'/'update'}.
   */
  save(data: {}, options?: {conflict: string}): Promise<any>;
  save(data: {}[], options?: {conflict: string}): Promise<any>;
}
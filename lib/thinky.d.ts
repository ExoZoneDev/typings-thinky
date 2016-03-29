import * as RethinkDBDash from "rethinkdbdash";
import * as Promise from "bluebird";

declare function connect(opts: Thinky.ThinkyOpts): Thinky.Thinky;

declare namespace Thinky {
  
  export class Thinky {
    /**
     * Return the current options used.
     */
    getOptions(): ThinkyOpts;
    /**
     * Create a model.
     */
    createModel(name: string, schema: ModelSchema, options?: ModelSchemaOptions): Model;
    /**
     * The thinky object keeps a reference to the driver in the property r.
     */
    r: RethinkDBDash.Term;
    /**
     * Thinky types.
     */
    type: Types;
    /**
     * Thinky errors.
     */
    Errors: ThinkyErrors; 
  }
  
  /**
   * Thinky options.
   */
  export interface ThinkyOpts {
    /**
     * The minimum number of connections in the pool, default 50.
     */
    min?: number;
    /**
     * The maximum number of connections in the pool, default 1000.
     */
    max?: number;
    /**
     * The minimum number of connections available in the pool, default 50.
     */
    bufferSize?: number;
    /**
     * Number of milliseconds before reconnecting in case of an error, default 1000.
     */
    timeoutError?: number;
    /**
     * Number of milliseconds before removing a connection that has not been used, default 60*60*1000.
     */
    timeoutGb?: number;
    /**
     * Host of the RethinkDB server, default "localhost".
     */
    host?: string;
    /**
     * Client port of the RethinkDB server, default 28015.
     */
    port?: number;
    /**
     * The default database, default "test".
     */
    db?: string;
    /**
     * The authentification key to the RethinkDB server, default ""
     */
    authKey?: string;
    /**
     * Can be "onsave" or "oncreate". The default value is "onsave".
     */
    validate?: string;
    /**
     * Can be "native" or "raw". The default value is "native".
     */
    timeFormat?: string;
    /**
     * An instance of rethinkdbdash
     */
    r?: RethinkDBDash.Term;
  }
  
  export interface ModelSchema {
    [key: string]: TypesDefaults | ModelSchema;
  }

  export interface ModelSchemaOptions {
    /**
     * The primary key of the table. If the primary key is not "id", the pk field is mandatory.
     */
    pk?: string;
    /**
     * Boolean, true to forbid missing fields, default "false".
     */
    enforce_missing?: boolean;
    /**
     * Can be "strict", "remove" (delete the extra fields on validation), "none", default "none"
     */
    enforce_extra?: string;
    /**
     * A function that will be used to validate a document before saving it. The context is set to the whole document.
     */
    validator?: () => any;
  }

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
     * 
     */
    create(errorOrMessage: string): Error;
  }

  export interface TypesDefaults {
    /**
     * Set the field as required (cannot be undefined)
     */
    required(): TypesDefaults;
    /**
     * Set the field as optional (can be undefined)
     */
    optional(): TypesDefaults;
    /**
     * Whether null is considered valid or not.
     */
    allowNull(value: boolean): TypesDefaults;
    /**
     * The first argument can be constant value or a function that will be called with the document as the context.
     */
    default(value: any): TypesDefaults;
    default(value: () => any): TypesDefaults;
    /**
     * A function that will be used to validate a field before saving the document. The function should return true if the field is valid, false otherwise. The function can also throw an error.
     */
    validator(fn: () => boolean): TypesDefaults;
  }

  export interface Types {
    string(): TypeString;
    date(): TypeDate;
    boolean(): TypeBoolean;
    number(): TypeNumber;
    buffer(): TypesDefaults;
    object(): TypesObject;
    array(): TypesDefaults;
    point(): TypesDefaults;
    virtual(): TypesDefaults;
    /**
     * For any type. No validation will be performed on this field.
     */
    any(): TypesDefaults;
  }

  export interface TypeString extends TypesDefaults {
    /**
     * Set the minimum length of the string
     */
    min(length: number): TypeString;
    /**
     * Set the maximum length of the string
     */
    max(length: number): TypeString;
    /**
     * Set the length of the string
     */
    length(length: number): TypeString;
    /**
     * Requires the string to be alphanumeric ([a-zA-Z0-9])
     */
    alphanum(): TypeString;
    /**
     * Requires the string to match the given regex.
     */
    regex(regex: RegExp): TypeString;
    /**
     * Requires the string to be an email.
     */
    email(): TypeString;
    /**
     * Requires the string to be lowercase.
     */
    lowercase(): TypeString;
    /**
     * Requires the string to be uppercase.
     */
    uppercase(): TypeString;
    /**
     * The possible values for this string.
     */
    enum(values: string[]): TypeString;
  }

  export interface TypeDate extends TypesDefaults {
    /**
     * Set the minimum acceptable value. Note that this will not be enforced for ReQL types like r.now()
     */
    min(date: Date): TypeDate;
    /**
     * Set the maximum acceptable value. Note that this will not be enforced for ReQL types like r.now()
     */
    max(date: Date): TypeDate;
  }

  export interface TypeBoolean extends TypesDefaults {}

  export interface TypeNumber extends TypesDefaults {
    /**
     * Set the minimum acceptable value
     */
    min(number: number): TypeDate;
    /**
     * Set the maximum acceptable value
     */
    max(number: number): TypeDate;
    /**
     * Requires the number to be an integer
     */
    integer(): TypeDate;
  }

  export interface TypesObject extends TypesDefaults {
    /**
     * Whether we should allow extra fields and save them.
     */
    allowExtra(value: boolean): TypesObject;
    /**
     * Remove the fields not defined in the schema before saving.
     */
    removeExtra(): TypesObject;
  }

  export interface Model {
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

  //noinspection ReservedWordAsName
  export interface Document {
    /**
     * Adding this allows being able to use the keys set from the model schema.
     */
    [key: string]: any;
    /**
     * Get the constructor of a post document and create a new one.
     */
    getModel(): Model;
    /**
     * Merge doc in the document
     * This is especially useful when you need to update a document with partial data before saving it.
     */
    merge(document: any): Promise<Document>;
    /**
     * Validate a document.
     * The method validate is called before saving a document.
     */
    validate(): Promise<any>;
    /**
     * By default, if modelToValidate is not provided, modelToValidate will keep recursing and will validate all the joined documents. 
     * To avoid infinite recursion, validateAll will not recurse in a field that contains a document from a model that was previously validated.
     */
    validateAll(modelToValidate: Model, options?: {enforce_missing?: boolean, enforce_extra?: string, enforce_type?: string});
    validateAll(options?: {enforce_missing?: boolean, enforce_extra?: string, enforce_type?: string});
    /**
     * Save the document but not the joined ones.
     */
    save(): Promise<any>;
    /**
     * Save the document and the joined document.
     * The joined documents will be saved in the appropriate order and the foreign key values will be set. If some references to joined documents
     * have been removed, the documents will be properly updated to reflect the current relations (meaning that if the joined document is not there but 
     * the foreign key is, the foreign key will be deleted).
     */
    saveAll(): Promise<any>;
    /**
     * Return the previous value of the document saved in the database.
     */
    getOldValue(): Promise<Model>;
    /**
     * Set the document as a saved one. Calling save or saveAll will then perform a replace in the database.
     */
    setSaved(): void;
    /**
     * Delete a document from the database.
     * The delete method does not delete the joined documents.
     */
    delete(cb?: (result: any) => any): Promise<any>;
    /**
     * Delete a document from the database and all the joined documents it has that are currently linked with it.
     */
    deleteAll(modelToDelete?: Model, cb?: (result: any) => any): Promise<any>;
    /**
     * Shortcut for Model.get(document.id).addRelation(field, joinedDocument).run()
     */
    addRelation(field: any, joinedDocument: Document): Promise<any>;
    /**
     * Shortcut for Model.get(document.id).removeRelation(field[, joinedDocument]).run()
     */
    removeRelation(field: any, joinedDocument?: Document): Promise<any>;
    /**
     * Delete a document and will run a range update on the database to remove all the references to the current document.
     * Joined documents that were not retrieved will also be updated.
     */
    purge(cb?: (result: any) => any): Promise<any>;
    /**
     * Return the change feed associated with this document.
     */
    getFeed(): Promise<any>;
    /**
     * Close the change feed associated with this document.
     */
    closeFeed(): Promise<any>;
    /**
     * All the methods defined on EventEmitter are available on a model.
     * 
     * The events that can be emited are:
     *  - "saving": just before a document is saved
     *  - "saved": once a document is saved
     *  - "deleted": once a document is deleted
     */
    on(event: "saving" | "saved" | "deleted", cb: (data: any) => any): Promise<any>;
  }
}

export = connect;

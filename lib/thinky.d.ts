import * as RethinkDBDash from "rethinkdbdash";

import {Model} from "./model";
import {ThinkyErrors} from "./errors";
import {Type} from "./type/index";

interface ThinkyStatic {
  (opts: ThinkyOpts): Thinky.Thinky; 
}

declare namespace Thinky {
  class Thinky {
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
    type: Type;
    /**
     * Thinky errors.
     */
    Errors: ThinkyErrors;
  }
}

interface ThinkyOpts {
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

interface ModelSchema {
  [key: string]: Type | ModelSchema;
}

interface ModelSchemaOptions {
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

export = ThinkyStatic;
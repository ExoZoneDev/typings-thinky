import {Model} from "./model";

export class Document {
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
  merge(document: Document): Promise<Document>;
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
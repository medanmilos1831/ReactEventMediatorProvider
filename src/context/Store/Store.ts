import { ModuleType } from '../types';

/**
 * Store class for managing application state modules.
 * Provides functionality to initialize, organize, and access modular state.
 */
export class Store {
  /**
   * Internal storage for modules.
   * Key is the module name, and value is the module's data.
   */
  private store: { [key: string]: ModuleType } = {};

  /**
   * Initializes the Store with a list of modules.
   * Each module is stored by its `moduleName`.
   *
   * @param {ModuleType[]} modules - Array of modules to be registered in the store.
   */
  constructor(modules: ModuleType[]) {
    modules.forEach((item) => {
      this.store[item.moduleName] = item; // Store each module using its name as the key.
    });
  }

  /**
   * Parses a string in the format `moduleName/item` and returns its parts.
   *
   * @param {string} value - The string to parse, e.g., 'moduleName/item'.
   * @returns {Object} An object containing `moduleName` and `item` as separate keys.
   */
  parseSlash = (value: string) => {
    const parts = value.split('/'); // Split the string into parts using '/' as a delimiter.
    const moduleName = parts[0]; // Extract the module name.
    const item = parts[1]; // Extract the item name.

    return {
      moduleName, // The first part of the string.
      item, // The second part of the string.
    };
  };
}

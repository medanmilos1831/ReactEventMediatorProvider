import { ModuleType } from '../types';

export class Store {
  private store: { [key: string]: ModuleType } = {};
  constructor(modules: ModuleType[]) {
    modules.forEach((item) => {
      this.store[item.moduleName] = item;
    });
  }

  parseSlash = (value: string) => {
    const parts = value.split('/');
    const moduleName = parts[0];
    const item = parts[1];
    return {
      moduleName,
      item,
    };
  };
}

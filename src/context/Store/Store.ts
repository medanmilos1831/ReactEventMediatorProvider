import { ModuleType } from '../types';

export class Store {
  private store: { [key: string]: ModuleType } = {};
  constructor(modules: ModuleType[]) {
    modules.forEach((item) => {
      this.store[item.moduleName] = item;
    });
  }
}

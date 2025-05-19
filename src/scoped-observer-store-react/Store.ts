import { dispatch } from 'scoped-observer';
import { generateStoreParamType, IGenerateStore, Mutation } from './types';

class Store {
  state: { [key: string]: IGenerateStore } = {};
  hash;

  constructor() {
    this.hash = this.generateHash();
  }

  private generateHash(length = 40): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  generateStore = <TModules extends Record<string, any>>(
    param: generateStoreParamType<TModules>
  ) => {
    for (const key in param) {
      this.state[key] = param[key];
    }
  };

  mutate = (param: Mutation | Mutation[], runEvents: string[]) => {
    const mutations = Array.isArray(param) ? param : [param];

    for (const { scope, commit, payload } of mutations) {
      if (!this.state[scope]?.mutations[commit]) {
        throw new Error(
          `Mutation "${commit}" does not exist in scope "${scope}".`
        );
      }
      this.state[scope].mutations[commit].call(this.state[scope].data, payload);
    }
    for (const eventName of runEvents) {
      dispatch({
        scope: `${this.hash}`,
        eventName,
      });
    }
  };

  getter = ({
    scope,
    getter,
    params,
  }: {
    scope: string;
    getter: string;
    params?: any;
  }) => {
    if (!this.state[scope]) {
      throw new Error(`Store scope "${scope}" does not exist.`);
    }
    if (!this.state[scope].getters[getter]) {
      throw new Error(`"${scope}" does not exist.`);
    }
    return this.state[scope].getters[getter].call(
      this.state[scope].data,
      params
    );
  };
}

export const store = new Store();

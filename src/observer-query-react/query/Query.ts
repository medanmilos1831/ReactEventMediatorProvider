export class Query {
  private hash!: string;
  private name!: string;
  queryPromise!: any;
  dependencies!: any;
  private data = undefined;
  isLoading = true;
  private isError = false;
  private error = undefined;

  constructor({ name, dependencies, queryPromise }: any, hash: string) {
    this.hash = hash;
    this.name = name;
    this.dependencies = dependencies ? JSON.stringify(dependencies) : '';
    this.queryPromise = queryPromise;
  }
}

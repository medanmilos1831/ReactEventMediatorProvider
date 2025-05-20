export class EventToggleManager {
  items: { [key: string]: boolean } = {};
  hash;

  constructor() {
    this.hash = `${this.generateHash()}_onOffManager`;
  }

  private generateHash(length = 40): string {
    const chars =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  addItem(params: { [key: string]: boolean }) {
    this.items = {
      ...this.items,
      ...params,
    };
  }
  getItem(name: string) {
    return this.items[name];
  }
  updateStatus(name: string, value: boolean) {
    this.items[name] = value;
  }
}

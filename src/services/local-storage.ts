export class LocalStorage {
  static eventName: "c-storage";

  static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    const event = new CustomEvent(this.eventName, {
      detail: {
        key,
        value,
      },
    });
    window.dispatchEvent(event);
  }

  static getItem(key: string) {
    return localStorage.getItem(key);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
    const event = new CustomEvent(this.eventName, {
      detail: {
        key,
        value: null,
      },
    });
    window.dispatchEvent(event);
  }
}

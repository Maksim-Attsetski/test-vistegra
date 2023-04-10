class Storage {
  getItem(key: string) {
    const itemAsString = localStorage.getItem(key);

    const item = itemAsString ? JSON.parse(itemAsString) : null;
    return item;
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  deleteItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export const storage = new Storage();

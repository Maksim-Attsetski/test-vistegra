export const enum LSKeys {
  leafBasket = 'leafBasket',
}

class Storage {
  getItem(key: LSKeys) {
    const itemAsString = localStorage.getItem(key as string);

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

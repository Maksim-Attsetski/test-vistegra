type TStrNum = string | number;

class Validator {
  min(value: TStrNum, limit: TStrNum, error: string = '') {
    if (+value < +limit) {
      throw new Error(`Минимальное значение ${error}: ${limit}`);
    }
  }
  max(value: TStrNum, limit: TStrNum, error: string = '') {
    if (+value > +limit) {
      throw new Error(`Максимальное значение ${error}: ${limit}`);
    }
  }
  isExist(value: any, error: string = '') {
    if (!value) {
      throw new Error(`${error} не существует`);
    }
  }
}

export const validator = new Validator();

import { ICeil } from 'UI';

type TGetCeilFromLeaf = (name: string, count: number, price: number) => ICeil;

export const getCeilFromLeaf: TGetCeilFromLeaf = (name, count, price) => {
  const ceil: ICeil = {
    data: [{ text: name }, { text: count }, { text: price }],
    id: Math.random().toString(),
  };

  return ceil;
};

import { ICeil } from 'UI';
import { TLeafUnit } from 'widgets/Leaf';

type TGetCeilFromLeaf = (
  name: string,
  unit: TLeafUnit,
  count: number,
  price: number
) => ICeil;

export const getCeilFromLeaf: TGetCeilFromLeaf = (name, unit, count, price) => {
  const ceil: ICeil = {
    data: [{ text: name }, { text: unit }, { text: count }, { text: price }],
    id: Math.random().toString(),
  };

  return ceil;
};

import { ICeil } from 'UI';

export type TLeafType = 'fix' | 'pipe' | 'list';
export type TLeafUnit = 'м2' | 'мп' | 'шт';
export type TLeafMaterial = 'metal' | 'plastic';

export interface ILeaf {
  type: TLeafType;
  name: string;
  material?: string;
  unit: TLeafUnit;
  width?: number;
  price: number;
}

export interface ILeafBasket {
  info: ICeil[];
  summa: number;
  id: number;
  addedAt: number;
}

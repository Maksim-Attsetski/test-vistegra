import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ILeaf, ILeafBasket } from './types';
import { ICeil } from 'UI';
import { storage, LSKeys } from 'shared';

interface IState {
  leafs: ILeaf[];
  pipes: ILeaf[];
  fixes: ILeaf[];
  calcResult: ICeil[];
  leafBasket: ILeafBasket[];
}

const initialState: IState = {
  leafs: [],
  fixes: [],
  pipes: [],
  calcResult: [],
  leafBasket: [],
};

const leafSlice = createSlice({
  name: 'leafSlice',
  initialState,
  reducers: {
    setLeafsAC: (state: IState, action: PayloadAction<ILeaf[]>) => {
      state.leafs = action.payload;
    },
    setPipesAC: (state: IState, action: PayloadAction<ILeaf[]>) => {
      state.pipes = action.payload;
    },
    setFixesAC: (state: IState, action: PayloadAction<ILeaf[]>) => {
      state.fixes = action.payload;
    },
    setCalcResultAC: (state: IState, action: PayloadAction<ICeil[]>) => {
      state.calcResult = action.payload;
    },
    setLeafBasketAC: (state: IState, action: PayloadAction<ILeafBasket[]>) => {
      state.leafBasket = action.payload;
    },
    addToLeafBasketAC: (state: IState, action: PayloadAction<ILeafBasket>) => {
      const newBasket = [...state.leafBasket, action.payload];
      state.leafBasket = newBasket;
      storage.setItem(LSKeys.leafBasket, newBasket);
    },
    removeFromLeafBasketAC: (state: IState, action: PayloadAction<number>) => {
      const newBasket = state.leafBasket.filter(
        (el) => el.id !== action.payload
      );
      state.leafBasket = newBasket;
      storage.setItem(LSKeys.leafBasket, newBasket);
    },
  },
});

export const leafActions = leafSlice.actions;
export const leafReducer = leafSlice.reducer;

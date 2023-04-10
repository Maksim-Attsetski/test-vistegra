import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ILeaf, ILeafBasket } from './types';
import { ICeil } from 'UI';

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
      state.leafBasket = [...state.leafBasket, action.payload];
    },
    removeFromLeafBasketAC: (state: IState, action: PayloadAction<number>) => {
      state.leafBasket = state.leafBasket.filter(
        (el) => el.id !== action.payload
      );
    },
  },
});

export const leafActions = leafSlice.actions;
export const leafReducer = leafSlice.reducer;

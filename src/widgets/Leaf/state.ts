import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ILeaf } from './types';
import { ICeil } from 'UI';

interface IState {
  leafs: ILeaf[];
  pipes: ILeaf[];
  fixes: ILeaf[];
  calcResult: ICeil[];
}

const initialState: IState = {
  leafs: [],
  fixes: [],
  pipes: [],
  calcResult: [],
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
  },
});

export const leafActions = leafSlice.actions;
export const leafReducer = leafSlice.reducer;

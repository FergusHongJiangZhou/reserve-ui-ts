import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface CommonState {
  hasError: Boolean;
}

const initialState: CommonState = {
  hasError: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setHasError: (state, action) => {
      return { ...state, hasError: { ...action.payload } };
    },
  },
});

export const commonData = (state: RootState) => state.common;
export const { setHasError } = commonSlice.actions;

export default commonSlice.reducer;

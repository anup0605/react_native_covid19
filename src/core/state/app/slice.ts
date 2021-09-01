import { IApp } from '@covid/core/state/app/types';
import { TRootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const appInitialState: IApp = {
  mentalHealthStudyActive: true,
  modalMentalHealthPlaybackVisible: false,
};

export const appSlice = createSlice({
  initialState: appInitialState,
  name: 'App',
  reducers: {
    reset: () => appInitialState,
    setMentalHealthStudyActive: (state, action: PayloadAction<boolean>) => ({
      ...state,
      mentalHealthStudyActive: action.payload,
    }),
    setModalMentalHealthPlaybackVisible: (state, action: PayloadAction<boolean>) => ({
      ...state,
      modalMentalHealthPlaybackVisible: action.payload,
    }),
  },
});

export const appActions = appSlice.actions;
export const appSelectors = {
  selectApp: (state: TRootState) => state.app,
};

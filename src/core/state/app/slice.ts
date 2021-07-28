import { IApp } from '@covid/core/state/app/types';
import { TRootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const appInitialState: IApp = {
  dashboardHasBeenViewed: false,
  loggedVaccine: false,
  mentalHealthStudyActive: true,
  modalMentalHealthPlaybackVisible: false,
};

export const appSlice = createSlice({
  initialState: appInitialState,
  name: 'App',
  reducers: {
    reset: () => appInitialState,
    setDashboardHasBeenViewed: (state, action: PayloadAction<boolean>) => ({
      ...state,
      dashboardHasBeenViewed: action.payload,
    }),
    setLoggedVaccine: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loggedVaccine: action.payload,
    }),
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
export const appReducer = appSlice.reducer;
export const appSelectors = {
  selectApp: (state: TRootState) => state.app,
};

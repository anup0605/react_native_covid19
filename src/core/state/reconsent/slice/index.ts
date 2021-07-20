import {
  TDiseaseId,
  TReconsentState,
  TUpdateDiseasePreferenceAction,
  TUpdateFeedbackAction,
} from '@covid/core/state/reconsent/types';
import { RootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialDiseasePreferences = {};
const initialFeedbackData = {};

export const initialStateReconsent: TReconsentState = {
  diseasePreferences: initialDiseasePreferences,
  feedbackData: initialFeedbackData,
};

const reconsentSlice = createSlice({
  initialState: initialStateReconsent,
  name: 'ReconsentState',
  reducers: {
    resetDiseasePreferences: (state) => ({
      ...state,
      diseasePreferences: initialDiseasePreferences,
    }),
    resetFeedback: (state) => ({
      ...state,
      feedbackData: initialFeedbackData,
    }),
    updateDiseasePreference: (state, action: PayloadAction<TUpdateDiseasePreferenceAction>) => ({
      ...state,
      diseasePreferences: {
        ...state.diseasePreferences,
        [action.payload.diseaseId]: action.payload.value,
      },
    }),
    updateFeedback: (state, action: PayloadAction<TUpdateFeedbackAction>) => ({
      ...state,
      feedbackData: {
        ...state.feedbackData,
        [action.payload.feedbackId]: action.payload.value,
      },
    }),
  },
});

export const { resetDiseasePreferences, resetFeedback, updateDiseasePreference, updateFeedback } =
  reconsentSlice.actions;
export const selectFeedbackData = (state: RootState) => state.reconsent.feedbackData || initialFeedbackData;
export const selectDiseasePreferences = (state: RootState) =>
  state.reconsent.diseasePreferences || initialDiseasePreferences;
export const selectDiseasesChosen = (state: RootState) =>
  (Object.keys(state.reconsent.diseasePreferences) as TDiseaseId[]).filter(
    (diseaseId) => state.reconsent.diseasePreferences[diseaseId] === true,
  );
export default reconsentSlice.reducer;

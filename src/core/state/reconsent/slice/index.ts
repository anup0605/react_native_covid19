import {
  TDiseaseId,
  TReconsentState,
  TUpdateDiseasePreferenceAction,
  TUpdateFeedbackAction,
} from '@covid/core/state/reconsent/types';
import { TRootState } from '@covid/core/state/root';
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
export const selectFeedbackData = (state: TRootState) => state.reconsent.feedbackData || initialFeedbackData;
export const selectDiseasePreferences = (state: TRootState) =>
  state.reconsent.diseasePreferences || initialDiseasePreferences;
export const selectDiseasesChosen = (state: TRootState) =>
  (Object.keys(state.reconsent.diseasePreferences) as TDiseaseId[]).filter(
    (diseaseId) => state.reconsent.diseasePreferences[diseaseId] === true && diseaseId !== 'prefer_not_to_say',
  );
export default reconsentSlice.reducer;

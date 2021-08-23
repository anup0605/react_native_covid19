import { IAssessmentState } from '@covid/core/assessment/AssessmentState';
import assessment from '@covid/core/assessment/state/reducers';
import { schoolSlice, TSchoolState } from '@covid/core/schools/Schools.slice';
import { contentSlice, TContentState } from '@covid/core/state/contentSlice';
import { combineReducers } from 'redux';

import { appSlice } from './app/slice';
import { IApp } from './app/types';
import { dietStudySlice, IDietStudy } from './diet-study';
import {
  IMentalHealthChanges,
  IMentalHealthFrequency,
  IMentalHealthHistory,
  IMentalHealthLearning,
  IMentalHealthState,
  IMentalHealthSupport,
  mentalHealthChangesSlice,
  mentalHealthFrequencySlice,
  mentalHealthHistorySlice,
  mentalHealthLearningSlice,
  mentalHealthStateSlice,
  mentalHealthSupportSlice,
} from './mental-health';
import { IMentalHealthPlayback, mentalHealthPlaybackSlice } from './mental-health-playback';
import { reconsentSlice, TReconsentState } from './reconsent';
import { ISettings, settingsSlice } from './settings';
import { IUser, userSlice } from './user';
import { IVaccineState, vaccinesSlice } from './vaccines';

export type TRootState = {
  app: IApp;
  assessment: IAssessmentState;
  content: TContentState;
  dietStudy: IDietStudy;
  mentalHealthChanges: IMentalHealthChanges;
  mentalHealthFrequency: IMentalHealthFrequency;
  mentalHealthHistory: IMentalHealthHistory;
  mentalHealthLearning: IMentalHealthLearning;
  mentalHealthPlayback: IMentalHealthPlayback;
  mentalHealthState: IMentalHealthState;
  mentalHealthSupport: IMentalHealthSupport;
  reconsent: TReconsentState;
  school: TSchoolState;
  settings: ISettings;
  user: IUser;
  vaccines: IVaccineState;
};

export default combineReducers({
  app: appSlice.reducer,
  assessment,
  content: contentSlice.reducer,
  dietStudy: dietStudySlice,
  mentalHealthChanges: mentalHealthChangesSlice,
  mentalHealthFrequency: mentalHealthFrequencySlice,
  mentalHealthHistory: mentalHealthHistorySlice,
  mentalHealthLearning: mentalHealthLearningSlice,
  mentalHealthPlayback: mentalHealthPlaybackSlice,
  mentalHealthState: mentalHealthStateSlice,
  mentalHealthSupport: mentalHealthSupportSlice,
  reconsent: reconsentSlice,
  school: schoolSlice.reducer,
  settings: settingsSlice,
  user: userSlice,
  vaccines: vaccinesSlice.reducer,
});

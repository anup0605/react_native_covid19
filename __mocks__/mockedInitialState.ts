import { initialStateAssessment } from '@covid/core/assessment/state/reducers';
import { initialStateSchools } from '@covid/core/schools/Schools.slice';
import { initialStateApp } from '@covid/core/state/app/slice';
import { initialStateContent } from '@covid/core/state/contentSlice';
import { initialStateDietStudy } from '@covid/core/state/diet-study/slice';
import { initialStateMentalHealthChanges } from '@covid/core/state/mental-health/changes/slice';
import { initialStateMentalHealthFrequency } from '@covid/core/state/mental-health/frequency/slice';
import { initialStateMentalHealthHistory } from '@covid/core/state/mental-health/history/slice';
import { initialStateMentalHealthLearning } from '@covid/core/state/mental-health/learning/slice';
import { initialStateMentalHealth } from '@covid/core/state/mental-health/state/slice';
import { initialStateMentalHealthSupport } from '@covid/core/state/mental-health/support/slice';
import { initialStateMentalHealthPlayback } from '@covid/core/state/mental-health-playback/slice';
import { initialStateReconsent } from '@covid/core/state/reconsent';
import { TRootState } from '@covid/core/state/root';
import { initialStateSettings } from '@covid/core/state/settings/slice';
import { initialStateTestingMode } from '@covid/core/state/testingMode';
import { initialStateUser } from '@covid/core/state/user/slice';
import { initialStateVaccine } from '@covid/core/state/vaccines/slice';

export const initialState: TRootState = {
  app: initialStateApp,
  assessment: initialStateAssessment,
  content: initialStateContent,
  dietStudy: initialStateDietStudy,
  mentalHealthChanges: initialStateMentalHealthChanges,
  mentalHealthFrequency: initialStateMentalHealthFrequency,
  mentalHealthHistory: initialStateMentalHealthHistory,
  mentalHealthLearning: initialStateMentalHealthLearning,
  mentalHealthPlayback: initialStateMentalHealthPlayback,
  mentalHealthState: initialStateMentalHealth,
  mentalHealthSupport: initialStateMentalHealthSupport,
  reconsent: initialStateReconsent,
  school: initialStateSchools,
  settings: initialStateSettings,
  testingMode: initialStateTestingMode,
  user: initialStateUser,
  vaccines: initialStateVaccine,
};

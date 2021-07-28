import store from '@covid/core/state/store';

import { TAssessmentInfosRequest } from './dto/AssessmentInfosRequest';
import { clearAssessment, updateAssessment } from './state/actions';

export interface IAssessmentState {
  initAssessment(assessment: Partial<TAssessmentInfosRequest>): void;
  updateAssessment(assessment: Partial<TAssessmentInfosRequest>): void;
  getAssessment(): Partial<TAssessmentInfosRequest>;
}

export default class ReduxAssessmentState implements IAssessmentState {
  initAssessment(assessment: Partial<TAssessmentInfosRequest>) {
    store.dispatch(clearAssessment());
    store.dispatch(updateAssessment(assessment));
  }

  updateAssessment(assessment: Partial<TAssessmentInfosRequest>) {
    return store.dispatch(updateAssessment(assessment));
  }

  getAssessment(): Partial<TAssessmentInfosRequest> {
    const state = store.getState();
    return state.assessment;
  }
}

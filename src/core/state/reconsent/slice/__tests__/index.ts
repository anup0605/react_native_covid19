import { updateDiseasePreference } from '@covid/core/state/reconsent/slice';
import store from '@covid/core/state/store';

describe('\n** redux reconsent state **\n', () => {
  let state = store.getState().reconsent;
  it('should initially set disease preferences to empty object', () => {
    expect(state.diseasePreferences).toEqual({});
  });
  it('should be able to set dementia to true', () => {
    store.dispatch(
      updateDiseasePreference({
        diseaseId: 'research_consent_dementia',
        value: true,
      }),
    );
    state = store.getState().reconsent;
    expect(state.diseasePreferences.research_consent_dementia).toBe(true);
  });
  it('should be able to set mental health to true', () => {
    store.dispatch(
      updateDiseasePreference({
        diseaseId: 'research_consent_mental_health',
        value: true,
      }),
    );
    state = store.getState().reconsent;
    expect(state.diseasePreferences.research_consent_mental_health).toBe(true);
  });
  it('should be able to set dementia to false', () => {
    store.dispatch(
      updateDiseasePreference({
        diseaseId: 'research_consent_dementia',
        value: false,
      }),
    );
    store.dispatch(
      updateDiseasePreference({
        diseaseId: 'research_consent_mental_health',
        value: true,
      }),
    );
    state = store.getState().reconsent;
    expect(state.diseasePreferences.research_consent_dementia).toBe(false);
    expect(state.diseasePreferences.research_consent_mental_health).toBe(true);
  });
});

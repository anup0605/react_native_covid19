import { Text } from '@covid/components';
import CheckboxTextInputList from '@covid/components/inputs/CheckboxTextInputList';
import { selectFeedbackData, updateFeedback } from '@covid/core/state/reconsent';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import { feedback } from '@covid/features/reconsent/data/feedback';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ReconsentFeedbackScreen() {
  const dispatch = useDispatch();
  const feedbackData = useSelector(selectFeedbackData);

  const options = React.useMemo(
    () =>
      feedback.map((option) => ({
        ...option,
        value: feedbackData[option.id],
      })),
    [feedbackData],
  );

  function onPress() {
    NavigatorService.navigate('ReconsentReconsider');
  }

  function onChange(value: string | undefined, index: number) {
    dispatch(
      updateFeedback({
        feedbackId: options[index].id,
        value,
      }),
    );
  }

  return (
    <ReconsentScreen
      buttonOnPress={onPress}
      buttonTitle={i18n.t('reconsent.feedback.button')}
      testID="reconsent-feedback-screen"
    >
      <Text rhythm={24} textAlign="center" textClass="h2Light">
        {i18n.t('reconsent.feedback.title')}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="dark" rhythm={24} textAlign="center" textClass="pLight">
        {i18n.t('reconsent.feedback.subtitle')}
      </Text>
      <CheckboxTextInputList onChange={onChange} options={options} />
    </ReconsentScreen>
  );
}

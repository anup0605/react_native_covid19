import { Spacer, Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { QualityScore } from '@covid/features/diet-study-playback/components';
import { dietStudyPlaybackCoordinator } from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import i18n from '@covid/locale/i18n';
import * as React from 'react';

export default function DietStudyTraditionalScreen() {
  const { dietScore } = dietStudyPlaybackCoordinator;
  const beforeScore = dietScore ? dietScore?.pre_diet_score : 5;
  const duringScore = dietScore ? dietScore.post_diet_score : 5;

  return (
    <Screen backgroundColor="white" testID="diet-study-traditional-screen">
      <Text rhythm={16} textClass="h2">
        {i18n.t('diet-study.traditional-title')}
      </Text>
      <QualityScore beforeScore={beforeScore} duringScore={duringScore} />
      <Spacer space={24} />
      <Text rhythm={24} textClass="h4Medium">
        {i18n.t('diet-study.traditional-body-title')}
      </Text>
      <Text rhythm={24} textClass="pLight">
        {i18n.t('diet-study.traditional-body-0')}
      </Text>
      <Text rhythm={24} textClass="pLight">
        {i18n.t('diet-study.traditional-body-1')}
      </Text>
      <Text textClass="pLight">{i18n.t('diet-study.traditional-body-2')}</Text>
    </Screen>
  );
}

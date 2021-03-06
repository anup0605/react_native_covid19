import { dietStudyPlaybackGutDiagram } from '@assets';
import { Spacer, SpeechCard, Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { GutScore } from '@covid/features/diet-study-playback/components';
import { dietStudyPlaybackCoordinator } from '@covid/features/diet-study-playback/DietStudyPlaybackCoordinator';
import { getDietStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function DietStudyGutScreen() {
  const { dietScore } = dietStudyPlaybackCoordinator;
  const beforeScore = dietScore ? dietScore?.pre_gut_friendly_score : 0;
  const duringScore = dietScore ? dietScore.post_gut_friendly_score : 0;

  return (
    <Screen backgroundColor="white" testID="diet-study-gut-screen">
      <Text rhythm={16} textClass="h2">
        {i18n.t('diet-study.gut-title')}
      </Text>
      <GutScore beforeScore={beforeScore} duringScore={duringScore} />
      <Spacer space={24} />
      <Text rhythm={24} textClass="pLight">
        {i18n.t('diet-study.gut-body-0')}
      </Text>
      <Text rhythm={24} textClass="pLight">
        {i18n.t('diet-study.gut-body-1')}
      </Text>
      <Image source={dietStudyPlaybackGutDiagram} style={styles.diagram} />
      <Text rhythm={16} textClass="h4">
        {i18n.t('diet-study.gut-microbiome-title')}
      </Text>
      <Text rhythm={24} textClass="pLight">
        {i18n.t('diet-study.gut-microbiome-body-0')}
      </Text>
      <Text rhythm={48} textClass="pLight">
        {i18n.t('diet-study.gut-microbiome-body-1')}
      </Text>
      <Text rhythm={16} textClass="h4">
        {i18n.t('diet-study.gut-score-title')}
      </Text>
      <Text rhythm={24} textClass="pLight">
        {i18n.t('diet-study.gut-score-body-0')}
      </Text>
      <Text rhythm={24} textClass="pLight">
        {i18n.t('diet-study.gut-score-body-1')}
      </Text>
      <Text rhythm={24} textClass="pLight">
        {i18n.t('diet-study.gut-score-body-2')}
      </Text>
      {getDietStudyDoctorImage()}
      <SpeechCard>
        <Text rhythm={16} textClass="h4">
          {i18n.t('diet-study.gut-tips-title')}
        </Text>
        <Text rhythm={16} textClass="pLight">
          {i18n.t('diet-study.gut-tips-body-0')}
        </Text>
        <Text rhythm={16} textClass="pLight">
          {i18n.t('diet-study.gut-tips-body-1')}
        </Text>
        <Text rhythm={16} textClass="pLight">
          {i18n.t('diet-study.gut-tips-body-2')}
        </Text>
      </SpeechCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  diagram: {
    aspectRatio: 1200 / 1270,
    height: undefined,
    marginBottom: sizes.xxl,
    resizeMode: 'contain',
    width: '100%',
  },
});

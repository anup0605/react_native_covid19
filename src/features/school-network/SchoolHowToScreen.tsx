import { Button } from '@covid/components/buttons/Button';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import Screen from '@covid/components/Screen';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import { Coordinator } from '@covid/core/Coordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { schoolNetworkCoordinator } from './SchoolNetworkCoordinator';

type Props = {
  route: RouteProp<ScreenParamList, 'SchoolHowTo'>;
};

export const SchoolHowToScreen: React.FC<Props> = ({ route }) => {
  const coordinator: Coordinator = schoolNetworkCoordinator;

  const goNext = () => {
    coordinator.gotoNextScreen(route.name);
  };

  const currentPatient = route.params?.patientData?.patientState;

  return (
    <View style={styles.container}>
      <Screen simpleCallout profile={currentPatient?.profile} style={styles.container} testID="school-how-to-screen">
        <View style={styles.container}>
          <ProgressHeader maxSteps={6} step={1} title={i18n.t('school-networks.how-to.title')} />

          <View style={styles.description}>
            <RegularBoldText>{i18n.t('school-networks.how-to.point-1.title')}</RegularBoldText>
            <RegularText style={styles.label}>{i18n.t('school-networks.how-to.point-1.description')}</RegularText>
            <View style={{ height: 24 }} />
            <RegularBoldText>{i18n.t('school-networks.how-to.point-2.title')}</RegularBoldText>
            <RegularText style={styles.label}>{i18n.t('school-networks.how-to.point-2.description')}</RegularText>
          </View>
        </View>
      </Screen>

      <View style={styles.buttonsContainer}>
        <Button branded onPress={goNext}>
          {i18n.t('school-networks.how-to.cta')}
        </Button>
        <Button onPress={() => NavigatorService.navigate('Dashboard')}>{i18n.t('skip')}</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginBottom: 48,
    paddingHorizontal: 8,
  },

  container: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },

  description: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  header: {
    marginRight: 72,
  },

  label: {
    marginTop: 4,
  },
});

import { BrandedButton } from '@covid/components/buttons';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  route: RouteProp<TScreenParamList, 'ConfirmSchool'>;
}

function ConfirmSchoolScreen({ route }: IProps) {
  async function onPress() {
    await schoolNetworkCoordinator.setSelectedSchool(route.params?.school);
    schoolNetworkCoordinator.goToJoinGroup();
  }

  return (
    <Screen profile={route.params?.patientData?.patientState?.profile} testID="confirm-school-screen">
      <ProgressHeader
        currentStep={2}
        description={i18n.t('school-networks.join-school.school-code-confirm-instructions')}
        maxSteps={4}
        title={i18n.t('school-networks.join-school.school-code-confirm')}
      />
      <View style={styles.box}>
        <RegularText>{route.params?.school.name}</RegularText>
      </View>
      <BrandedButton onPress={onPress} style={styling.marginTopAuto}>
        {i18n.t('legal.confirm')}
      </BrandedButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  box: {
    alignContent: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    justifyContent: 'center',
    marginVertical: 32,
    padding: 16,
  },
  flex: {
    flex: 1,
  },
});

export default ConfirmSchoolScreen;

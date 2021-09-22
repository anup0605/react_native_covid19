import InfoCircle from '@assets/icons/InfoCircle';
import { BrandedButton, HeaderText, LightText, Modal, RegularTextWithBoldInserts, Text } from '@covid/components';
import { Loading } from '@covid/components/Loading';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import { TDose, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { VaccineDoseRow } from './components/VaccineDoseRow';

type TProps = {
  route: RouteProp<TScreenParamList, 'VaccineListUpdated'>;
};

export const VaccineListScreenUpdated: React.FC<TProps> = (props) => {
  const [vaccine, setVaccine] = React.useState<TVaccineRequest | undefined>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const patientId = props.route.params?.assessmentData?.patientData?.patientId;

  const refreshVaccineList = async () => {
    setLoading(true);

    try {
      const response = await vaccineService.listVaccines();
      const patientVaccines = response.filter((patientVaccine) => patientVaccine.patient === patientId);
      // Set the "patientVaccine" to be the first item returned, in order to maintain backwards compatibility with older versions that may have multiple
      const patientVaccine: TVaccineRequest | undefined = patientVaccines.length ? patientVaccines[0] : undefined;
      // Also, reverse doses - they are sorted by date old-new for the old system, but new UI wants the reverse
      if (patientVaccine && patientVaccine.doses) {
        patientVaccine.doses = patientVaccine?.doses.reverse();
      }

      setVaccine(patientVaccine);
    } catch (_) {
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshVaccineList();
    }, []),
  );

  const navigateToNextPage = async () => {
    if (vaccine) {
      let doseId = null;

      // Loops over all the doses and return the first dose that has a date in the last 7 days.
      const today = moment().add(moment().utcOffset(), 'minutes').toDate();
      const sevenDaysAgo = moment().add(moment().utcOffset(), 'minutes').subtract(7, 'days').toDate();

      for (let j = 0; j < vaccine.doses?.length; j++) {
        const dose = vaccine.doses[j];
        if (dose.date_taken_specific) {
          const doseDate = moment(dose.date_taken_specific).toDate();
          if (sevenDaysAgo <= doseDate && doseDate <= today) {
            doseId = dose.id;
            break;
          }
        }
      }

      const shouldAskDoseSymptoms = !!doseId;
      assessmentCoordinator.gotoNextScreen(props.route.name, { dose: doseId, shouldAskDoseSymptoms });
    } else {
      assessmentCoordinator.gotoNextScreen(props.route.name, {});
    }
  };

  const enableNext = () => {
    const doses = vaccine?.doses;
    // Disable button if user has dose(s) with missing date, brand & description
    if (doses && doses.some((dose) => dose.date_taken_specific == null || dose.brand === null)) {
      return false;
    }

    return true;
  };

  const ListContent = () => {
    if (loading) {
      return <Loading error={null} status="" />;
    }
    return (
      <View>
        <BrandedButton
          onPress={() => assessmentCoordinator.goToAddEditVaccine(vaccine)}
          style={styles.newButton}
          testID="button-add-vaccine"
        >
          <Text style={styles.newText}>{i18n.t('vaccines.vaccine-list-updated.add-button')}</Text>
        </BrandedButton>

        {vaccine
          ? vaccine.doses.map((dose: TDose, index: number) => {
              return (
                <VaccineDoseRow
                  dose={dose}
                  index={index}
                  key={dose.id}
                  style={index === 0 ? { paddingTop: sizes.s } : { paddingTop: sizes.l }}
                  testID={`vaccine-dose-row-${index}`}
                  vaccineRecord={vaccine}
                />
              );
            })
          : null}
      </View>
    );
  };

  const showPopup = () => {
    NavigatorService.navigate('VaccineListMissingModal', { vaccine });
  };

  const navigateToNextPageOrShowPopup = () => {
    if (enableNext()) {
      navigateToNextPage();
    } else {
      showPopup();
    }
  };

  const footer = () => (
    <View style={styles.wrapper}>
      <BrandedButton
        onPress={navigateToNextPageOrShowPopup}
        testID="button-vaccine-list-screen"
        textStyle={styles.continueButton}
      >
        <Text style={{ color: colors.white }}>
          {!vaccine?.doses.length
            ? i18n.t('vaccines.vaccine-list-updated.no-vaccine')
            : i18n.t('vaccines.vaccine-list-updated.correct-info')}
        </Text>
      </BrandedButton>
    </View>
  );

  const renderMoreInfoModal = () => (
    <Modal onRequestClose={() => setModalVisible(false)} testID="vaccine-list-updated-modal" visible={modalVisible}>
      <View style={styles.modalWrapper}>
        <HeaderText style={styles.modalTitle}>{i18n.t('vaccines.vaccine-list-updated.modal-title')}</HeaderText>
        <LightText style={styles.modalBody}>{i18n.t('vaccines.vaccine-list-updated.modal-body')}</LightText>
        <BrandedButton onPress={() => setModalVisible(false)}>
          {i18n.t('vaccines.vaccine-list-updated.modal-button')}
        </BrandedButton>
      </View>
    </Modal>
  );

  return (
    <Screen
      profile={props.route.params?.assessmentData?.patientData?.patientState?.profile}
      renderFooter={footer}
      testID="vaccine-list-screen"
    >
      {renderMoreInfoModal()}
      <View>
        <ProgressHeader currentStep={0} maxSteps={1} title={i18n.t('vaccines.vaccine-list-updated.title')} />
      </View>
      <View style={styles.introduction} testID="vaccine-list-introduction">
        <Text>
          <RegularTextWithBoldInserts text={i18n.t('vaccines.vaccine-list-updated.description')} />
          {isSECountry() ? null : (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.paddingLeft}>
                <InfoCircle color={colors.primary} />
              </View>
            </TouchableOpacity>
          )}
        </Text>
      </View>
      <ListContent />
    </Screen>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    color: colors.white,
  },
  introduction: {
    marginBottom: sizes.xxl,
    marginTop: sizes.l,
  },
  modalBody: {
    marginBottom: sizes.xl,
  },
  modalTitle: {
    marginBottom: sizes.l,
    textAlign: 'center',
  },
  modalWrapper: {
    padding: sizes.xxs,
    paddingBottom: sizes.xs,
  },
  newButton: {
    backgroundColor: colors.backgroundTertiary,
    marginBottom: sizes.xl,
  },
  newText: {
    color: colors.primary,
  },
  paddingLeft: {
    paddingLeft: sizes.xs,
  },
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
  wrapper: {
    padding: sizes.l,
  },
});

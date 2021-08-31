import { IUIAction } from '@covid/common';
import { BrandedButton, RegularText, Text } from '@covid/components';
import { Loading } from '@covid/components/Loading';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import { appActions, appSelectors } from '@covid/core/state/app/slice';
import { useAppDispatch } from '@covid/core/state/store';
import { TDose, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import { VaccineWarning } from '@covid/features/vaccines/components';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { VaccineDoseRow } from './components/VaccineDoseRow';

type TProps = {
  route: RouteProp<TScreenParamList, 'VaccineListUpdated'>;
};

export const VaccineListScreenUpdated: React.FC<TProps> = ({ route }) => {
  const coordinator = assessmentCoordinator;
  const dispatch = useAppDispatch();
  const app = useSelector(appSelectors.selectApp);

  const [vaccines, setVaccines] = React.useState<TVaccineRequest | undefined>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showVaccineWarning, setShowVaccineWarning] = React.useState<boolean>(false);

  const patientId = route.params?.assessmentData?.patientData?.patientId;

  const refreshVaccineList = async () => {
    setLoading(true);

    try {
      const response = await vaccineService.listVaccines();
      const patientVaccines = response.filter((vaccine) => vaccine.patient === patientId);
      // Set the "vaccines" to be the first item returned, in order to maintain backwards compatibility with older versions that may have multiple
      const vaccines: TVaccineRequest | undefined = patientVaccines.length ? patientVaccines[0] : undefined;
      // Also, reverse doses - they are sorted by date old-new for the old system, but new UI wants the reverse
      if (vaccines && vaccines.doses) {
        vaccines.doses = vaccines?.doses.reverse();
      }

      setVaccines(vaccines);
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

  function getFirstActiveDose(vaccines: TVaccineRequest): string | null | undefined {
    // Loops over all vaccines and doses and return the first dose that has a date in the last 7 days.
    const today = moment().add(moment().utcOffset(), 'minutes').toDate();
    const sevenDaysAgo = moment().add(moment().utcOffset(), 'minutes').subtract(7, 'days').toDate();

    for (let j = 0; j < vaccines.doses?.length; j++) {
      const dose = vaccines.doses[j];
      if (dose.date_taken_specific) {
        const doseDate = moment(dose.date_taken_specific).toDate();
        if (sevenDaysAgo <= doseDate && doseDate <= today) {
          return dose.id;
        }
      }
    }
    return null;
  }

  const navigateToNextPage = async () => {
    if (vaccines) {
      const dose = getFirstActiveDose(vaccines);
      const shouldAskDoseSymptoms = !!dose;
      coordinator.gotoNextScreen(route.name, { dose, shouldAskDoseSymptoms });
    } else {
      coordinator.gotoNextScreen(route.name, {});
    }
  };

  const enableNext = () => {
    const doses = vaccines?.doses;
    // Disable button if user has dose(s) with missing date, brand & description
    // TODO: This has changed quite dramatically from previous version. Description is no longer required. Need to do a sanity check on this
    // to check all is working as expected.
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
      <View style={styles.marginHorizontal}>
        <BrandedButton
          onPress={() => coordinator.goToAddEditVaccine(vaccines)}
          style={styles.newButton}
          testID="button-add-vaccine"
        >
          <Text style={styles.newText}>{i18n.t('vaccines.vaccine-list-updated.add-button')}</Text>
        </BrandedButton>

        {vaccines
          ? vaccines.doses.map((dose: TDose, index: number) => {
              return (
                <VaccineDoseRow
                  dose={dose}
                  index={index}
                  key={dose.id}
                  testID={`vaccine-dose-row-${index}`}
                  vaccineRecord={vaccines}
                />
              );
            })
          : null}
      </View>
    );
  };

  const showPopup = () => {
    NavigatorService.navigate('VaccineListMissingModal', { vaccine: vaccines });
  };

  const navigateToNextPageOrShowPopup = () => {
    if (enableNext()) {
      navigateToNextPage();
    } else {
      showPopup();
    }
  };

  React.useEffect(() => {
    if (app.loggedVaccine) {
      setShowVaccineWarning(true);
    }
  }, [app.loggedVaccine]);

  const actions: IUIAction[] = [
    ...(isSECountry()
      ? [
          {
            action: () => {
              setShowVaccineWarning(false);
              dispatch(appActions.setLoggedVaccine(false));
              openWebLink(
                'https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/vaccination-mot-covid-19/information-for-dig-om-vaccinationen/efter-vaccinationen--fortsatt-folja-de-allmanna-raden/',
              );
            },
            label: i18n.t('navigation.learn-more'),
          },
        ]
      : []),
    {
      action: () => {
        setShowVaccineWarning(false);
        dispatch(appActions.setLoggedVaccine(false));
      },
      label: i18n.t('navigation.dismiss'),
    },
  ];

  return (
    <Screen profile={route.params?.assessmentData?.patientData?.patientState?.profile} testID="vaccine-list-screen">
      {showVaccineWarning ? <VaccineWarning actions={actions} /> : null}
      <View style={styles.marginHorizontal}>
        <ProgressHeader currentStep={0} maxSteps={1} title={i18n.t('vaccines.vaccine-list-updated.title')} />
      </View>

      <View style={styles.introduction}>
        <RegularText testID="vaccine-list-introduction">
          {i18n.t('vaccines.vaccine-list-updated.description')}
        </RegularText>
      </View>

      <ListContent />

      <View style={{ flex: 1 }} />

      <BrandedButton
        onPress={navigateToNextPageOrShowPopup}
        testID="button-vaccine-list-screen"
        textStyle={styles.continueButton}
      >
        <Text style={{ color: colors.white }}>
          {!vaccines?.doses.length
            ? i18n.t('vaccines.vaccine-list-updated.no-vaccine')
            : i18n.t('vaccines.vaccine-list-updated.correct-info')}
        </Text>
      </BrandedButton>
    </Screen>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    color: colors.white,
  },
  introduction: {
    marginBottom: sizes.xxl,
    marginHorizontal: sizes.l,
  },
  marginHorizontal: {
    marginBottom: sizes.l,
    marginHorizontal: sizes.m,
  },
  newButton: {
    backgroundColor: colors.backgroundTertiary,
    marginBottom: sizes.xl,
  },
  newText: {
    color: colors.primary,
  },
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
});

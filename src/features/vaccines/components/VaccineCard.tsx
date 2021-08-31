import { tick } from '@assets';
import QuestionCircle from '@assets/icons/QuestionCircle';
import { Header3Text, RegularText } from '@covid/components/Text';
import {
  EVaccineBrands,
  TDose,
  TVaccineRequest,
  vaccineBrandDisplayName,
} from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import moment from 'moment';
import { Text } from 'native-base';
import * as React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const displayDescriptionNameMap = {
  mrna: 'mRNA',
  not_sure: i18n.t('vaccines.your-vaccine.name-i-dont-know'),
};

type TProps = {
  vaccine: TVaccineRequest;
  onPressEdit: (index: number) => void;
};

export const VaccineCard: React.FC<TProps> = ({ vaccine, onPressEdit }) => {
  const formatDateString = (dateString: string): string => {
    return moment(dateString).format('MMM D YYYY');
  };

  const renderTick = (hasDate: boolean, hasName: boolean) => {
    return hasDate && hasName ? <Image source={tick} style={styles.tick} /> : <></>;
  };

  const formatVaccineDate = (dose: TDose) => {
    return dose.date_taken_specific ? formatDateString(dose.date_taken_specific) : '';
  };

  const warningIconAndText = (text: string) => (
    <View style={styles.row}>
      <QuestionCircle colorBg={colors.feedbackBad} colorIcon={colors.white} />
      <RegularText style={{ ...styles.warningText, marginLeft: sizes.xxs }}>{text}</RegularText>
    </View>
  );

  const dateRequired = warningIconAndText(i18n.t('vaccines.vaccine-card.date-missing'));
  const notYetLogged = warningIconAndText(i18n.t('vaccines.vaccine-card.not-logged'));

  const dose1: Partial<TDose> | undefined = vaccine.doses[0];
  const dose2: Partial<TDose> | undefined = vaccine.doses[1];
  const hasFirstDoseDate = !!dose1?.date_taken_specific;
  const hasSecondDoseDate = !!dose2?.date_taken_specific;
  const hasFirstDoseBrand = !!dose1?.brand;
  const hasSecondDoseBrand = !!dose2?.brand;
  const hasFirstDoseDescription = !!dose1?.description;
  const hasSecondDoseDescription = !!dose2?.description;
  const hasFirstDoseName = hasFirstDoseBrand || hasFirstDoseDescription;
  const hasSecondDoseName = hasSecondDoseBrand || hasSecondDoseDescription;

  return (
    <TouchableWithoutFeedback onPress={() => onPressEdit(1)}>
      <View style={styles.container}>
        <View style={styles.dose}>
          <View style={styles.row}>
            {renderTick(hasFirstDoseDate, hasFirstDoseName)}
            <Header3Text>{i18n.t('vaccines.vaccine-card.dose-1')}</Header3Text>
          </View>
          <RegularText style={[!hasFirstDoseName && styles.pendingText]}>
            {hasFirstDoseName
              ? hasFirstDoseBrand
                ? vaccineBrandDisplayName[dose1.brand]
                : displayDescriptionNameMap[dose1.description]
              : warningIconAndText(i18n.t('vaccines.vaccine-card.name-missing'))}
          </RegularText>

          {!hasFirstDoseDate ? dateRequired : null}

          {hasFirstDoseDate ? (
            <View style={{ marginBottom: 0, marginTop: sizes.xs }}>
              <RegularText style={[!hasFirstDoseDate && styles.pendingText]}>
                {hasFirstDoseDate ? formatVaccineDate(dose1 as TDose) : null}
              </RegularText>
            </View>
          ) : null}
        </View>

        {dose1.brand && dose1.brand === EVaccineBrands.JOHNSON ? (
          <></>
        ) : (
          <View style={styles.dose}>
            <View style={styles.row}>
              {renderTick(hasSecondDoseDate, hasSecondDoseName)}
              <Header3Text>{i18n.t('vaccines.vaccine-card.dose-2')}</Header3Text>
            </View>

            {hasSecondDoseDate ? (
              <View style={{ marginBottom: sizes.xs, marginTop: 0 }}>
                <RegularText style={[!hasSecondDoseName && styles.pendingText]}>
                  {hasSecondDoseName
                    ? hasSecondDoseBrand
                      ? vaccineBrandDisplayName[dose2.brand]
                      : displayDescriptionNameMap[dose2.description]
                    : warningIconAndText(i18n.t('vaccines.vaccine-card.name-missing'))}
                </RegularText>
              </View>
            ) : null}

            <RegularText style={[!hasSecondDoseDate && styles.pendingText]}>
              {hasSecondDoseDate ? formatVaccineDate(dose2 as TDose) : notYetLogged}
            </RegularText>
          </View>
        )}

        <Text style={{ marginBottom: sizes.xs, marginTop: sizes.xs, textAlign: 'center' }}>
          <Text style={styles.clickableText}>{i18n.t('vaccines.vaccine-card.edit-vaccine')}</Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  clickableText: {
    color: colors.purple,
    marginBottom: sizes.xs,
    marginTop: sizes.l,
    textAlign: 'center',
  },
  container: {
    borderColor: colors.tertiary,
    borderRadius: sizes.xs,
    borderWidth: 1,
    margin: sizes.m,
    padding: sizes.m,
  },
  dose: {
    marginBottom: sizes.m,
  },
  pendingIconAndText: {
    marginLeft: 1,
    marginVertical: 0,
  },
  pendingText: {
    color: colors.secondary,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: sizes.xs,
  },
  tick: {
    height: 16,
    marginRight: sizes.xs,
    width: 16,
  },
  warningText: {
    color: colors.feedbackBad,
  },
});

import { chevronRight, tick } from '@assets';
import { RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { EVaccineTypes, TDose, TVaccineRequest, vaccineBrandDisplayName } from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import moment from 'moment';
import * as React from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

type TProps = {
  dose: TDose;
  style: StyleProp<ViewStyle>;
  testID: string;
  vaccineRecord: TVaccineRequest;
  id: string;
};

export const VaccineDoseRow: React.FC<TProps> = (props) => {
  const formatVaccineDate = (dose: TDose) => {
    return moment(dose.date_taken_specific).format('MMM D, Y');
  };

  const brand = (dose: TDose) => {
    if (dose.vaccine_type === EVaccineTypes.SEASONAL_FLU) {
      return i18n.t('vaccines.vaccine-list.flu-dose-row-name');
    }

    return dose.brand ? vaccineBrandDisplayName[dose.brand] : 'Unknown';
  };

  return (
    <TouchableOpacity
      onPress={() => assessmentCoordinator.goToAddEditVaccine(props.vaccineRecord, props.id)}
      style={[styles.itemTouchable, props.style]}
      testID={props.testID}
    >
      <Image source={tick} style={styles.tick} />
      <RegularText>{brand(props.dose)}</RegularText>
      <View style={{ flex: 1 }} />
      <RegularText>{formatVaccineDate(props.dose)}</RegularText>
      <Image source={chevronRight} style={styles.chevron} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chevron: {
    height: 12,
    marginLeft: sizes.xxs,
    width: 12,
  },
  itemTouchable: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tick: {
    height: 16,
    marginRight: sizes.xs,
    width: 16,
  },
});

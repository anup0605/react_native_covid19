import { chevronRight, tick } from '@assets';
import { RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { TDose, TVaccineRequest, vaccineBrandDisplayName } from '@covid/core/vaccine/dto/VaccineRequest';
import { sizes } from '@covid/themes';
import moment from 'moment';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

type TProps = {
  dose: TDose;
  testID: string;
  vaccineRecord: TVaccineRequest;
  index: number;
};

export const VaccineDoseRow: React.FC<TProps> = ({ dose, testID, vaccineRecord, index }) => {
  const formatVaccineDate = (dose: TDose) => {
    return moment(dose.date_taken_specific).format('MMM D, Y');
  };

  const brand = (dose: TDose) => {
    return dose.brand ? vaccineBrandDisplayName[dose.brand] : 'Unknown';
  };

  return (
    <TouchableOpacity
      onPress={() => assessmentCoordinator.goToAddEditVaccine(vaccineRecord, index)}
      style={styles.itemTouchable}
      testID={testID}
    >
      <Image source={tick} style={styles.tick} />
      <RegularText>{brand(dose)}</RegularText>
      <View style={{ flex: 1 }} />
      <RegularText>{formatVaccineDate(dose)}</RegularText>
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
    paddingVertical: sizes.s,
  },
  tick: {
    height: 16,
    marginRight: sizes.xs,
    width: 16,
  },
});

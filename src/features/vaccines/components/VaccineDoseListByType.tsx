import { TDose, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { VaccineDoseRow } from '@covid/features/vaccines/components/VaccineDoseRow';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet } from 'react-native';

export interface IVaccineDoseByTypeProps {
  vaccineDoses: TDose[];
  vaccineRecord: TVaccineRequest;
}

export function VaccineDoseListByType(props: IVaccineDoseByTypeProps) {
  const renderItem = (item: TDose, index: number) => {
    return (
      <VaccineDoseRow
        dose={item as TDose}
        id={item.id}
        key={item.id}
        style={styles.paddingTop}
        testID={`vaccine-dose-row-${item.vaccine_type}-${index}`}
        vaccineRecord={props.vaccineRecord}
      />
    );
  };

  // The unneeded React.Fragment is used here to prevent typescript error hell.
  return <>{props.vaccineDoses.map(renderItem)}</>;
}

const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: sizes.m,
  },
});

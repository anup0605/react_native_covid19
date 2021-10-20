import { TDose, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { VaccineDoseRow } from '@covid/features/vaccines/components/VaccineDoseRow';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';

export interface IVaccineDoseByTypeProps {
  vaccineDoses: TDose[];
  vaccineRecord: TVaccineRequest;
  width: number;
}

function keyExtractor(dose: TDose, index: number) {
  return `${dose.id}-${index}`;
}

export function VaccineDoseListByType(props: IVaccineDoseByTypeProps) {
  const renderItem = ({ item, index }: { item: TDose; index: number }) => {
    return (
      <VaccineDoseRow
        dose={item as TDose}
        id={item.id}
        key={item.id}
        style={index === 0 ? { paddingTop: sizes.s } : { paddingTop: sizes.l }}
        testID={`vaccine-dose-row-${item.vaccine_type}-${index}`}
        vaccineRecord={props.vaccineRecord}
      />
    );
  };

  return (
    <ScrollView horizontal>
      <FlatList
        nestedScrollEnabled
        scrollEnabled
        contentContainerStyle={styles.contentContainer}
        data={props.vaccineDoses}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={{ width: props.width }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: { backgroundColor: colors.backgroundPrimary },
});

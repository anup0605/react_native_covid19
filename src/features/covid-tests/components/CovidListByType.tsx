import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestRow } from '@covid/features/covid-tests/components/CovidTestRow';
import * as React from 'react';
import { ScrollView } from 'react-native';

export interface ICovidListByTypeProps {
  covidTests: TCovidTest[];
}

const renderItem = (item: TCovidTest, index: number) => {
  return <CovidTestRow item={item} key={item.id} testID={`covid-test-row-${item.mechanism}-${index}`} />;
};

// The unneeded React.Fragment is used here to prevent typescript error hell.
export const CovidListByType: React.FC<ICovidListByTypeProps> = (props: ICovidListByTypeProps) => {
  return <ScrollView>{props.covidTests.map(renderItem)}</ScrollView>;
};

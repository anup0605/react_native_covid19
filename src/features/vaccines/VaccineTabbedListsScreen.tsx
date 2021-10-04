/* eslint-disable react/no-children-prop */
import { EVaccineTypes, TDose, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, useWindowDimensions } from 'react-native';

import { VaccineDoseRow } from './components/VaccineDoseRow';

interface IVaccineDoseByTypeProps {
  vaccineDoses: TDose[];
  vaccineRecord: TVaccineRequest;
}

interface IProps extends IVaccineDoseByTypeProps {
  tabViewHeight: number;
  minTabViewHeight: number;
  showTab: string;
}

const Tab = createMaterialTopTabNavigator();

function VaccineDoseListByType(props: IVaccineDoseByTypeProps) {
  const renderItem = ({ item, index }: { item: TDose; index: number }) => {
    return (
      <VaccineDoseRow
        dose={item as TDose}
        index={index}
        key={item.id}
        style={index === 0 ? { paddingTop: sizes.s } : { paddingTop: sizes.l }}
        testID={`vaccine-dose-row-${item.vaccine_type}-${index}`}
        vaccineRecord={props.vaccineRecord}
      />
    );
  };

  return (
    <FlatList
      nestedScrollEnabled
      scrollEnabled
      contentContainerStyle={{ backgroundColor: colors.backgroundPrimary }}
      data={props.vaccineDoses}
      keyExtractor={(dose: TDose, index) => `${dose.id}-${index}`}
      renderItem={renderItem}
    />
  );
}

const GUTTER = 65;
const MIN_TAB_WIDTH = 85;

export default function VaccineTabbedListsScreen(props: IProps) {
  const windowDimensions = useWindowDimensions();

  const covidVaccines = React.useMemo(
    () => props.vaccineDoses.filter((item: TDose) => item.vaccine_type === EVaccineTypes.COVID_VACCINE),
    [props.vaccineDoses],
  );

  const fluVaccines = React.useMemo(
    () => props.vaccineDoses.filter((item: TDose) => item.vaccine_type === EVaccineTypes.SEASONAL_FLU),
    [props.vaccineDoses],
  );

  const barwidth = windowDimensions.width - GUTTER;
  const tabWidth = Math.max(MIN_TAB_WIDTH, barwidth / 2);

  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName={props.showTab}
      sceneContainerStyle={{
        backgroundColor: colors.backgroundPrimary,
        height: props.tabViewHeight,
        minHeight: props.minTabViewHeight,
      }}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.quaternary,
        indicatorStyle: { backgroundColor: colors.accent },
        labelStyle: {
          fontFamily: 'SofiaPro-Medium',
          fontSize: 14,
          lineHeight: 20,
          textTransform: 'none',
        },
        scrollEnabled: true,
        style: { marginBottom: sizes.s },
        tabStyle: { paddingHorizontal: sizes.xs, paddingVertical: sizes.s, width: tabWidth },
      }}
    >
      <Tab.Screen
        children={() => <VaccineDoseListByType vaccineDoses={covidVaccines} vaccineRecord={props.vaccineRecord} />}
        name={i18n.t('vaccines.vaccine-list.tab-covid')}
        options={{
          tabBarAccessibilityLabel: i18n.t('vaccines.vaccine-list.tab-covid'),
          tabBarLabel: i18n.t('vaccines.vaccine-list.tab-covid'),
        }}
      />
      <Tab.Screen
        children={() => <VaccineDoseListByType vaccineDoses={fluVaccines} vaccineRecord={props.vaccineRecord} />}
        name={i18n.t('vaccines.vaccine-list.tab-flu')}
        options={{
          tabBarAccessibilityLabel: i18n.t('vaccines.vaccine-list.tab-flu'),
          tabBarLabel: i18n.t('vaccines.vaccine-list.tab-flu'),
        }}
      />
    </Tab.Navigator>
  );
}

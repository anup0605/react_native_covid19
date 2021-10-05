/* eslint-disable react/no-children-prop */
import { EVaccineTypes, TDose, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { sizes } from '@covid/themes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, Text, useWindowDimensions, View } from 'react-native';

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
function Test() {
  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

export function VaccineDoseListByType(props: IVaccineDoseByTypeProps) {
  console.log('VaccineDoseListByType', props);
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
  console.log('VaccineTabbedListsScreen', props);
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

  const vaccineRecord = React.useMemo(() => props.vaccineRecord, [props.vaccineRecord]);

  return (
    // <Tab.Navigator
    //   backBehavior="none"
    //   initialRouteName={props.showTab}
    //   sceneContainerStyle={{
    //     backgroundColor: colors.backgroundPrimary,
    //     height: props.tabViewHeight,
    //     minHeight: props.minTabViewHeight,
    //   }}
    //   tabBarOptions={{
    //     activeTintColor: colors.primary,
    //     inactiveTintColor: colors.quaternary,
    //     indicatorStyle: { backgroundColor: colors.accent },
    //     labelStyle: {
    //       fontFamily: 'SofiaPro-Medium',
    //       fontSize: 14,
    //       lineHeight: 20,
    //       textTransform: 'none',
    //     },
    //     scrollEnabled: true,
    //     style: { marginBottom: sizes.s },
    //     tabStyle: { paddingHorizontal: sizes.xs, paddingVertical: sizes.s, width: tabWidth },
    //   }}
    // >
    <Tab.Navigator>
      <Tab.Screen component={Test} name="test" />
      {/* <Tab.Screen
        children={() => <VaccineDoseListByType vaccineDoses={covidVaccines} vaccineRecord={vaccineRecord} />}
        name={i18n.t('vaccines.vaccine-list.tab-covid')}
        options={{
          tabBarAccessibilityLabel: i18n.t('vaccines.vaccine-list.tab-covid'),
          tabBarLabel: i18n.t('vaccines.vaccine-list.tab-covid'),
        }}
      /> */}
      {/* <Tab.Screen
        children={() => <VaccineDoseListByType vaccineDoses={fluVaccines} vaccineRecord={vaccineRecord} />}
        name={i18n.t('vaccines.vaccine-list.tab-flu')}
        options={{
          tabBarAccessibilityLabel: i18n.t('vaccines.vaccine-list.tab-flu'),
          tabBarLabel: i18n.t('vaccines.vaccine-list.tab-flu'),
        }}
      /> */}
    </Tab.Navigator>
    // <Text>yo</Text>
  );
}

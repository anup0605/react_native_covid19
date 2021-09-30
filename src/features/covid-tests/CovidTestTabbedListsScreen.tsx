/* eslint-disable react/no-children-prop */
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, useWindowDimensions } from 'react-native';

import { CovidTestRow } from './components/CovidTestRow';
import { isAntibodyTest, isLateralFlowTest, isOtherTest, isPcrTest } from './helpers';

interface ICovidListByTypeProps {
  covidTests: TCovidTest[];
}

interface IProps extends ICovidListByTypeProps {
  tabViewHeight: number;
  minTabViewHeight: number;
  showTab: string;
}

const Tab = createMaterialTopTabNavigator();

function CovidListByType(props: ICovidListByTypeProps) {
  const renderItem = ({ item, index }: { item: TCovidTest; index: number }) => {
    return <CovidTestRow item={item} key={item.id} testID={`covid-test-row-${item.mechanism}-${index}`} />;
  };

  return (
    <FlatList
      nestedScrollEnabled
      scrollEnabled
      contentContainerStyle={{ backgroundColor: colors.backgroundPrimary }}
      data={props.covidTests}
      keyExtractor={(test: TCovidTest, index) => `${test.id}-${index}`}
      renderItem={renderItem}
    />
  );
}

const GUTTER = 65;
const MIN_TAB_WIDTH = 85;

export default function CovidTestTabbedListsScreen(props: IProps) {
  const windowDimensions = useWindowDimensions();

  const lateralFlowTests = React.useMemo(
    () =>
      props.covidTests.filter((item: TCovidTest) =>
        isLateralFlowTest(item.mechanism as ECovidTestMechanismOptions, item.is_rapid_test),
      ),
    [props.covidTests],
  );

  const pcrTests = React.useMemo(
    () =>
      props.covidTests.filter((item: TCovidTest) =>
        isPcrTest(item.mechanism as ECovidTestMechanismOptions, item.is_rapid_test),
      ),
    [props.covidTests],
  );

  const antibodyTests = React.useMemo(
    () => props.covidTests.filter((item: TCovidTest) => isAntibodyTest(item.mechanism as ECovidTestMechanismOptions)),
    [props.covidTests],
  );

  const otherTests = React.useMemo(
    () => props.covidTests.filter((item: TCovidTest) => isOtherTest(item.mechanism as ECovidTestMechanismOptions)),
    [props.covidTests],
  );

  const barwidth = windowDimensions.width - GUTTER;
  const tabWidth = Math.max(MIN_TAB_WIDTH, otherTests.length ? barwidth / 4 : barwidth / 3);

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
        children={() => <CovidListByType covidTests={lateralFlowTests} />}
        name={i18n.t('covid-test-list.tab-lateral')}
        options={{
          tabBarAccessibilityLabel: i18n.t('covid-test-list.tab-lateral'),
          tabBarLabel: i18n.t('covid-test-list.tab-lateral'),
        }}
      />
      <Tab.Screen
        children={() => <CovidListByType covidTests={pcrTests} />}
        name={i18n.t('covid-test-list.tab-pcr')}
        options={{
          tabBarAccessibilityLabel: i18n.t('covid-test-list.tab-pcr'),
          tabBarLabel: i18n.t('covid-test-list.tab-pcr'),
        }}
      />
      <Tab.Screen
        children={() => <CovidListByType covidTests={antibodyTests} />}
        name={i18n.t('covid-test-list.tab-antibody')}
        options={{
          tabBarAccessibilityLabel: i18n.t('covid-test-list.tab-antibody'),
          tabBarLabel: i18n.t('covid-test-list.tab-antibody'),
        }}
      />
      {otherTests.length ? (
        <Tab.Screen
          children={() => <CovidListByType covidTests={otherTests} />}
          name={i18n.t('covid-test-list.tab-other')}
          options={{
            tabBarAccessibilityLabel: i18n.t('covid-test-list.tab-other'),
            tabBarLabel: i18n.t('covid-test-list.tab-other'),
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
}

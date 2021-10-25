/* eslint-disable react/no-children-prop */
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import { CovidListByType, ICovidListByTypeProps } from '@covid/features/covid-tests/components/CovidListByType';
import { isAntibodyTest, isLateralFlowTest, isOtherTest, isPcrTest } from '@covid/features/covid-tests/helpers';
import { ETabScreen } from '@covid/features/covid-tests/types';
import i18n from '@covid/locale/i18n';
import { sizes, styling } from '@covid/themes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '@theme';
import * as React from 'react';
import { LayoutChangeEvent, View } from 'react-native';

interface IProps extends ICovidListByTypeProps {
  initialRouteName: ETabScreen;
}

const Tab = createMaterialTopTabNavigator();

export default function CovidTestTabbedListsScreen(props: IProps) {
  const [viewWidth, setViewWidth] = React.useState(0);

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

  const onLayoutWidth = React.useCallback(
    (event: LayoutChangeEvent) => setViewWidth(event.nativeEvent.layout.width),
    [],
  );

  const tabWidth = viewWidth / (otherTests.length ? 4 : 3);

  return (
    <>
      <View onLayout={onLayoutWidth} style={styling.measureWidth} />
      <Tab.Navigator
        backBehavior="none"
        initialRouteName={props.initialRouteName}
        sceneContainerStyle={{
          backgroundColor: colors.backgroundPrimary,
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
          name={ETabScreen.LATERAL}
          options={{
            tabBarAccessibilityLabel: i18n.t('covid-test-list.tab-lateral'),
            tabBarLabel: i18n.t('covid-test-list.tab-lateral'),
          }}
        />
        <Tab.Screen
          children={() => <CovidListByType covidTests={pcrTests} />}
          name={ETabScreen.PCR}
          options={{
            tabBarAccessibilityLabel: i18n.t('covid-test-list.tab-pcr'),
            tabBarLabel: i18n.t('covid-test-list.tab-pcr'),
          }}
        />
        <Tab.Screen
          children={() => <CovidListByType covidTests={antibodyTests} />}
          name={ETabScreen.ANTIBODY}
          options={{
            tabBarAccessibilityLabel: i18n.t('covid-test-list.tab-antibody'),
            tabBarLabel: i18n.t('covid-test-list.tab-antibody'),
          }}
        />
        {otherTests.length ? (
          <Tab.Screen
            children={() => <CovidListByType covidTests={otherTests} />}
            name={ETabScreen.OTHER}
            options={{
              tabBarAccessibilityLabel: i18n.t('covid-test-list.tab-other'),
              tabBarLabel: i18n.t('covid-test-list.tab-other'),
            }}
          />
        ) : null}
      </Tab.Navigator>
    </>
  );
}

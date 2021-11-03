import { TScreenParamList } from '@covid/features/ScreenParamList';
import * as screens from '@covid/features/screens';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

const StackType = createStackNavigator<TScreenParamList>();

interface IProps {
  Stack: typeof StackType;
}

const noHeader = {
  headerShown: false,
};

export default function StudiesHubNavigator({ Stack }: IProps) {
  return (
    <>
      <Stack.Screen component={screens.StudiesListScreen} name="StudiesList" options={noHeader} />
      <Stack.Screen component={screens.StudyDetailsScreen} name="StudyDetails" options={noHeader} />
    </>
  );
}

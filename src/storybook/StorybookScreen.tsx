import { TScreenParamList } from '@covid/features/ScreenParamList';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';

import StorybookUIRoot from './index';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'CountrySelect'>;
  route: RouteProp<TScreenParamList, 'CountrySelect'>;
};

export class StorybookScreen extends React.Component<TProps> {
  public render() {
    return <StorybookUIRoot />;
  }
}

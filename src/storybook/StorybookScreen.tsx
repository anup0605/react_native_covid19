import { TScreenParamList } from '@covid/features/ScreenParamList';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';

import StorybookUIRoot from './index';

type TProps = {
  route: RouteProp<TScreenParamList, 'CountrySelect'>;
};

export class StorybookScreen extends React.Component<TProps> {
  public render() {
    return <StorybookUIRoot />;
  }
}

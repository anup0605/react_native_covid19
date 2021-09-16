import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { VaccineListScreenOld } from '.';
import { VaccineListScreenUpdated } from './VaccineListScreenUpdated';

type TProps = {
  route: RouteProp<TScreenParamList, 'VaccineListFeatureToggle'>;
};

export const VaccineListFeatureToggleScreen: React.FC<TProps> = ({ route }) => {
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);

  return startupInfo?.show_new_vaccines_ui ? (
    <VaccineListScreenUpdated route={route} />
  ) : (
    <VaccineListScreenOld route={route} />
  );
};

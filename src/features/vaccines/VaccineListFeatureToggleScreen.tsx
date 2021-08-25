import { TRootState } from '@covid/core/state/root';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { VaccineListScreenOld } from '.';
import { AboutYourVaccineScreenOld } from './AboutYourVaccineScreenOld';
import { AboutYourVaccineScreenUpdated } from './AboutYourVaccineScreenUpdated';
import { VaccineListScreenUpdated } from './VaccineListScreenUpdated';

type TProps = {
  route: RouteProp<TScreenParamList, 'VaccineListFeatureToggle'>;
};

export const VaccineListFeatureToggleScreen: React.FC<TProps> = ({ route }) => {
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>((state) => state.content.startupInfo);

  if (route.params?.viewName === 'LIST') {
    return startupInfo?.show_new_vaccines_ui ? (
      <VaccineListScreenUpdated route={route} />
    ) : (
      <VaccineListScreenOld route={route} />
    );
  }

  if (route.params?.viewName === 'ADD_EDIT_DELETE') {
    return startupInfo?.show_new_vaccines_ui ? (
      <AboutYourVaccineScreenUpdated route={route} />
    ) : (
      <AboutYourVaccineScreenOld route={route} />
    );
  }

  return null;
};

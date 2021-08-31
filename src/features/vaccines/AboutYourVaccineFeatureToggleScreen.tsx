import { TRootState } from '@covid/core/state/root';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { AboutYourVaccineScreenOld } from './AboutYourVaccineScreenOld';
import { AboutYourVaccineScreenUpdated } from './AboutYourVaccineScreenUpdated';

type TProps = {
  route: RouteProp<TScreenParamList, 'AboutYourVaccineFeatureToggle'>;
};

export const AboutYourVaccineFeatureToggleScreen: React.FC<TProps> = ({ route }) => {
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>((state) => state.content.startupInfo);
  return startupInfo?.show_new_vaccines_ui ? (
    <AboutYourVaccineScreenUpdated route={route} />
  ) : (
    <AboutYourVaccineScreenOld route={route} />
  );
};

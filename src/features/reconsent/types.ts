import { IIconProps } from '@assets/icons/svgIcons/types';
import { TDiseaseId } from '@covid/core/state/reconsent';
import * as React from 'react';

export type TDiseasePreference = {
  IconComponent?: React.ComponentType<IIconProps>;
  name: TDiseaseId;
};

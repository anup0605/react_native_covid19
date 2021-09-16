import { TDiseaseId } from '@covid/core/state/reconsent';
import * as React from 'react';

export type TDiseasePreference = {
  IconComponent?: React.ComponentType<any>;
  name: TDiseaseId;
};

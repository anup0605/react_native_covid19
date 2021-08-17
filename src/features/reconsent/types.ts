import { TDiseaseId } from '@covid/core/state/reconsent';

export type TDiseasePreference = {
  IconComponent?: React.ComponentType<any>;
  name: TDiseaseId;
};

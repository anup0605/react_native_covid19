import { IMHInsights } from '@covid/features/mental-health-playback/types';

export interface IMentalHealthPlayback {
  mh_insights: IMHInsights;
  loading: boolean;
}

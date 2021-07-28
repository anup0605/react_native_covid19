import { TMHInsightCohort } from '@covid/core/user/dto/UserAPIContracts';
import { TTestGroupId } from '@covid/features/mental-health-playback/types';

class Util {
  determineTestGroupId(id: string, mhInsightCohort: TMHInsightCohort): TTestGroupId {
    // Example of execution:
    // 1: 2982e1b0-aa5e-4c74-9c56-c059cdf4b294
    // 2: 2982e1b0aa5e4c749c56c059cdf4b294
    // 3: 5.517792395783495e+37
    // 4: 5517792395783495e+37
    // 5: 5517
    // 6: 1
    const remainder =
      parseInt(
        parseInt((id || '').replace(/-/g, ''), 16)
          .toString()
          .replace('.', '')
          .slice(0, 4),
        10,
      ) % 4;
    if (remainder === 0) {
      return 'GROUP_1';
    }
    if (remainder === 1) {
      return 'GROUP_2';
    }
    if (mhInsightCohort === 'MHIP-v1-cohort_a') {
      return 'GROUP_3';
    }
    if (mhInsightCohort === 'MHIP-v1-cohort_c') {
      return 'GROUP_4';
    }
    return 'GROUP_1';
  }
}

export default new Util();

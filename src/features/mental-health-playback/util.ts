import { TTestGroupId } from '@covid/features/mental-health-playback/types';

class Util {
  determineTestGroupId(id: string): TTestGroupId {
    // Example of execution:
    // 1: 2982e1b0-aa5e-4c74-9c56-c059cdf4b294
    // 2: 2982e1b0aa5e4c749c56c059cdf4b294
    // 3: 5.517792395783495e+37
    // 4: 5517792395783495e+37
    // 5: 5517
    // 6: 6
    const remainder =
      parseInt(
        parseInt((id || '').replace(/-/g, ''), 16)
          .toString()
          .replace('.', '')
          .slice(0, 4),
        10,
      ) % 6;
    if (remainder === 0) {
      return 'GROUP_A';
    }
    if (remainder === 1) {
      return 'GROUP_B';
    }
    if (remainder === 2) {
      return 'GROUP_C';
    }
    if (remainder === 3) {
      return 'GROUP_D';
    }
    if (remainder === 4) {
      return 'GROUP_E';
    }
    return 'GROUP_F';
  }
}

export default new Util();

import { TRootState } from '@covid/core/state/root';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';

export function selectStartupInfo(state: TRootState): TStartupInfo | undefined {
  if (state.content.startupInfo?.is_tester) {
    return {
      ...state.content.startupInfo,
      ...(state.testingMode.startupInfo || {}),
    };
  }
  return state.content.startupInfo;
}

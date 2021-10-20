import { updateReturnScreenName } from '@covid/core/state/reconsent';
import { TReturnScreenName } from '@covid/core/state/reconsent/types';
import NavigatorService from '@covid/NavigatorService';
import { useDispatch } from 'react-redux';

export function useStartReconsent() {
  const dispatch = useDispatch();

  return function startReconsent(returnScreenName: TReturnScreenName) {
    dispatch(updateReturnScreenName({ returnScreenName }));
    NavigatorService.navigate('ReconsentIntroduction');
  };
}

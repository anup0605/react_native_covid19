import { NUMBER_OF_PROFILE_AVATARS } from '@assets';
import { Screen } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { Coordinator, IEditableProfile, ISelectProfile } from '@covid/core/Coordinator';
import { localisationService } from '@covid/core/localisation/LocalisationService';
import { TProfile } from '@covid/core/profile/ProfileService';
import { ScreenParamList } from '@covid/features';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { offlineService } from '@covid/services';
import { DEFAULT_PROFILE } from '@covid/utils/avatar';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';

import { ProfileCard } from './components/ProfileCard';
import { ProfileList } from './components/ProfileList';
import { useProfileList } from './useProfileList';

type TProps = {
  navigation: NavigationProp<ScreenParamList, 'SelectProfile'>;
  route: RouteProp<ScreenParamList, 'SelectProfile'>;
};

export type TSelectProfileCoordinator =
  | (Coordinator & ISelectProfile)
  | (Coordinator & ISelectProfile & IEditableProfile);

export default function SelectProfileScreen({ navigation, route }: TProps) {
  const { status, error, isLoaded, isApiError, setIsApiError, setError, profiles, listProfiles, retryListProfiles } =
    useProfileList();
  const assessmentFlow = route.params?.assessmentFlow;
  const coordinator: TSelectProfileCoordinator = appCoordinator;
  const config = localisationService.getConfig();

  React.useEffect(() => {
    return navigation.addListener('focus', listProfiles);
  }, [navigation]);

  const getNextAvatarName = async (): Promise<string> => {
    if (profiles) {
      const n = (profiles.length + 1) % NUMBER_OF_PROFILE_AVATARS;
      return `profile${n.toString()}`;
    }
    return DEFAULT_PROFILE;
  };

  const gotoCreateProfile = async () => {
    (coordinator as IEditableProfile).goToCreateProfile(await getNextAvatarName());
  };

  const getPatientThen = async (profile: TProfile, callback: (patient: TProfile) => void) => {
    try {
      callback(profile);
    } catch (error) {
      setIsApiError(true);
      setError(error);

      // TODO Dont think this works properly
      setTimeout(() => {
        callback(profile);
      }, offlineService.getRetryDelay());
    }
  };

  function onProfileSelected(profile: TProfile) {
    getPatientThen(profile, (profile) => {
      if (assessmentFlow) {
        coordinator.profileSelected(profile);
      } else {
        (coordinator as IEditableProfile).startEditProfile(profile);
      }
    });
  }

  return (
    <Screen backgroundColor={colors.backgroundSecondary} testID="select-profile-screen">
      <HeaderText>
        {assessmentFlow ? i18n.t('select-profile-title-assessment') : i18n.t('select-profile-title-edit')}
      </HeaderText>
      {assessmentFlow ? <SecondaryText>{i18n.t('select-profile-text')}</SecondaryText> : null}

      <ProfileList
        addProfile={
          config?.enableMultiplePatients
            ? () => {
                gotoCreateProfile();
              }
            : undefined
        }
        error={error}
        isApiError={isApiError}
        isLoaded={isLoaded}
        onProfileSelected={onProfileSelected}
        onRetry={() => retryListProfiles()}
        profiles={profiles}
        renderItem={(profile, i) => (
          <ProfileCard
            index={i}
            onEditPressed={
              assessmentFlow
                ? () => {
                    getPatientThen(profile, (profile) => {
                      (coordinator as IEditableProfile).startEditProfile(profile);
                    });
                  }
                : undefined
            }
            profile={profile}
            testID={`profile-card-${i}`}
          />
        )}
        status={status}
      />
    </Screen>
  );
}

import { NUMBER_OF_PROFILE_AVATARS } from '@assets';
import { BrandedButton } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { Coordinator, IEditableProfile, ISelectProfile } from '@covid/core/Coordinator';
import { localisationService } from '@covid/core/localisation/LocalisationService';
import { patientService } from '@covid/core/patient/PatientService';
import { TProfile } from '@covid/core/profile/ProfileService';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { ScreenParamList } from '@covid/features';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService, offlineService } from '@covid/services';
import { sizes } from '@covid/themes';
import { DEFAULT_PROFILE } from '@covid/utils/avatar';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { ProfileCard } from './components/ProfileCard';
import { ProfileList } from './components/ProfileList';
import { useProfileList } from './useProfileList';

type TProps = {
  navigation: NavigationProp<ScreenParamList, 'SelectProfile'>;
  route: RouteProp<ScreenParamList, 'SelectProfile'>;
};

type TSelectProfileCoordinator = (Coordinator & ISelectProfile) | (Coordinator & ISelectProfile & IEditableProfile);

export default function SelectProfileScreen(props: TProps) {
  const profileList = useProfileList();
  const assessmentFlow = props.route.params?.assessmentFlow;
  const coordinator: TSelectProfileCoordinator = appCoordinator;
  const config = localisationService.getConfig();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);

  React.useEffect(() => {
    return props.navigation.addListener('focus', profileList.listProfiles);
  }, [props.navigation]);

  const getNextAvatarName = async (): Promise<string> => {
    if (profileList.profiles) {
      const n = (profileList.profiles.length + 1) % NUMBER_OF_PROFILE_AVATARS;
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
      profileList.setIsApiError(true);
      profileList.setError(error);

      // TODO Dont think this works properly
      setTimeout(() => {
        callback(profile);
      }, offlineService.getRetryDelay());
    }
  };

  function onProfileSelected(profile: TProfile) {
    getPatientThen(profile, (selectedProfile) => {
      if (assessmentFlow) {
        coordinator.profileSelected(selectedProfile);
      } else {
        (coordinator as IEditableProfile).startEditProfile(selectedProfile);
      }
    });
  }

  async function updateAssessment(profile: TProfile) {
    try {
      const assessment = { health_status: 'healthy' };
      const patientData = await patientService.getPatientDataByProfile(profile);
      await assessmentService.completeAssessment(assessment, patientData.patientInfo!);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Something went wrong: ', error);
      setIsSubmitting(false);
    }
  }

  async function reportAllProfilesAreFine() {
    setIsSubmitting(true);
    if (profiles) {
      await Promise.all(profiles.map((profile) => updateAssessment(profile)));
      setIsSubmitting(false);
      assessmentCoordinator.goToThankYouScreen();
    }
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
        error={profileList.error}
        isApiError={profileList.isApiError}
        isLoaded={profileList.isLoaded}
        onProfileSelected={onProfileSelected}
        onRetry={() => profileList.retryListProfiles()}
        profiles={profileList.profiles}
        renderItem={(profile, i) => (
          <ProfileCard
            index={i}
            onEditPressed={
              assessmentFlow
                ? () => {
                    getPatientThen(profile, (pressedProfile) => {
                      (coordinator as IEditableProfile).startEditProfile(pressedProfile);
                    });
                  }
                : undefined
            }
            profile={profile}
            testID={`profile-card-${i}`}
          />
        )}
        status={profileList.status}
      />

      {startupInfo?.is_tester ? (
        <BrandedButton
          enabled={!isSubmitting}
          loading={isSubmitting}
          onPress={reportAllProfilesAreFine}
          style={{ marginTop: sizes.xl }}
        >
          Report all profiles as "I am fine"
        </BrandedButton>
      ) : null}
    </Screen>
  );
}

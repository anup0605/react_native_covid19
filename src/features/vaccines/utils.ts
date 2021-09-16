import { isSECountry } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { Alert, AlertButton } from 'react-native';

export function showVaccineWarningAlert() {
  const buttons: AlertButton[] = [
    {
      onPress: () => {},
      style: 'cancel',
      text: i18n.t('cancel'),
    },
  ];
  if (isSECountry()) {
    buttons.push({
      onPress: () => {
        openWebLink(
          'https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/vaccination-mot-covid-19/information-for-dig-om-vaccinationen/efter-vaccinationen--fortsatt-folja-de-allmanna-raden/',
        );
      },
      style: 'default',
      text: i18n.t('navigation.learn-more'),
    });
  }
  Alert.alert('', i18n.t('vaccines.banner.body'), buttons, { cancelable: true });
}

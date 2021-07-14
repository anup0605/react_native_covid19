import { Text } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import { selectDiseasePreferences } from '@covid/core/state/reconsent';
import { updateDiseasePreferences } from '@covid/core/state/reconsent/slice';
import { TDisease, TDiseasePreferencesData } from '@covid/core/state/reconsent/types';
import DiseaseCard from '@covid/features/reconsent/components/DiseaseCard';
import InfoBox from '@covid/features/reconsent/components/InfoBox';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import ShowMore from '@covid/features/reconsent/components/ShowMore';
import { extendedDiseases, initialDiseases } from '@covid/features/reconsent/data/diseases';
import { TDiseasePreference } from '@covid/features/reconsent/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid } from '@covid/themes';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { BackHandler, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function ReconsentDiseasePreferencesScreen() {
  const dispatch = useDispatch();
  const diseasePreferencesPersisted = useSelector(selectDiseasePreferences);
  const navigation = useNavigation();

  const extendedListDiseaseNames: TDisease[] = extendedDiseases.map((item) => item.name);
  const identifiers = Object.keys(diseasePreferencesPersisted) as TDisease[];

  const initialStateShowExtendedList = identifiers
    .filter((key) => extendedListDiseaseNames.includes(key))
    .some((key) => diseasePreferencesPersisted[key] === true);

  const [showExtendedList, setShowExtendedList] = React.useState<boolean>(initialStateShowExtendedList);
  const [diseasePreferences, setDiseasePreferences] =
    React.useState<TDiseasePreferencesData>(diseasePreferencesPersisted);

  const toggleDisease = (disease: TDisease) => {
    setDiseasePreferences((prevState) => ({ ...prevState, [disease]: !prevState[disease] }));
  };

  const onPress = () => {
    dispatch(updateDiseasePreferences(diseasePreferences));
    NavigatorService.navigate('ReconsentDiseaseSummary');
  };

  const updateState = () => {
    dispatch(updateDiseasePreferences(diseasePreferences));
  };

  const androidBackHandler = () => {
    updateState();
    navigation.goBack();
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', androidBackHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', androidBackHandler);
    };
  }, [androidBackHandler]);

  const renderItem = ({ item }: { item: TDiseasePreference }) => {
    return (
      <DiseaseCard
        description={i18n.t(`disease-cards.${item.name}.description`)}
        IconComponent={item.IconComponent}
        initialStateIsActive={diseasePreferencesPersisted[item.name] || false}
        key={item.name}
        onPressHandler={() => toggleDisease(item.name)}
        style={{ marginBottom: grid.xxl }}
        testID={`disease-card-${item.name}`}
        title={i18n.t(`disease-cards.${item.name}.name`)}
      />
    );
  };

  return (
    <ReconsentScreen
      noPadding
      activeDot={1}
      additionalBackButtonAction={updateState}
      testID="reconsent-disease-preferences-screen"
    >
      <View style={styles.padding}>
        <Text rhythm={24} textAlign="center" textClass="h2Light">
          {i18n.t('reconsent.disease-preferences.title')}
        </Text>
        <Text inverted colorPalette="uiDark" colorShade="dark" textAlign="center" textClass="pLight">
          {i18n.t('reconsent.disease-preferences.subtitle')}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={styles.padding}
        data={showExtendedList ? initialDiseases.concat(extendedDiseases) : initialDiseases}
        keyExtractor={(disease: TDiseasePreference) => disease.name}
        ListFooterComponent={
          <ShowMore onPress={() => setShowExtendedList(true)} style={styles.showMore} testID="show-more" />
        }
        ListFooterComponentStyle={showExtendedList ? { display: 'none' } : null}
        renderItem={renderItem}
        scrollEnabled={false}
      />
      <View style={styles.footer}>
        <InfoBox text={i18n.t('reconsent.disease-preferences.how-data-used')} />

        <BrandedButton onPress={onPress} style={styles.button} testID="button-cta-reconsent-disease-preferences-screen">
          {i18n.t('navigation.next')}
        </BrandedButton>
      </View>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    marginTop: 32,
  },
  footer: {
    padding: 16,
    paddingTop: 0,
  },
  padding: {
    padding: 16,
  },
  page: {
    backgroundColor: colors.backgroundPrimary,
  },
  showMore: {
    paddingBottom: 8,
  },
});

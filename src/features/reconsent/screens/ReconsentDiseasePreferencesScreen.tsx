import { Text } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import { selectDiseasePreferences } from '@covid/core/state/reconsent';
import { resetDiseasePreferences, updateDiseasePreference } from '@covid/core/state/reconsent/slice';
import { TDiseaseId, TDiseasePreferencesData } from '@covid/core/state/reconsent/types';
import DiseaseCard from '@covid/features/reconsent/components/DiseaseCard';
import InfoBox from '@covid/features/reconsent/components/InfoBox';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import ShowMore from '@covid/features/reconsent/components/ShowMore';
import { extendedDiseases, initialDiseases } from '@covid/features/reconsent/data/diseases';
import { TDiseasePreference } from '@covid/features/reconsent/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const allDiseases = initialDiseases.concat(extendedDiseases);

export default function ReconsentDiseasePreferencesScreen() {
  const dispatch = useDispatch();
  const diseasePreferences: TDiseasePreferencesData = useSelector(selectDiseasePreferences);
  const initialShowExtendedList = React.useCallback(
    () => extendedDiseases.some((disease) => diseasePreferences[disease.name]),
    [],
  );
  const [showExtendedList, setShowExtendedList] = React.useState(initialShowExtendedList);

  function onPressCard(diseaseId: TDiseaseId) {
    if (diseaseId === 'prefer_not_to_say' && !diseasePreferences[diseaseId]) {
      dispatch(resetDiseasePreferences());
    } else if (
      diseasePreferences.prefer_not_to_say === true &&
      diseaseId !== 'prefer_not_to_say' &&
      !diseasePreferences[diseaseId]
    ) {
      dispatch(
        updateDiseasePreference({
          diseaseId: 'prefer_not_to_say',
          value: false,
        }),
      );
    }
    dispatch(
      updateDiseasePreference({
        diseaseId,
        value: !diseasePreferences[diseaseId],
      }),
    );
  }

  function onPressNext() {
    NavigatorService.navigate('ReconsentDiseaseSummary');
  }

  const renderItem = ({ item }: { item: TDiseasePreference }) => {
    return (
      <DiseaseCard
        description={i18n.t(`disease-cards.${item.name}.description`, { defaultValue: '' })}
        IconComponent={item.IconComponent}
        key={item.name}
        onPress={() => onPressCard(item.name)}
        selected={!!diseasePreferences[item.name]}
        style={{ marginBottom: sizes.l }}
        testID={`disease-card-${item.name}`}
        title={i18n.t(`disease-cards.${item.name}.name`, { defaultValue: '' })}
      />
    );
  };

  return (
    <ReconsentScreen noPadding activeDot={1} testID="reconsent-disease-preferences-screen">
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
        data={showExtendedList ? allDiseases : initialDiseases}
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

        <BrandedButton
          onPress={onPressNext}
          style={styles.button}
          testID="button-cta-reconsent-disease-preferences-screen"
        >
          {i18n.t('navigation.next')}
        </BrandedButton>
      </View>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    marginTop: sizes.xl,
  },
  footer: {
    padding: sizes.m,
    paddingTop: 0,
  },
  padding: {
    padding: sizes.m,
  },
  page: {
    backgroundColor: colors.backgroundPrimary,
  },
  showMore: {
    paddingBottom: sizes.xs,
  },
});

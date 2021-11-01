import { drTimSpector } from '@assets';
import { Avatar, DoctorProfile, Text } from '@covid/components';
import { NavHeader } from '@covid/components/NavHeader';
import { ScrollView } from '@covid/components/ScrollView';
import { FooterInterested } from '@covid/features/studies-hub/components/FooterInterested';
import { IconBlog } from '@covid/features/studies-hub/components/IconBlog';
import { IconBMI } from '@covid/features/studies-hub/components/IconBMI';
import { IconLightBulb } from '@covid/features/studies-hub/components/IconLightBulb';
import { IconPencil } from '@covid/features/studies-hub/components/IconPencil';
import { IconProfileInfo } from '@covid/features/studies-hub/components/IconProfileInfo';
import { IconTime } from '@covid/features/studies-hub/components/IconTime';
import { StudyDetailRow } from '@covid/features/studies-hub/components/StudyDetailRow';
import { TStudy } from '@covid/features/studies-hub/types';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const sourceHeaderImage = require('../assets/header.png');

const studies: TStudy[] = require('../assets/studies.json');

const study = studies[0];

export function StudyDetailsScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View style={styles.flex} testID="study-details-screen">
      <View
        style={{
          backgroundColor: colors.predict,
          height: safeAreaInsets.top,
        }}
      />
      <NavHeader backgroundColor={colors.predict} iconColor="white" />
      <ScrollView
        bottomBackgroundColor="white"
        contentContainerStyle={styles.flexGrow}
        topBackgroundColor={colors.predict}
      >
        <Image resizeMethod="scale" resizeMode="cover" source={sourceHeaderImage} style={styles.fullWidth} />
        <View style={styles.headerWrapper}>
          <Text inverted colorPalette="uiDark" colorShade="darker" textClass="h3Regular">
            {study.title}
          </Text>
          <Text inverted colorPalette="uiDark" colorShade="main" style={styles.organiserText} textClass="pMedium">
            {study.organiser}
          </Text>

          <FooterInterested active study={study} />
        </View>
        <View style={styles.bodyWrapper}>
          <StudyDetailRow
            description={study.researchFocus}
            IconComponent={IconLightBulb}
            title={i18n.t('studies-hub.study-details.research-focus')}
          />
          <View style={styles.lineHorizontal} />
          <StudyDetailRow
            description={study.eligibilityCriteria}
            IconComponent={IconProfileInfo}
            style={styles.marginBottom}
            title={i18n.t('studies-hub.study-details.eligibility-criteria')}
          />
          <StudyDetailRow
            description={study.commitment}
            IconComponent={IconTime}
            style={styles.marginBottom}
            title={i18n.t('studies-hub.study-details.commitment')}
          />
          <StudyDetailRow
            description={study.toDo}
            IconComponent={IconPencil}
            style={styles.marginBottom}
            title={i18n.t('studies-hub.study-details.to-do')}
          />
          <StudyDetailRow
            description={study.tools}
            IconComponent={IconBMI}
            title={i18n.t('studies-hub.study-details.tools')}
          />
          <View style={styles.lineHorizontal} />
          <StudyDetailRow IconComponent={IconBlog} title={i18n.t('studies-hub.study-details.behind-study')} />
          <DoctorProfile
            imageNode={<Avatar source={drTimSpector} />}
            location={i18n.t('studies-hub.doctor.location')}
            name={i18n.t('studies-hub.doctor.name')}
            style={styles.marginVertical}
            title={i18n.t('studies-hub.doctor.title')}
          />
          <Text inverted colorPalette="uiDark" colorShade="dark" textClass="p">
            {study.blog}
          </Text>
          <View
            style={{
              height: safeAreaInsets.bottom,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyWrapper: {
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: sizes.m,
    paddingVertical: sizes.xl,
  },
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  fullWidth: {
    width: '100%',
  },
  headerWrapper: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: sizes.m,
    paddingVertical: sizes.xl,
  },
  lineHorizontal: {
    backgroundColor: colors.hrColor,
    height: 1,
    marginVertical: sizes.xl,
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  marginVertical: {
    marginVertical: sizes.l,
  },
  organiserText: {
    marginBottom: sizes.l,
    marginTop: sizes.xs,
  },
});

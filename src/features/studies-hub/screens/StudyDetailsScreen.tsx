import { Avatar, DoctorProfile, Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { FooterInterested } from '@covid/features/studies-hub/components/FooterInterested';
import { TStudy } from '@covid/features/studies-hub/types';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '@theme';
import { sizes } from '@covid/themes';
import i18n from '@covid/locale/i18n';
import { StudyDetailRow } from '@covid/features/studies-hub/components/StudyDetailRow';
import { IconLightBulb } from '@covid/features/studies-hub/components/IconLightBulb';
import { IconProfileInfo } from '@covid/features/studies-hub/components/IconProfileInfo';
import { IconTime } from '@covid/features/studies-hub/components/IconTime';
import { IconPencil } from '@covid/features/studies-hub/components/IconPencil';
import { IconBMI } from '@covid/features/studies-hub/components/IconBMI';
import { IconBlog } from '../components/IconBlog';
import { drTimSpector } from '@assets';

const sourceHeaderImage = require('../assets/header.png');

const studies: TStudy[] = require('../assets/studies.json');

const study = studies[0];

export function StudyDetailsScreen() {
  return (
    <Screen noPadding testID="study-details-screen">
      <View style={styles.headerWrapper}>
        <Image source={sourceHeaderImage} />

        <Text>{study.title}</Text>
        <Text>{study.organiser}</Text>

        <View style={styles.footerWrapper}>
          <FooterInterested active study={study} />
        </View>
      </View>
      <View style={styles.bodyWrapper}>
        <StudyDetailRow
          IconComponent={IconLightBulb}
          description={study.researchFocus}
          title={i18n.t('studies-hub.study-details.research-focus')}
        />
        <View style={styles.lineHorizontal} />
        <StudyDetailRow
          IconComponent={IconProfileInfo}
          title={i18n.t('studies-hub.study-details.eligibility-criteria')}
          description={study.eligibilityCriteria}
          style={styles.marginBottom}
        />
        <StudyDetailRow
          IconComponent={IconTime}
          title={i18n.t('studies-hub.study-details.commitment')}
          description={study.commitment}
          style={styles.marginBottom}
        />
        <StudyDetailRow
          IconComponent={IconPencil}
          title={i18n.t('studies-hub.study-details.to-do')}
          description={study.toDo}
          style={styles.marginBottom}
        />
        <StudyDetailRow
          IconComponent={IconBMI}
          title={i18n.t('studies-hub.study-details.tools')}
          description={study.tools}
        />
        <View style={styles.lineHorizontal} />
        <StudyDetailRow IconComponent={IconBlog} title={i18n.t('studies-hub.study-details.behind-study')} />
        <DoctorProfile
          imageNode={<Avatar source={drTimSpector} />}
          location={i18n.t('studies-hub.doctor.location')}
          name={i18n.t('studies-hub.doctor.name')}
          title={i18n.t('studies-hub.doctor.title')}
        />
        <Text inverted colorPalette="uiDark" colorShade="dark" textClass="p">
          {study.blog}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bodyWrapper: {
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: sizes.m,
    paddingVertical: sizes.xl,
  },
  footerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerWrapper: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: sizes.m,
    paddingVertical: sizes.xl,
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  lineHorizontal: {
    backgroundColor: colors.hrColor,
    height: 1,
    marginVertical: sizes.xl,
  },
});

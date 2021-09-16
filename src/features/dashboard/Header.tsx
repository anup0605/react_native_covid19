import { covidByZoeIcon, covidIcon } from '@assets';
import { BrandedButton } from '@covid/components';
import { CaptionText, Header3Text, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import { TContentState } from '@covid/core/state/contentSlice';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { cleanIntegerVal } from '@covid/utils/number';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

interface IProps {
  reportedCount?: string;
  reportOnPress: VoidFunction;
}

enum EHeaderType {
  Compact = 'compact',
  Expanded = 'expanded',
}

export function Header({ reportedCount, reportOnPress }: IProps) {
  const content = useSelector<TRootState, TContentState>((state) => state.content);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const [contributors, setContributors] = React.useState<string | null>(null);

  const prettyContributorsValue = i18n.toNumber(contributors ? cleanIntegerVal(contributors) : 0, {
    delimiter: ',',
    precision: 0,
  });

  React.useEffect(() => {
    setContributors(startupInfo?.users_count.toString() ?? null);
  }, [startupInfo]);

  const onReport = () => {
    Analytics.track(events.REPORT_NOW_CLICKED, { headerType: EHeaderType.Expanded });
    reportOnPress();
  };

  return (
    <View style={styles.root}>
      <Image source={covidByZoeIcon} style={styles.covidByZoe} />

      <View style={styles.reportCard}>
        <Header3Text style={styles.dateLabel}>{content.todayDate}</Header3Text>
        <BrandedButton
          onPress={onReport}
          style={[styles.reportButton, styles.reportButtonExpanded]}
          testID="button-report-today"
        >
          {i18n.t('dashboard.report-today')}
        </BrandedButton>
        {reportedCount ? (
          <CaptionText style={styles.reportedCount}>
            {i18n.t('dashboard.you-have-reported-x-times', { count: reportedCount })}
          </CaptionText>
        ) : null}
      </View>

      {contributors ? (
        <>
          <RegularText style={styles.contributorsLabel}>{i18n.t('dashboard.contributors-so-far')}</RegularText>
          <Header3Text style={styles.contributorsCount}>{prettyContributorsValue}</Header3Text>
        </>
      ) : null}
    </View>
  );
}

export function CompactHeader({ reportOnPress }: IProps) {
  const onReport = () => {
    Analytics.track(events.REPORT_NOW_CLICKED, { headerType: EHeaderType.Compact });
    reportOnPress();
  };

  return (
    <View style={styles.root}>
      <Image source={covidIcon} style={[styles.logo, styles.compactHeaderLogo]} />
      <BrandedButton onPress={onReport} style={[styles.reportButton, styles.reportButtonCompact]}>
        {i18n.t('dashboard.report-now')}
      </BrandedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  compactHeaderLogo: {
    bottom: 22,
    left: 16,
    position: 'absolute',
  },

  contributorsCount: {
    color: colors.white,
    textAlign: 'center',
    width: '100%',
  },

  contributorsLabel: {
    color: colors.white,
  },

  covidByZoe: {
    alignSelf: 'flex-start',
    height: 56,
    margin: sizes.xs,
    marginLeft: sizes.m,
    resizeMode: 'contain',
    width: 136,
  },

  dateLabel: {
    color: 'white',
    textAlign: 'center',
    width: '100%',
  },

  logo: {
    height: 54,
    margin: sizes.xs,
    resizeMode: 'contain',
    width: 54,
  },

  reportButton: {
    alignSelf: 'center',
    backgroundColor: colors.purple,
    elevation: 0,
    height: 48,
    marginBottom: sizes.xs,
    marginTop: sizes.m,
    textAlign: 'center',
  },

  reportButtonCompact: {
    paddingHorizontal: sizes.xxl,
  },

  reportButtonExpanded: {
    paddingHorizontal: sizes.xl,
  },

  reportCard: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: sizes.m,
    marginHorizontal: sizes.m,
    marginVertical: sizes.m,
    paddingVertical: sizes.l,
  },

  reportedCount: {
    color: colors.backgroundFour,
    margin: sizes.xxs,
    textAlign: 'center',
  },

  root: {
    alignItems: 'center',
    backgroundColor: colors.predict,
    paddingBottom: sizes.l,
    paddingTop: sizes.m,
    width: '100%',
  },
  test: {
    color: colors.white,
  },
});

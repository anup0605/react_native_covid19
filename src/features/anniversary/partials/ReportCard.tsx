import { SolidColorBar, Text } from '@covid/components';
import { TReportedEvent } from '@covid/features/anniversary/types';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import ReportedEvent from './ReportedEvent';

interface IProps {
  reportedEvents: TReportedEvent[];
}

function ReportCard({ reportedEvents }: IProps) {
  return (
    <View style={styles.container}>
      <Text rhythm={24} textClass="h4">
        Thanks for reporting
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: sizes.l }}>
        {reportedEvents.map((reportedEvent, index) => {
          const key = `reported-event-${index}`;
          return (
            <View key={key} style={{ paddingBottom: sizes.m, width: '33%' }}>
              <ReportedEvent reportedEvent={reportedEvent} />
            </View>
          );
        })}
      </View>
      <SolidColorBar backgroundColor={colors.tertiary} height={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: sizes.m,
    paddingVertical: sizes.l,
  },
});

export default ReportCard;

import { Icon, Text, TIconName } from '@covid/components';
import { TTimelineEvent } from '@covid/features/anniversary/types';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  timelineEvent: TTimelineEvent;
}

function Highlight({ timelineEvent }: IProps) {
  const { ongoing, title } = timelineEvent;
  const iconName: TIconName = ongoing === 'ONGOING' ? 'blog' : 'noun_Crystal-Ball_3517088-1';
  const iconSize = ongoing === 'ONGOING' ? 18 : 24; // compensate for smaller icon
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.circle}>
          <Icon iconName={iconName} iconSize={iconSize} iconStyle={{ color: '#0165B5' }} />
        </View>
        <Text style={{ color: '#0165B5', marginLeft: sizes.s }} textClass="h4">
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: sizes.m,
    height: sizes.m * 2,
    justifyContent: 'center',
    width: sizes.m * 2,
  },
  container: {
    marginBottom: sizes.xxl,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Highlight;

import { QuoteMarks } from '@assets';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  children: React.ReactNode;
}

export default function SpeechCard({ children }: IProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.arrow, styles.shadow]} />
      <View style={[styles.container, styles.shadow, { paddingHorizontal: sizes.m, paddingVertical: sizes.l }]}>
        <View style={{ marginBottom: sizes.m }}>
          <View style={{ marginBottom: sizes.m }}>
            <QuoteMarks />
          </View>
          <View>{children}</View>
        </View>
        <View />
      </View>
      <View style={styles.arrow} />
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    backgroundColor: 'white',
    height: 16,
    left: 48,
    position: 'absolute',
    top: 8,
    transform: [{ rotate: '45deg' }],
    width: 16,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: sizes.m,
    width: '100%',
  },
  shadow: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  wrapper: {
    flex: 1,
    paddingTop: sizes.m,
    width: '100%',
  },
});

import { Icon, Link, Text } from '@covid/components';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TimelineCard() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon iconName="star" iconSize={18} />
        <Text style={styles.marginLeft} textClass="pBold">
          Timeline card
        </Text>
      </View>
      <Text style={styles.body} textClass="h5Light">
        First to identify loss of smell & taste as a key symptom of COVID
      </Text>
      <Link style={styles.marginBottom} text="More details" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginBottom: 24,
    marginTop: 12,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 48,
    padding: 16,
  },
  marginBottom: {
    marginBottom: 8,
  },
  marginLeft: {
    marginLeft: 12,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

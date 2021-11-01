import Text from '@covid/components/typography/text';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  imageNode: React.ReactNode;
  location: string;
  name: string;
  title: string;
}

export default function DoctorProfile(props: IProps) {
  return (
    <View style={styles.wrapper}>
      {props.imageNode}
      <View style={styles.view}>
        <Text>{props.name}</Text>
        <Text style={styles.text} textClass="pSmall">
          {props.title}
        </Text>
        <Text style={styles.text} textClass="pSmall">
          {props.location}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#888B8C',
  },
  view: {
    marginLeft: sizes.m,
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: sizes.m,
  },
});

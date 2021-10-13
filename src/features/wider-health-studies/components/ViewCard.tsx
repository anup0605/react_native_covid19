import { Card, Text } from '@covid/components';
import { OutlineButton } from '@covid/features/wider-health-studies/components/OutlineButton';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet } from 'react-native';

type TProps = {
  buttonText: string;
  description: string;
  onPress: () => void;
  title: string;
};

export function ViewCard(props: TProps) {
  return (
    <Card useShadow>
      <Text inverted colorPalette="uiDark" colorShade="darker" textClass="pMedium">
        {props.title}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.description} textClass="pLight">
        {props.description}
      </Text>
      <OutlineButton onPress={props.onPress} text={props.buttonText} />
    </Card>
  );
}

const styles = StyleSheet.create({
  description: {
    marginBottom: sizes.l,
    marginTop: sizes.s,
  },
});

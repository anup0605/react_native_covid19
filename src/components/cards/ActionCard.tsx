import { Text } from '@covid/components/typography';
import { sizes, useTheme } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface IProps {
  actionTitle: string;
  buttonColor?: string;
  children: React.ReactNode;
  onPress: () => void;
  outline?: boolean;
  textColor?: string;
}

export default function ActionCard({ actionTitle, buttonColor, children, onPress, outline, textColor }: IProps) {
  const { colors } = useTheme();
  const bColor = buttonColor || colors.blue.main.bgColor;
  const tColor = textColor || 'white';
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        accessible
        accessibilityRole="button"
        onPress={onPress}
        style={[styles.container, styles.shadow, { paddingHorizontal: sizes.m, paddingVertical: sizes.l }]}
      >
        <View style={{ marginBottom: sizes.m }}>
          <View>{children}</View>
        </View>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: outline ? 'transparent' : bColor,
            borderColor: bColor,
            borderRadius: sizes.l,
            borderWidth: 1,
            justifyContent: 'center',
            padding: sizes.s,
          }}
        >
          <Text style={{ color: outline ? bColor : tColor }}>{actionTitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: sizes.m,
    height: '100%',
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
    paddingVertical: sizes.m,
    width: '100%',
  },
});

import { Text } from '@covid/components/typography';
import { getDietStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import { sizes, useTheme } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';

interface IProps {
  location: string;
  name: string;
  title: string;
}

export default function BasicProfile({ location, name, title }: IProps) {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: sizes.xxs }}>
      {getDietStudyDoctorImage()}
      <Text rhythm={8}>{name}</Text>
      <Text style={{ color: colors.uiDark.dark.bgColor }} textClass="pSmallLight">
        {title}, {location}
      </Text>
    </View>
  );
}

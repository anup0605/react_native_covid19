import { Text } from '@covid/components';
import { TGridSize } from '@covid/themes';
import * as React from 'react';

interface IProps {
  subTitle: string;
  rhythm?: TGridSize;
  title: string;
}

function DietScoreHeader({ rhythm = 16, subTitle, title }: IProps) {
  return (
    <>
      <Text rhythm={8} textClass="h4">
        {title}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="dark" rhythm={rhythm} textClass="pSmallLight">
        {subTitle}
      </Text>
    </>
  );
}

export default DietScoreHeader;

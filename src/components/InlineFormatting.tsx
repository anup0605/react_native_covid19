import { colors, fontStyles } from '@theme';
import * as React from 'react';
import Markdown from 'react-native-easy-markdown';

type TProps = {
  text: string;
  textAlign?: 'center' | 'left' | 'right';
};

export const InlineFormatting = ({ text, textAlign }: TProps) => {
  const defaultStyles = {
    em: {
      color: colors.white,
    },
    strong: {
      color: colors.white,
    },
    text: {
      ...fontStyles.bodyReg,
      ...(textAlign && { textAlign }),
      color: colors.lightBrand,
    },
  };

  return <Markdown markdownStyles={defaultStyles}>{text}</Markdown>;
};

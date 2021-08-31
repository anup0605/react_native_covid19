import { ITheme } from '@covid/themes/types';
import { IDefaultTheme } from 'styled-components';

import { colors } from './colors';
import { sizes } from './sizes';
import { styles } from './typography';

declare module 'styled-components' {
  export interface IDefaultTheme extends ITheme {}
}

const theme: IDefaultTheme = {
  colors,
  sizes,
  text: styles,
};

export default theme;

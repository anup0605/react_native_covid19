import { IThemeVars } from '@covid/themes/types';
import { IDefaultTheme } from 'styled-components';

import { colors } from './colors';
import { grid } from './grid';
import { styles } from './typography';

declare module 'styled-components' {
  export interface IDefaultTheme extends IThemeVars {}
}

const theme: IDefaultTheme = {
  colors,
  grid,
  text: styles,
};

export default theme;

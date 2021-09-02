import { sizes } from '../theme/sizes';
import { IColorPalettes } from './colors';
import { TTextStyles } from './typography';

export interface ITheme {
  colors: IColorPalettes;
  sizes: typeof sizes;
  text: TTextStyles;
}

import { IColorPalettes } from './colors';
import { IGrid } from './grid';
import { TTextStyles } from './typography';

export interface IThemeVars {
  // colors
  colors: IColorPalettes;
  // layout
  grid: IGrid;
  // typography
  text: TTextStyles;
}

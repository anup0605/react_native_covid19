import * as AvatarImages from '@assets';

export type TAvatarName =
  | 'profile1'
  | 'profile2'
  | 'profile3'
  | 'profile4'
  | 'profile5'
  | 'profile6'
  | 'profile7'
  | 'profile8'
  | 'profile9'
  | 'profile10';
export const DEFAULT_PROFILE = 'profile1';

export const getAvatarByName = (name: TAvatarName) => {
  return AvatarImages[name] || AvatarImages[DEFAULT_PROFILE];
};

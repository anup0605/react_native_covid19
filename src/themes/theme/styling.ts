import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizes } from './sizes';

export default StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  absoluteFill: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  backgroundWhite: {
    backgroundColor: 'white',
  },
  centerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorGray: {
    color: colors.gray.main.bgColor,
  },
  colorWhite: {
    color: 'white',
  },
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  fullWidth: {
    width: '100%',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  itemsEnd: {
    alignItems: 'flex-end',
  },
  marginBottom: {
    marginBottom: sizes.m,
  },
  marginBottomAuto: {
    marginBottom: 'auto',
  },
  marginBottomBig: {
    marginBottom: sizes.l,
  },
  marginBottomHuge: {
    marginBottom: sizes.xl,
  },
  marginBottomSmall: {
    marginBottom: sizes.xs,
  },
  marginHorizontal: {
    marginHorizontal: sizes.m,
  },
  marginHorizontalTiny: {
    marginHorizontal: sizes.xxs,
  },
  marginLeft: {
    marginLeft: sizes.m,
  },
  marginRightSmall: {
    marginRight: sizes.xs,
  },
  marginTop: {
    marginTop: sizes.m,
  },
  marginTopAuto: {
    marginTop: 'auto',
  },
  marginTopBig: {
    marginTop: sizes.l,
  },
  marginTopHuge: {
    marginTop: sizes.xl,
  },
  marginTopSmall: {
    marginTop: sizes.xs,
  },
  marginVertical: {
    marginVertical: sizes.m,
  },
  marginVerticalAuto: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  marginVerticalBig: {
    marginVertical: sizes.l,
  },
  marginVerticalHuge: {
    marginVertical: sizes.xl,
  },
  marginVerticalSmall: {
    marginVertical: sizes.xs,
  },
  measureHeight: {
    height: '100%',
    position: 'absolute',
    width: 0,
  },
  measureWidth: {
    height: 0,
    width: '100%',
  },
  padding: {
    padding: sizes.m,
  },
  paddingBig: {
    padding: sizes.l,
  },
  paddingVertical: {
    paddingVertical: sizes.m,
  },
  relative: {
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  shadow: {
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textCenter: {
    textAlign: 'center',
  },
  textarea: {
    backgroundColor: '#EEEEEF',
    borderRadius: sizes.m,
  },
});

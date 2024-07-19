import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import { scale } from '../theme/scaling';

export type spaceType =
  | 'xxs'
  | 'xs'
  | 's'
  | 'm'
  | 'xm'
  | 'mb'
  | 'ml'
  | 'base'
  | 'l'
  | 'xl'
  | 'xxl';

export type sizeType = spaceType | 'ml';


type Style = {common: ViewStyle} & {
  [k in sizeType]: ViewStyle;
};

export const stylesV = StyleSheet.create<Style>({
  common: {
    alignSelf: 'stretch',
  },
  xxs: {
    height: scale(2),
  },
  xs: {
    height: scale(4),
  },
  s: {
    height: scale(6),
  },
  m: {
    height: scale(8),
  },
  xm: {
    height: scale(10),
  },
  mb: {
    height: scale(12),
  },
  base: {
    height: scale(16),
  },
  ml: {
    height: scale(20),
  },
  l: {
    height: scale(24),
  },
  xl: {
    height: scale(32),
  },
  xxl: {
    height: scale(64),
  },
});

export const stylesH = StyleSheet.create<Style>({
  common: {
    alignSelf: 'stretch',
  },
  xxs: {
    width: scale(2),
  },
  xs: {
    width: scale(4),
  },
  s: {
    width: scale(6),
  },
  m: {
    width: scale(8),
  },
  xm: {
    width: scale(10),
  },
  mb: {
    width: scale(12),
  },
  base: {
    width: scale(16),
  },
  ml: {
    width: scale(20),
  },
  l: {
    width: scale(24),
  },
  xl: {
    width: scale(32),
  },
  xxl: {
    width: scale(64),
  },
});
interface SpaceProps {
  size?: sizeType;
  transparent?: boolean;
}

export function SpaceV({size = 'base', transparent = false}: SpaceProps) {
  return (
    <View
      testID="SpaceV"
      style={[stylesV.common, stylesV[size], transparent && {opacity: 0}]}
    />
  );
}

export function SpaceH({size = 'base', transparent = false}: SpaceProps) {
  return (
    <View
      testID="SpaceH"
      style={[stylesH.common, stylesH[size], transparent && {opacity: 0}]}
    />
  );
}

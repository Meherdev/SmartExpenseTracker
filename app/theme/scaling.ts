import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 412;
const guidelineBaseHeight = 870;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  Math.ceil(height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const isScreenSmaller = PixelRatio.get() <= 3 || height <= 750;
export {scale, verticalScale, moderateScale, isScreenSmaller};

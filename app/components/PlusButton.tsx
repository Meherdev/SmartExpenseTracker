import { Image, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';

interface PlusButtonProsps {
    containerStyle: ViewStyle,
    onPress: () => void;
}

export default function PlusButton({containerStyle, onPress}: PlusButtonProsps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}  style={containerStyle}>
      <Image style={styles.image} source={require('@/assets/images/add-button.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    image: {
        height: 60,
        width: 60
    }
})
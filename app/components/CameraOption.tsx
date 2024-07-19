import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { moderateScale } from '../theme/scaling';
import Icon from '@expo/vector-icons/MaterialIcons';

interface CameraOptionProps {
    onPress: () => void;
    name: string,
}

export default function CameraOption({onPress, name}: CameraOptionProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name={name as never} size={moderateScale(35)} color={Colors.brand} />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        padding: moderateScale(10),
        borderRadius: moderateScale(50),
        alignItems: 'center'
    },
})
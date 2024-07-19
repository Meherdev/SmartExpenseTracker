import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { moderateScale } from '../theme/scaling'
import { LinearGradient } from 'expo-linear-gradient'

interface CustomButtonProps {
    title: string,
    size?: 'small' | 'large',
    onPress: () => void,
}

export default function CustomButton({title, size = 'small', onPress}: CustomButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <LinearGradient style={[styles.btnContainer, size === 'small' ? styles.small : styles.large]} colors={Colors.primaryGradient}>
            <Text style={styles.btnText}>{title}</Text>
        </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    btnContainer: { 
        paddingHorizontal: moderateScale(20), 
        paddingVertical: moderateScale(18),
        alignItems: "center", 
        borderRadius: moderateScale(10),
      },    
    btnText: {
        color: Colors.text,
        fontSize: moderateScale(18),
        fontWeight: '700'
    },
    large: {
        width: '100%',
    },
    small: {
        width: 'auto'
    }
})
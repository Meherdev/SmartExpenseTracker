import { StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { SpaceV } from './Space'
import { moderateScale } from '../theme/scaling'

export default function Container({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.container}>
        <SpaceV size='xxl'/>
        <StatusBar barStyle="dark-content" />
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: moderateScale(20)
    }
})
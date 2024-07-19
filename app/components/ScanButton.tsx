import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale } from '../theme/scaling'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'

export default function ScanButton() {
  return (
    <TouchableOpacity onPress={() => {router.push('screens/scanner')}} style={styles.container}>
      <Image style={styles.img} source={require('@/assets/images/camera.png')}/>
      {/* <SpaceV size='m'/> */}
      {/* <Text style={styles.text}>Scan Invoice</Text> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(15),
        elevation: 10,
        backgroundColor: Colors.brand,
        shadowColor: 'black',
        shadowOffset: {width: 10, height: 10},
    },
    img: {
        height: moderateScale(40),
        width: moderateScale(40)
    },
    text: {
        color: Colors.text,
        fontWeight: '700'
    }
})
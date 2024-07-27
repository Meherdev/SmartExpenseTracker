import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale } from '../theme/scaling'
import { Colors } from '@/constants/Colors'
import { SpaceV } from './Space'
import { router } from 'expo-router';

interface BannerProps {
  val: number;
}

export default function Banner({val}: BannerProps) {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.bannerText}>Total Expenses</Text>
        <SpaceV size='m' />
        <Text style={styles.bannerMainText}>$ {val}</Text>
      </View>
      <TouchableOpacity onPress={() => { router.push('screens/expenses')}}>
        <Text style={styles.link}>
            View All
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: moderateScale(120),
        borderRadius: 20,
        elevation: 10,
        justifyContent: 'space-between',
        backgroundColor:Colors.brand,
        padding: moderateScale(20),
        color: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,  
    },
    bannerText: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: Colors.background
    },
    bannerMainText: {
        fontSize: moderateScale(42),
        fontWeight: '700',
        color: Colors.background
    },
    link: {
        color: Colors.primary,
        textDecorationLine: 'underline',
        fontSize: moderateScale(12),
    }
})
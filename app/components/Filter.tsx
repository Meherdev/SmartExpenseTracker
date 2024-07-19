import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import { moderateScale } from '../theme/scaling';
import { Colors } from '@/constants/Colors';
import { SpaceH } from './Space';
import { Filters } from '@/constants/AppData';

interface FilterProps {
    selected: string,
    onSelected: (filtername: string) => void
}

export default function Filter({selected, onSelected}: FilterProps) {
  return (
    <View style={styles.container}>
        {Filters.map((filtername, i) => (
            <TouchableOpacity style={[styles.filterContainer, selected === filtername && {backgroundColor: Colors.primary} ]} onPress={() => onSelected(filtername)} key={i}>
                <Text style={[styles.text, selected === filtername && {color: Colors.text}]}>{filtername}</Text>
                <SpaceH size='m' />
            </TouchableOpacity>
        ))}
    </View> 
)
    
}

const styles = StyleSheet.create({
    container: {
        borderRadius: moderateScale(20),
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.brand
    },
    text: {
        fontSize: moderateScale(12),
        color: Colors.background,
        fontWeight: '700'
    },
    filterContainer: {
        padding: moderateScale(10),
        width: moderateScale(75),
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(20)
    }
})


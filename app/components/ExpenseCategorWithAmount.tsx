import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { EXPENSE_CATEGORIES } from '@/constants/AppData';
import { ExpenseCategories } from '../types';
import { moderateScale } from '../theme/scaling';
import { SpaceV } from './Space';
import { Colors } from '@/constants/Colors';

interface ExpenseCategorWithAmountProps {
    name: ExpenseCategories,
    amount: string
}

export default function ExpenseCategorWithAmount({name, amount}: ExpenseCategorWithAmountProps) {
  return (
    <View style={styles.container}>
      <Icon size={moderateScale(28)} color={Colors.primary} name={EXPENSE_CATEGORIES[name].icon as never || 'attach-money'} />
      <SpaceV size='m' />
      <Text style={styles.text}>{EXPENSE_CATEGORIES[name].title}</Text>
      <SpaceV size='m' />
      <Text style={styles.text}>${amount}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: moderateScale(10),
        minWidth: moderateScale(85),
        padding: moderateScale(10),
        alignItems: 'center',
        backgroundColor: Colors.background,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,  
    },
    text: {
        fontSize: moderateScale(12),
        fontWeight: '600',
        color: Colors.lightText
    }

})
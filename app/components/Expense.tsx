import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { ExpenseCategories } from '../types';
import { EXPENSE_CATEGORIES } from '@/constants/AppData';
import { moderateScale } from '../theme/scaling';
import { SpaceH, SpaceV } from './Space';
import { Colors } from '@/constants/Colors';

interface ExpenseProps {
    title: string,
    category: ExpenseCategories,
    amount: string,
    date: string
}

export default function Expense({title, category, amount, date}: ExpenseProps) {
  return (
    <View style={styles.container}>
      <Icon color={Colors.primary} name={EXPENSE_CATEGORIES[category].icon as never} size={moderateScale(24)}/>
      <SpaceH size='l' />
      <View>
        <Text style={styles.mainText}>{title}</Text>
        <SpaceV size='m' />
        <Text style={styles.smallText}>
            <Text>{date}</Text> | <Text>{EXPENSE_CATEGORIES[category].title as never}</Text>
        </Text>
      </View>
      <View style={styles.containerRight}>
        <Text style={styles.amountText}>$ {amount}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: moderateScale(20),
        backgroundColor: Colors.greyBackground,
        borderRadius: moderateScale(10)
    },
    containerRight: {
        marginLeft: 'auto'
    },
    mainText: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: Colors.text
    },
    smallText: {
      fontSize: moderateScale(12),
      fontWeight: '500',
      color: Colors.lightText
    },
    amountText: {
      fontSize: moderateScale(12),
      fontWeight: '500',
      color: Colors.secondary,
    }
    
})
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { moderateScale } from '../theme/scaling'
import { Colors } from '@/constants/Colors'
import { SpaceH, SpaceV } from './Space'
import ExpenseCategorWithAmount from './ExpenseCategorWithAmount'

const TOP = [
  {
    title: 'airlines',
    amount: '100',
  },
  {
    title: 'groceries',
    amount: '100',
  },
  {
    title: 'gas',
    amount: '100',
  },
  {
    title: 'hotel',
    amount: '100',
  }
]

export default function TopExpenses() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerLabel}>Top Expenses</Text>
      <SpaceV size='l' />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {
        TOP.map((exp, i) => (
          <View key={i} style={styles.expenseContainer}>
            <ExpenseCategorWithAmount name={exp.title as never} amount={exp.amount} />
            <SpaceH size='xl' />
          </View>
        ))
      }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerLabel: {
        fontSize: moderateScale(16),
        color: Colors.text,
        fontWeight: '600'
    },
    headerButton: {
        color: Colors.backgroundLight,
        fontSize: moderateScale(12),
        textDecorationLine: 'underline'
    },
    filerContainer: {
        flexDirection: 'row'
    },
    expenseContainer: {
      flexDirection: 'row',
      padding: moderateScale(2),
    }
})
import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { moderateScale } from '../theme/scaling'
import Expense from '../components/Expense'

const dummyData = [
  {
    title: 'shvs smsm s m',
    category: 'airlines',
    amount: '100',
    date: '7/15/24'
  },
  {
    title: 'shvs smsm s m',
    category: 'commute',
    amount: '100',
    date: '7/15/24'
  },
  {
    title: 'shvs smsm s m',
    category: 'gas',
    amount: '100',
    date: '7/15/24'
  },
  {
    title: 'shvs smsm s m',
    category: 'groceries',
    amount: '100',
    date: '7/15/24'
  }
]

export default function expenses() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={({item}) => (<Expense title={item.title} category={item.category as never} amount={item.amount} date={item.date} />)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundBright,
    padding: moderateScale(20),
    
  }
})
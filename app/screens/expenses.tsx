import { View, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { moderateScale } from '../theme/scaling'
import Expense from '../components/Expense';
import { generateClient } from 'aws-amplify/api';
import * as queries from './../../src/graphql/queries';
import { ExpenseType } from '@/constants/types';


const client = generateClient();

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

  const [expenses, setExpenses] = useState<ExpenseType | null>(null)

  const fetchExpenses = async() => {
    console.log('====================================');
    console.log("fetching total expense value");
    console.log('====================================');
    try {
      const {data: {listExpenses}} = await client.graphql({
        query: queries.listExpenses,
      })

      console.log('====================================');
      console.log(listExpenses);
      console.log('====================================');
      if (listExpenses) {
        setExpenses(listExpenses.items);
      }
    } catch (err) {
      console.log('Error fetching total expense value ::::', err);
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])
  
  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={({item}) => (<Expense title={item.vendor} category={item.category as never} amount={item.amount} date={item.createdAt} />)}
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
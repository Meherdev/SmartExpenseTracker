import React, {useEffect, useState } from 'react'
import Container from './components/Container'
import DashboardHeader from './components/DashboardHeader'
import { StyleSheet, View } from 'react-native'
import { moderateScale } from './theme/scaling'
import ScanButton from './components/ScanButton'
import { SpaceV } from './components/Space'
import Banner from './components/Banner'
import Analytics from './components/Analytics'
import TopExpenses from './components/TopExpenses'
import Filter from './components/Filter'
import amplifyconfig from '../src/aws-exports';
import {
  withAuthenticator,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api';
import * as queries from './../src/graphql/queries';
import { getCurrentUser } from 'aws-amplify/auth'

const client = generateClient();

Amplify.configure(amplifyconfig);



function Dashboard() {
  
  const [filter, setFilter] = useState<string>("Week");
  const [totalExpenseValue, setTotalExpenseValue] = useState<number>(0);


  const fetchTotalExpenseAmount = async() => {
    console.log('====================================');
    console.log("fetching total expense value");
    console.log('====================================');
    try {
      const {userId} = await getCurrentUser();

      const {data: {getTotalExpenses}} = await client.graphql({
        query: queries.getTotalExpenses,
        variables: {userId, filter}
      })
      if (getTotalExpenses) {
        setTotalExpenseValue(getTotalExpenses);
      }
      console.log('Total expense value', getTotalExpenses);
    } catch (err) {
      console.log('Error fetching total expense value ::::', err);
    }
  }



  const fetchDashBoardData = async() => {
    await fetchTotalExpenseAmount()
  }

  useEffect(() => {
    fetchDashBoardData()
  }, [filter])


  return (
    <Container>
      <SpaceV size='m' />
      <DashboardHeader />
      <Filter onSelected={(name) => {setFilter(name)}} selected={filter}/>
      <SpaceV size='l'/>
      <Banner val={totalExpenseValue} />
      <SpaceV size='l'/>
      <Analytics filter={filter} />
      <SpaceV size='l' />
      <TopExpenses />
      <View style={styles.bottomBarContainer}>
        <ScanButton />
      </View>
    </Container>
  )
}


const styles = StyleSheet.create({
  bottomBarContainer: {
    height: moderateScale(100),
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  }
})


export default withAuthenticator(Dashboard);


import React, { useState } from 'react'
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

export default function Dashboard() {
  const [filter, setFilter] = useState('Week');
  return (
    <Container>
      <SpaceV size='m' />
      <DashboardHeader name='Meher' />
      <Filter onSelected={(name) => {setFilter(name)}} selected={filter}/>
      <SpaceV size='l'/>
      <Banner />
      <SpaceV size='l'/>
      <Analytics />
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


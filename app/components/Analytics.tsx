import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { BarChart } from 'react-native-gifted-charts'
import { Colors } from '@/constants/Colors'
import { moderateScale } from '../theme/scaling'
import { SpaceV } from './Space'
import { getCurrentUser } from 'aws-amplify/auth'
import * as queries from './../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

interface AnlayticsProps {
  filter: string
}

export default function Analytics({filter}: AnlayticsProps) {

  const fetchGraphData = async () => {
      console.log('====================================');
      console.log("fetching total expense value");
      console.log('====================================');
      try {
        const {userId} = await getCurrentUser();
  
        const {data: {getExpensesByFilter}} = await client.graphql({
          query: queries.getExpensesByFilter,
          variables: {userId, filter}
        })
        if (getExpensesByFilter) {
          console.log("fetched graph data", getExpensesByFilter);
        }
      } catch (err) {
        console.log('Error fetching total expense value ::::', err);
      }  
  }

  useEffect(() => {
    fetchGraphData();
  }, [filter])
  
  return (
    <View style={styles.container}>
      <SpaceV size='m' />
      <Text style={styles.chartTitle}>
        This week expenses
      </Text>
      <BarChart
          data={[
            {value: 20, label: 'M'},
            {value: 40, label: 'T'},
            {value: 30, label: 'W'},
            {value: 50, label: 'TR'},
            {value: 40, label: 'F'},
            {value: 35, label: 'SA'},
            {value: 25, label: 'S'},
          ]}
          barWidth={moderateScale(18)}
          roundedTop
          roundedBottom
          noOfSections={5}
          yAxisThickness={0}
          xAxisThickness={0}
          maxValue={50}
          showGradient
          gradientColor={'#06C5C1'}
          frontColor={'#1D9BF0'}
          isAnimated
          height={150}
          barMarginBottom={0}
          yAxisTextStyle={{color: Colors.lightText, fontSize: moderateScale(12)}}
          xAxisLabelTextStyle={{color: Colors.lightText, fontSize: moderateScale(12)}}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,  
    height: 250,
    backgroundColor: Colors.background,
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: moderateScale(10)
  },
  chartTitle: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.lightText
  }
})
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SpaceH } from './Space';
import { moderateScale } from '../theme/scaling';
import { Colors } from '@/constants/Colors';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { fetchUserAttributes } from 'aws-amplify/auth';

export default function DashboardHeader() {
  const {signOut} = useAuthenticator();
  const [name, setName] = useState<string | undefined>('');
  
  // useEffect(() => {
  //   fetchTotalExpenses()
  // }, [filter])
  

  useEffect(() => {
    (async () => {
      const {name} = await fetchUserAttributes();
      setName(name);
    })()
  }, [])
  
  return (
      <View style={styles.header}>
        <Image style={styles.avatar} source={require('@/assets/images/cat.png')}/>
        <SpaceH size='l'/>
        <Text style={styles.headerText}>Hello {name}!</Text>
        <TouchableOpacity onPress={signOut} style={{marginLeft: 'auto'}}>
          <Text style={styles.logoutBtn}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(20),
        borderRadius: moderateScale(5),
        padding: moderateScale(20)
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      paddingBottom: 20
    },
    avatar: {
        width: moderateScale(40),
        height: moderateScale(40)
    },
    headerText: {
        fontSize: moderateScale(24),
        color: Colors.text,   
        fontWeight: '700'
    },
    bannerText: {
      fontSize: moderateScale(16),
      fontWeight: '700',
      color: Colors.text
    },
    bannerMainText: {
      fontSize: moderateScale(42),
      fontWeight: '700',
      color: Colors.text
  },
    logoutBtn: {
      color: Colors.secondary,
      fontWeight: '600'
    }
})
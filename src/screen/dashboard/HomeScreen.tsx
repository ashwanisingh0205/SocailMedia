import {  StyleSheet, View } from 'react-native'
import React from 'react'
import CustomView from '../../components/global/CustomView'
import CustomText from '../../components/global/CustomText'
import CustomGradient from '../../components/global/CustomGradient'
import GlobalFeed from '../../components/feed/GlobalFeed'

const HomeScreen = () => {
  return (
   <CustomView>
    <CustomGradient postion='top'/>
    <GlobalFeed/>

    <CustomGradient postion='bottom'/>
   </CustomView>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
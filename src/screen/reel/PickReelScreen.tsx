import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomView from '../../components/global/CustomView'
import CustomHeader from '../../components/global/CustomHeader'
import PickerReelSection from '../../components/reel/PickerReelSection'
import CustomText from '../../components/global/CustomText'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '../../constants/Colors'

const PickReelScreen = () => {
  return (
    <CustomView>
      <SafeAreaView style={{margin:5}}>
        <CustomHeader title='New Reel'/>
</SafeAreaView>
<View style={{marginTop:6}}>
  <PickerReelSection/>
</View>
<View style={{flexDirection:'row',margin:4,gap:4,marginTop:5}}>
  <CustomText>Recent</CustomText>
  <Icon name="chevron-down" size={RFValue(20)} color={Colors.white} />

</View>
    </CustomView>
  )
}

export default PickReelScreen

const styles = StyleSheet.create({})
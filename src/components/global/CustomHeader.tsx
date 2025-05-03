import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { goBack, navigate } from '../../utils/NavigationUtils';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../constants/Colors';
import CustomText from './CustomText';
import InquiryModal from '../InquiryModal';
interface Headerprops{
    title:string,
    ishandle?:()=>void,
    
}
const CustomHeader:FC <Headerprops> = ({title}) => {
    const ishandle=()=>{
       Alert.alert('Warning', `Please Don't Upload Any Irreverent Content `)
    }
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={()=>goBack()}>
        <Icon name="keyboard-backspace"
        size={RFValue(20)}
        color={'white'}
        />

    </TouchableOpacity>
    <CustomText>{title}</CustomText>
    <TouchableOpacity onPress={ishandle}>
    <Icon name="information-outline"
        size={RFValue(20)}
        color={'white'}
        />

    </TouchableOpacity>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        margin:5
    }
})
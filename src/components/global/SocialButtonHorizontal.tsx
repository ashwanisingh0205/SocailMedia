import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native';
import CustomText from './CustomText';


interface SocialButtonHorizontalProps {
    icon:React.ReactNode;
    text:string;
    backgroundcolor:string;
    onPress:()=>void;
    textColor:string;
}
const SocialButtonHorizontal:FC<SocialButtonHorizontalProps>= ({icon,text,backgroundcolor,onPress,textColor}) => {
    
  return (
   <TouchableOpacity onPress={onPress} style={[styles.container,{backgroundColor:backgroundcolor}]}>
    {icon}
  
        <CustomText variant='h8' style={[styles.text,{color:textColor}]}>{text}</CustomText>
   
   </TouchableOpacity>
  )
}

export default SocialButtonHorizontal

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        padding:10,
        borderWidth:Platform.OS==='ios'?0.3:0.5,
        paddingHorizontal:20,
        width:'100%',
        marginVertical:10,
    },text:{
        width:'90%',
        alignSelf:'center',
        textAlign:'center',
        fontWeight:750,
    }
})
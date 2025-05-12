import { StyleSheet, Text, View ,ViewStyle } from 'react-native'
import React, { Children, ReactNode } from 'react'
import LinearGradient from 'react-native-linear-gradient'
interface customprops{
    postion:'bottom'|'top',
    style?:ViewStyle,
}
const CustomGradient:React.FC<customprops> = ({postion='top',style}) => {

    const darkcolor=[
        'rgba(0,0,0,0.9)',
    'rgba(0,0,0,0.8)',
    'rgba(0,0,0,0.8)',
    'rgba(0,0,0,0.7)',
    'rgba(0,0,0,0.4)',
    'rgba(0,0,0,0.1)',
    'rgba(0,0,0,0)',
    ]

    const bottomcolor=[...darkcolor].reverse();
    const gradientstyle:ViewStyle={
        position:'absolute',
        width:'100%',
        height:120,
        top:postion=='top'?0:undefined,
        bottom:postion=='bottom'?0:undefined,
        zIndex:999,

    }

  return (
    <LinearGradient colors={postion=='top'?darkcolor:bottomcolor}
    style={[gradientstyle,style]}
    />
  )
    
    
  
}

export default CustomGradient

const styles = StyleSheet.create({})
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { use, useState } from 'react'

const RegisterScreen = ({otplength=4 }) => {
  const [otpFields,setOptFields] = React.useState(new Array(otplength).fill(''))
  const[di,setDi]=useState(0);
  const handle=(e)=>{
   console.log(e)

  }
  // console.log(otpFields);
  return (
    <SafeAreaView style={{flex:1 , backgroundColor:'pink'}}>
     
      <View style={styles.container}>
        {otpFields.map((value,index)=>{
          return <TextInput keyboardType='number-pad'  maxLength={1} onKeyPress={handle} style={styles.inner}>{value}</TextInput>
        })}
      {/* <TextInput style={{width:45,borderWidth:2,borrderColor:'black',height:50,fontSize:16,textAlign:'center'}}></TextInput>
      <TextInput style={{width:45,borderWidth:2,borderColor:'black',height:50,padding:15}}></TextInput>
      <TextInput style={{width:45,borderWidth:2,borderColor:'black',height:50,padding:15}}></TextInput>
      <TextInput styler={{width:45,borderWidth:2,borderColor:'black',height:50,padding:15}}></TextInput> */}
      </View>
     
      
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    gap:30
  },
  inner:{
    width:45,
    borderWidth:2,
    height:50,fontSize:16,
    textAlign:'center'

  }
})
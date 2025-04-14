import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const RegisterScreen = () => {
  let otp=4;
  let data=new Array(otp).fill('')
  console.log(data)
  return (
    <SafeAreaView style={{flex:1 , backgroundColor:'pink'}}>
      {data.map((el,ind)=>{
        
      })}
      <View style={styles.container}>
      <TextInput style={{width:45,borderWidth:2,borderColor:'black',height:50,fontSize:16,textAlign:'center'}}></TextInput>
      <TextInput style={{width:45,borderWidth:2,borderColor:'black',height:50,padding:15}}></TextInput>
      <TextInput style={{width:45,borderWidth:2,borderColor:'black',height:50,padding:15}}></TextInput>
      <TextInput style={{width:45,borderWidth:2,borderColor:'black',height:50,padding:15}}></TextInput>
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
  }
})
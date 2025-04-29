import { Alert, Animated, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import CustomText from '../../components/global/CustomText';
import { token_storage } from '../../redux/storage';
import {jwtDecode} from 'jwt-decode'
import { navigate, resetAndNavigate } from '../../utils/NavigationUtils';
import { REFRESH_TOKEN } from '../../redux/API';
import { refresh_tokens } from '../../redux/apiConfig';
import { useAppDispatch } from '../../redux/reduxHook';
import { refetchuser } from '../../redux/action/userAction';


const SplashScreen:FC = () => {

  const [isStop,setIsStop] = useState(false);
   
  const scale=new Animated.Value(1);
  const dispatch=useAppDispatch();
  interface DecodedToken {
    exp:number;
  }

  const tokencheck=async()=>{
    const access_token=token_storage.getString('access_token') as string;
    const refresh_token=token_storage.getString('refresh_token') as string;

    if(access_token){
      const decodedAccessToken=jwtDecode<DecodedToken>(access_token);
      const decodedRefreshToken=jwtDecode<DecodedToken>(refresh_token);

      const currentTime=Date.now()/1000;
      if(decodedRefreshToken.exp<currentTime){
        resetAndNavigate('LoginScreen');
        Alert.alert('Session expired','Please login again')
        return;
      }
      if(decodedAccessToken.exp<currentTime){
        try {
          refresh_tokens();
          dispatch(refetchuser())

          

          
        } catch (error) {
          console.log(error)
          Alert.alert('There was an error')
          return;
          }
      }
      resetAndNavigate('BottomTab')
      return;

    }
    resetAndNavigate('LoginScreen')

  }

  useEffect(()=>{
    async function deeplink() {
      tokencheck()
      }
    deeplink();
  }
 
  )
  useEffect(()=>{
    const breathAnimation=Animated.loop(
      Animated.sequence([
        Animated.timing(scale,{
          toValue:1.2,//scale up
          duration:2000,
          useNativeDriver:true,
        }),
        Animated.timing(scale,{
          toValue:1,  //scale down
          duration:2000,
          useNativeDriver:true,
        })
      ])
      )
      if(!isStop){
        breathAnimation.start();
      }
      return()=>{
        breathAnimation.stop();
      }
  },[isStop])

  return (
    <View style={styles.container}>
    {/* */}
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Animated.Image
    source={require('../../assets/images/logo_t.png')}
  style={{width:'60%',
    height:'25%',
    resizeMode:'contain',
    transform:[{scale}]
    }}/>


    <CustomText variant='h2'>Not Right Now</CustomText>
   
    </View>

    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.background,
  },
  image:{
    


  }
})
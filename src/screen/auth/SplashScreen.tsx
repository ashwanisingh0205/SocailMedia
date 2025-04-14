import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import CustomText from '../../components/global/CustomText';


const SplashScreen:FC = () => {

  const [isStop,setIsStop] = useState(false);
   
  const scale=new Animated.Value(1);

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


    <CustomText variant='h2'>@yes you are</CustomText>
   
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
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomView from '../../components/global/CustomAreaView'
import CustomSafeAreaView from '../../components/global/CustomAreaView'
import Lottie from 'lottie-react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '../../constants/Colors'
import CustomText from '../../components/global/CustomText'
// import { FONTS } from '../../constants/Fonts'
import SocialButtonHorizontal from '../../components/global/SocialButtonHorizontal'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native'
import { useAppDispatch } from '../../redux/reduxHook'
import { signInWithFacebook, signInWithGoogle } from '../../redux/SocialLogin'

const LoginScreen = () => {
  const dispatch=useAppDispatch();
  return (
    <CustomSafeAreaView style={styles.container}>
     <View style={styles.inner}>
      <Lottie style={styles.lottie} source={require('../../assets/animations/main.json')} autoPlay loop  speed={1.5}/>
     </View>
     <View style={{width:RFValue(260),height:RFValue(140)}}>
     <Lottie style={styles.lottie} source={require('../../assets/animations/hp.json')} autoPlay loop  speed={2.0}/>
     </View>
      <CustomText variant='h6' style={styles.ad}>
        Rewarding Every Moment for Creators  and Viewers.
      </CustomText>
      <SocialButtonHorizontal icon={<Icon name='logo-facebook' size={20} color={Colors.text}/>}
      text='Continue With Facebook'
      textColor='white'
      backgroundcolor={Colors.fbColor}
      onPress={async()=>await dispatch(signInWithFacebook())}/>
      <SocialButtonHorizontal icon={<Image source={require('../../assets/icons/google.png')} style={styles.google}/>}
      text='Continue With Google'
      textColor='black'
      backgroundcolor={Colors.text}
      onPress={async()=>await dispatch(signInWithGoogle())}/>

      <TouchableOpacity style={styles.footer}>
        <CustomText variant='h8' >
          Design and Developed by -Ashwani
        </CustomText>
      </TouchableOpacity>
      </CustomSafeAreaView>
      
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    padding:10,
  },
  inner:{
    width:RFValue(240),
    height:RFValue(240),
  },
  lottie:{
    width:'100%',
    height:'100%',
  },
  ad:{
   
    color:Colors.text,
    marginBottom:30,
    // fontSize:RFValue(20),
    
    textAlign:'center',
    fontWeight:700,
  },
  google:{
    height:20,
    width:20,
  },
  footer:{
    position:'absolute',
    bottom:10,
    opacity:0.6
  }
})
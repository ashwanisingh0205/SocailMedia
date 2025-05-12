import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Easing } from 'react-native'
import { screenWidth } from '../../utils/Scaling'
interface ReelCardProps {
    style?:ViewStyle,
}
const ReelCard:FC<ReelCardProps> = ({style}) => {

    const animatedValue=useRef(new Animated.Value(0)).current;
    useEffect(()=>{
        Animated.loop(
            Animated.timing(animatedValue,{
                toValue:1,
                duration: 1000,
                easing:Easing.linear,
                useNativeDriver:true,
            })
        ).start();
    },[])
const TransformX=animatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[-screenWidth*0.35,screenWidth*0.35]
})
    
  return (
    <View style={[styles.card,style]}>
     <Animated.View style={[styles.skeletonLoader,{transform:[{translateX:TransformX}]}]}>
        <LinearGradient
         colors={['#333', '#444', '#555', '#444', '#333']}
         start={{x: 0, y: 0.5}}
         end={{x: 1, y: 0.5}}
         style={styles.gradient}/>

     </Animated.View>
    </View>
  )
}

export default ReelCard

const styles = StyleSheet.create({
    card:{
        width:'100%',
        height:'100%',
        backgroundColor:'#222'

    },
    skeletonLoader:{
        ...StyleSheet.absoluteFillObject,
    },
    gradient:{
        width: '100%',
        height: '100%',
        
    }
})
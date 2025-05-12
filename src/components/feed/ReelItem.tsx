import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import { Colors } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import ReelCard from '../laoder/ReelCard'

interface ReelItemProps {
    item:any,
    loading:boolean,
    onpress:()=>void,
    style?:ViewStyle
}

const ReelItem:FC<ReelItemProps> = ({item,loading,onpress,style}) => {
   return (
  <View style={[styles.card,style]}>
    {loading? (<ReelCard style={styles.skeltonLoader}/>):(
        <TouchableOpacity onPress={onpress}>
            <FastImage source={{uri:item?.thumbUri,priority:FastImage.priority.high
            }}
            style={styles.img}
            resizeMode={FastImage.resizeMode.cover}
            />

        </TouchableOpacity>
    )}

  </View>
  )
}

export default ReelItem;

const styles = StyleSheet.create({
    img: {
        width: screenWidth * 0.35,
        height: screenHeight * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
      },
      card: {
        width: screenWidth * 0.35,
        height: screenHeight * 0.25,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: Colors.border,
        overflow: 'hidden',
      },
      skeltonLoader: {
        width: '100%',
        height: '100%',
      },
})
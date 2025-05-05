import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../constants/Colors';
import CustomText from '../global/CustomText';
import { launchCamera } from 'react-native-image-picker';
import {createThumbnail} from 'react-native-create-thumbnail'
import { navigate } from '../../utils/NavigationUtils';

const PickerReelSection = () => {
    const handleCamera=async()=>{
        await launchCamera({
            mediaType:'video',
            saveToPhotos:false,
            formatAsMp4:true,
            includeExtra:true,
            }).then((res)=>{
                console.log('ressssss',res);
                createThumbnail({
                    url:res.assets![0].uri || '',
                    timeStamp:100,
                }).then(response=>{
                    console.log('____',response)
                    if(res.assets![0].uri){
                        navigate('UploadReelScreen',{
                            thumb_uri:response.path,
                            file_uri:res.assets![0].uri,
                        })

                    }
                }).catch((error)=>{
                    console.log('error',error)
                })
                
            }).catch((err)=>{
                console.log('video catch error',err)
            })
    }
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.inner} onPress={handleCamera}>
            <Icon name="camera-outline" color={Colors.white} size={RFValue(20)} />
            <CustomText>Camera</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inner}>
            <Icon2 name="my-library-add" color={Colors.white} size={RFValue(20)} />
            <CustomText>Draft</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inner}>
            <Icon2 name="auto-fix-high" color={Colors.white} size={RFValue(20)} />
            <CustomText>Template</CustomText>
        </TouchableOpacity>

    </View>
  )
}

export default PickerReelSection

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:5,
        gap:5,
    },
    inner:{
        width:'32%',
        height:100,
        padding:10,
        backgroundColor:'#1c1b1b',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10

    }
})
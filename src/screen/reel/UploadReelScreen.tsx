import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { goBack } from '../../utils/NavigationUtils';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import CustomSafeAreaView from '../../components/global/CustomAreaView';
import CustomHeader from '../../components/global/CustomHeader';
import GradientButton from '../../components/global/GradientButton';
import { useUpload } from '../../components/uploadservice/UploadContext';
import FastImage from 'react-native-fast-image'

interface uriData {
  thumb_uri: string;
  file_uri: string;
}

const UploadReelScreen: React.FC = () => {
    const data = useRoute();
    const item = data?.params as uriData;
    console.log('item',item)
    const [caption, setCaption] = useState<string>('');
    const {startUpload} = useUpload();
  
    return (
      <CustomSafeAreaView>
        <CustomHeader title="Upload" />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.flexDirectionRow}>
            <Image source={{uri: item?.thumb_uri}} style={styles.img} />
    
            
            <TextInput
              style={[styles.input, styles.textArea]}
              value={caption}
              placeholderTextColor={Colors.border}
              onChangeText={setCaption}
              placeholder="Enter your caption here..."
              multiline={true}
              numberOfLines={8}
            />
          </View>
          
          <GradientButton
            text="Upload"
            iconName="upload"
            onPress={() => {
              goBack();
              startUpload(item?.thumb_uri, item?.file_uri, caption);
            }}
          />
        </ScrollView>
      </CustomSafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      paddingHorizontal: 0,
      marginTop: 30,
      alignItems: 'center',
    },
    flexDirectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    input: {
      height: 150,
      borderColor: 'gray',
      borderWidth: 1,
      color: Colors.text,
      borderRadius: 5,
      fontFamily: FONTS.Medium,
      padding: 10,
      marginVertical: 10,
      width: '68%',
    },
    img: {
      width: '25%',
      height: 150,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    textArea: {
      height: 150,
      textAlignVertical: 'top',
    },
  });
  
  export default UploadReelScreen;
  
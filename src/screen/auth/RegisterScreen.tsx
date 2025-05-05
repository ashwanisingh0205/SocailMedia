import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingViewComponent, PermissionsAndroid, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomSafeAreaView from '../../components/global/CustomAreaView';
import { Colors } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../components/global/CustomText';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useRouter } from 'react-native-actions-sheet/dist/src/hooks/use-router';
import { useRoute } from '@react-navigation/native';
import { useAppDispatch } from '../../redux/reduxHook';
import { checkUsernameAvailability, register } from '../../redux/action/userAction';
import {launchImageLibrary,launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native-gesture-handler';
import { uploadFile } from '../../redux/action/fileAction';
import GradientButton from '../../components/global/GradientButton';
import { navigate } from '../../utils/NavigationUtils';


interface initialdata{
  id_token:string,
  provider:string,
  name:string,
  email:string,
  userImage:string
   }
const RegisterScreen = () => {

  const data=useRoute();
  const dispatch=useAppDispatch();
  const item=data.params as initialdata;
  const [username, setUsername] = useState<string>('');
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [isLocalImagePickedUp, setIsLocalImagePickedUp] =
    useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [imageUri, setImageUri] = useState<string>('');
 useEffect(()=>{
  if(item){
    setFullName(item.name);
    setImageUri(item.userImage);
  }
 },[item])

 const checkUsername=async()=>{
  const data=await dispatch(checkUsernameAvailability(username));
  setUsernameAvailable(data);
 }
 useEffect(()=>{
  checkUsername()
 },[username])
 const handleImagePicker=()=>{
  Alert.alert('Select Image', 'Choose an option', [
    {
      text:'Take  Photo',
      onPress:handleLaunchCamera
      },
      {
        text:'Choose from Gallery',
        onPress:handleLaunchImageLibrary
      },
      {
        text:'Cancel',
        onPress:()=>{},
       
      }
  ])
 }

 const handleLaunchImageLibrary = async () => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
  });
  if (result.assets && result.assets.length > 0) {
    setIsLocalImagePickedUp(true);
    setImageUri(result.assets[0].uri || '');
    console.log(imageUri)
  }
};
 const handleLaunchCamera = async () => {
  if (Platform.OS === 'android') {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,

      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera({
        mediaType: 'photo',
        includeBase64: true,
      });
      if (result.assets && result.assets.length > 0) {
        setIsLocalImagePickedUp(true);
        setImageUri(result.assets[0].uri || '');
      }
    }
    return;
  }

  // IOS ONLY
  const result = await launchCamera({
    mediaType: 'photo',
    includeBase64: true,
  });
  if (result.assets && result.assets.length > 0) {
    setIsLocalImagePickedUp(true);
    setImageUri(result.assets[0].uri || '');
  }
};
// console.log(imageUri)
const handleSubmit = async () => {
  setLoading(true);
  setLoadingMessage('Creating Account...🚀');
  const trimmedUsername = username.trim().toLowerCase();
  setUsername(trimmedUsername)
  const trimmedFullName = fullName.trim();
  const trimmedBio = bio.trim();

  if (
    !trimmedUsername ||
    !trimmedFullName ||
    !trimmedBio ||
    !usernameAvailable
  ) {
    Alert.alert('Please fill valid details ','You should fill the username field without any spaces ');
    setLoading(false);
    setLoadingMessage('');
    return;
  }

  let userImage = imageUri;
  if (isLocalImagePickedUp) {
    setLoadingMessage('Uploading Image...📦🎞️');
    const uploadResult = await dispatch(uploadFile(imageUri, 'user_image'));
    if (uploadResult) {
      userImage = uploadResult;
      setLoadingMessage('Image Uploaded...✅');
    } else {
      setLoading(false);
      setLoadingMessage('');
      return;
    }
  }
  setLoadingMessage('Preparing Dashboard...✨✨');
  const registerData = {
    name: fullName,
    bio,
    userImage,
    email: item?.email,
    provider: item?.provider,
    id_token: item?.id_token,
    username,
  };
  await dispatch(register(registerData));
  setLoading(false);
};

 
  return (
    <CustomSafeAreaView>
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
     
     <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContainer}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.select({
          ios: 120,
          android: 120,
        })}>
        <View style={styles.titleContainer}>
          <LinearGradient
          colors={['rgba(0,0,0,0)',Colors.text,'rgba(0,0,0,0)']}
          style={styles.linearGradient}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}/>
            <CustomText variant="h4">
              complete your profile
            </CustomText>
            <LinearGradient
          colors={['rgba(0,0,0,0)',Colors.text,'rgba(0,0,0,0)']}
          style={styles.linearGradient}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}} />
         </View>
         <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
          <Image
          source={imageUri ? {uri:imageUri} :require('../../assets/images/placeholder.png')}
          style={styles.image}/>
          <View style={styles.cameraIcon}>
          <Icon name="camera-alt" color="white" size={RFValue(20)} />
          </View>
           </TouchableOpacity>
           <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
            <CustomText>UserName</CustomText>
            {usernameAvailable!==null &&
            (
              <CustomText style={[styles.label,{alignSelf:'flex-end'}]}>
                {usernameAvailable ? ('✅'):(<Text style={{color:'#ff0000'}}>Is Already Taken</Text>)}
              </CustomText>
            )}
           </View>
           <TextInput
           style={styles.input}
           returnKeyType='next'
           value={username}
            onChangeText={setUsername}
            placeholderTextColor={Colors.border}
            onEndEditing={async()=>{
              await checkUsername();
            }}
            placeholder='Enter Unique UserName'
           />
           <CustomText style={{alignSelf:'flex-start'}}>Full Name</CustomText>
           <TextInput
           style={styles.input}
           returnKeyType='next'
           value={fullName}
            onChangeText={setFullName}
            placeholderTextColor={Colors.border}
            placeholder='Enter Full Name'
           />
                      <CustomText style={{alignSelf:'flex-start'}}>Short Bio</CustomText>
           <TextInput
           style={[styles.input,styles.textArea]}
           returnKeyType='next'
           value={bio}
            onChangeText={setBio}
            placeholderTextColor={Colors.border}
            placeholder='Enter Your Bio'
            multiline={true}
            numberOfLines={4}
           />
            {loading ? (
          <View style={styles.flexRow}>
            <ActivityIndicator size="small" color={Colors.text} />
            <CustomText variant="h8" fontFamily={FONTS.Medium}>
              {loadingMessage || 'Loading....'}
            </CustomText>
          </View>
        ) : (
       
          <GradientButton
            text="Let's Dive in"
            iconName="swim"
            onPress={handleSubmit}
          />
         

        )}
       


        </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    </CustomSafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingBottom: 120,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  linearGradient: {
    flex: 1,
    height: 1,
  },
  cameraIcon: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 100,
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 200,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: Colors.text,
    borderRadius: 5,
    fontFamily: FONTS.Medium,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

import { Alert } from 'react-native';
import { navigate, resetAndNavigate } from '../utils/NavigationUtils';
import { setUser } from './reducer/userSlice';
import { token_storage } from './storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LOGIN } from './API';
import axios from 'axios';

import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  Settings,
} from 'react-native-fbsdk-next';

// Initialize Facebook SDK
Settings.initializeSDK();

interface RegisterData{
    id_token:string,
    provider:string,
    name:string,
    email:string,
    userImage:string
}

const handleSignInSuccess = async(res:any, dispatch:any)=>{
    token_storage.set('access_token',res.data.tokens.access_token);
    token_storage.set('refresh_token',res.data.tokens.refresh_token);
    await dispatch(setUser(res.data.user));
    resetAndNavigate('BottomTab');
};

const handleSignInError = async(error:any,data:RegisterData)=>{
    console.log('Error',error);

    if(error.response.status === 401){
        // console.log(data);
        navigate('RegisterScreen',{
           ...data,
                   });
        return;
    }
    Alert.alert('we are facing issue try again later');
};

export const signInWithGoogle = () => async (dispatch: any) => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const {idToken, user} = await GoogleSignin.signIn();
      console.log('user get by google',user)
      await axios
        .post(LOGIN, {
          provider: 'google',
          id_token: idToken,
        })
        .then(async res => {
          await handleSignInSuccess(res, dispatch);
        })
        .catch((err: any) => {
          const errorData = {
            email: user.email,
            name: user.name,
            userImage: user.photo,
            provider: 'google',
            id_token: idToken,
          };
          handleSignInError(err, errorData as RegisterData);
        });
    } catch (error) {
      console.log('GOOGLE ERROR', error);
    }
  };


  export const signInWithFacebook = () => async (dispatch: any) => {
    try {
      // First logout from any existing session
      await LoginManager.logOut();

      // Request permissions - note the array format
      const result = await LoginManager.logInWithPermissions(['email', 'public_profile']);

      if (result.isCancelled) {
        console.log('User cancelled login');
        return;
      }

      // Get access token
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Failed to get access token');
      }

      // Create graph request
      return new Promise((resolve, reject) => {
        const infoRequest = new GraphRequest(
          '/me',
          {
            parameters: {
              fields: {
                string: 'email,name,picture.type(large)',
              },
            },
          },
          async (error, result) => {
            if (error) {
              console.error('Graph API Error:', error);
              Alert.alert('Error', 'Failed to get profile information');
              reject(error);
              return;
            }

            try {
              const response = await axios.post(LOGIN, {
                provider: 'facebook',
                id_token: data.accessToken,
              });

              await handleSignInSuccess(response, dispatch);
              resolve(response);
            } catch (err) {
              const errorData = {
                email: result.email,
                name: result.name,
                userImage: result?.picture?.data?.url,
                provider: 'facebook',
                id_token: data.accessToken,
              };
              handleSignInError(err, errorData);
              reject(err);
            }
          }
        );

        new GraphRequestManager().addRequest(infoRequest).start();
      });
    } catch (error) {
      console.error('Facebook login error:', error);
      Alert.alert('Error', 'Failed to login with Facebook');
    }
  };

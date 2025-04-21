import { Alert } from "react-native";
import { navigate, resetAndNavigate } from "../utils/NavigationUtils";
import { setUser } from "./reducer/userSlice";
import { token_storage } from "./storage"
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LOGIN } from "./API";
import axios from "axios";

import{ LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager} from 'react-native-fbsdk'
import { useDispatch } from "react-redux";

interface RegisterData{
    id_token:string,
    provider:string,
    name:string,
    email:string,
    userImage:string
}

const handleSignInSuccess=async(res:any, dispatch:any)=>{
    token_storage.set('access_token',res.data.tokens.access_token);
    token_storage.set('refresh_token',res.data.tokens.refresh_token);
    await dispatch(setUser(res.data.user))
    resetAndNavigate('BottomTab')
}

const handleSignInError=async(error:any,data:RegisterData)=>{
    console.log('Error',error);
 
    if(error.response.status===401){
        console.log(data)
        navigate('RegisterScreen',{
           ...data,
                   });
        return;
    }
    Alert.alert('we are facing issue try again later')
}

export const signInWithGoogle = () => async (dispatch: any) => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const {idToken, user} = await GoogleSignin.signIn();
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
    LoginManager.logOut();
    LoginManager.logInWithPermissions(['email public_profile']).then(
      result => {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then(async (data: any) => {
             if (!data) {
    Alert.alert('Could not retrieve Facebook access token');
    return;
  }
            const infoRequest = new GraphRequest(
              '/me?fields=name,picture,email',
              null,
              async (err: any, result: any) => {
                if (err) {
                  Alert.alert('Facebook Error');
                  return;
                }
                console.log(result, err);
  
                await axios
                  .post(LOGIN, {
                    provider: 'facebook',
                    id_token: data?.accessToken,
                  })
                  .then(async res => {
                    await handleSignInSuccess(res, dispatch);
                  })
                  .catch((err: any) => {
                    const errorData = {
                      email: result.email,
                      name: result.name,
                      userImage: result?.picture?.data?.url,
                      provider: 'facebook',
                      id_token: data?.accessToken,
                    };
                    handleSignInError(err, errorData);
                  });
              },
            );
  
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      error => {
        console.log(`FB Error`, error);
      },
    );
  };
  
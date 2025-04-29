import axios, { Axios } from "axios"
import { appAxios } from "../apiConfig"
import { setUser } from "../reducer/userSlice"
import { CHECK_USERNAME, LOGIN } from "../API"
import { REGISTER } from "redux-persist"
import { token_storage } from "../storage"
import { navigate, resetAndNavigate } from "../../utils/NavigationUtils"
import { Alert } from "react-native"

interface registerData {
    id_token: string;
    provider: string;
    name: string;
    email: string;
    username: string;
    userImage: string;
    bio: string;
  }
export const refetchuser=async(dispatch:any)=>{
    try {
     const res= appAxios.get('/user/profile')
     await dispatch(setUser(res.data.user))
    } catch (error) {
        console.log('Refetch User-->',error)
        
    }

}



export const register = (data: registerData) => async (dispatch: any) => {
    try {
      const res = await axios.post(REGISTER, data);
      token_storage.set('access_token', res.data.tokens.access_token);
      token_storage.set('refresh_token', res.data.tokens.refresh_token);
      await dispatch(setUser(res.data.user));
      resetAndNavigate('SplashScreen');
    } catch (error: any) {
     
      console.log('REGISTER ERROR ->', error);
    }
  };


export const checkUsernameAvailability=
(username:string)=>async(dispatch:any)=>{
    try {
        const res=await axios.post(CHECK_USERNAME,{
            username
        })
        return res.data.available;
    } catch (error:any) {
        console.log(error)
        return null;
        
    }
}


import axios, { Axios } from "axios"
import { appAxios } from "../apiConfig"
import { setUser } from "../reducer/userSlice"
import { CHECK_USERNAME, LOGIN } from "../API"

interface RegisterData{
    name: string,
      bio:string,
      userImage:string,
      email: string,
      provider:string,
      id_token:string,
      username:string,
}
export const refetchuser=async(dispatch:any)=>{
    try {
     const res= appAxios.get('/user/profile')
     await dispatch(setUser(res.data.user))
    } catch (error) {
        console.log('Refetch User-->',error)
        
    }

}
export const register=(Data:RegisterData)=>async(dispatch:any)=>{
    const res=await axios.post(REGISTER,Data)
    console.log(res.data)

}

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


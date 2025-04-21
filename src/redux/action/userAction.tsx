import { appAxios } from "../apiConfig"
import { setUser } from "../reducer/userSlice"

export const refetchuser=async(dispatch:any)=>{
    try {
     const res= appAxios.get('/user/profile')
     await dispatch(setUser(res.data.user))
    } catch (error) {
        console.log('Refetch User-->',error)
        
    }

}
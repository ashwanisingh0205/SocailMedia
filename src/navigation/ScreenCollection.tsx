
import SplashScreen from "../screen/auth/SplashScreen";
import LoginScreen from "../screen/auth/LoginScreen";
import RegisterScreen from "../screen/auth/RegisterScreen";
import HomeScreen from "../screen/dashboard/HomeScreen";
import BottomTab from "./BottomTab";
import PickReelScreen from "../screen/reel/PickReelScreen";


export const authStack = [
    {
      name: 'LoginScreen',
      component: LoginScreen,
    },
    {
      name: 'RegisterScreen',
      component: RegisterScreen,
    },
    {
      name: 'SplashScreen',
      component: SplashScreen,
    },
  ];
  
  export const dashboardStack = [
    {
      name: 'BottomTab',
      component: BottomTab,
    },
    {
      name: 'PickReelScreen',
      component: PickReelScreen,
    },
    
  ];
  
  export const mergedStacks = [...dashboardStack, ...authStack];
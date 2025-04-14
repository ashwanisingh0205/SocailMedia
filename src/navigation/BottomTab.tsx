import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FC } from 'react';
import HomeScreen from '../screen/dashboard/HomeScreen';
import ProfileScreen from '../screen/dashboard/ProfileScreen';
import { Platform, TouchableOpacity } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import { Colors } from '../constants/Colors';
import { HomeTabIcon, ProfileTabIcon } from './TabIcon';
import { Image } from 'react-native';
import bottomBarStyles from '../styles/NavigationBarStyles';
import { navigate } from '../utils/NavigationUtils';
import PickReelScreen from '../screen/reel/PickReelScreen';

const Tab = createBottomTabNavigator();

const BottomTab:FC = ()=>{
    return(
        <Tab.Navigator
        screenOptions={({route})=>({
            headerShown:false,
            tabBarHideOnKeyboard:true,
            tabBarStyle:{
                paddingTop:Platform.OS === 'ios' ? RFValue(5) : 0,
                paddingBottom:Platform.OS === 'ios' ? 20 : 10,
                backgroundColor:'transparent',
                height:Platform.OS === 'android' ? 70 : 80,
                borderTopWidth:0,
                position:'absolute',
               },
            //    tabBarActiveTintColor:Colors.theme,
               tabBarActiveTintColor:'yellow',
               tabBarInactiveTintColor:'#447777',
               headerShadowVisible:false,
               tabBarShowLabel:false,
               // eslint-disable-next-line react/no-unstable-nested-components
               tabBarIcon:({focused})=>{
                if(route.name === 'Home'){
                    return (
                        <HomeTabIcon name="Home" focused={focused}/>
                    );
                }
                if(route.name === 'Profile'){
                    return (
                        <ProfileTabIcon name="Profile" focused={focused}/>
                    );
                }

               },

        })}
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Post" component={ProfileScreen}
            options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon:()=>{
                return(
                    <TouchableOpacity onPress={()=>navigate('PickReelScreen')} activeOpacity={0.5} style={bottomBarStyles.custombutton}>
                        <Image source={require('../assets/icons/add.png')}
                        style={bottomBarStyles.tabIcon}/>
                    </TouchableOpacity>
                );
            }}
        }
            listeners={{
                tabPress:e=>{
                    e.preventDefault();
                },
            }}

            />
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
};
export default BottomTab;

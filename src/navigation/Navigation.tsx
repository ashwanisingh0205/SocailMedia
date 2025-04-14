import React from "react";
import {NavigationContainer} from '@react-navigation/native'
// import MainNavigator from "./mainNavigator";
import MainNavigator from "./MainNavigator";
import { navigationRef } from "../utils/NavigationUtils";

const Navigation: React.FC = () => {
    return (
      <NavigationContainer ref={navigationRef}  >
        <MainNavigator />
      </NavigationContainer>
    );
  };
  
  export default Navigation;
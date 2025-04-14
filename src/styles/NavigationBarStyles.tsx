import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../constants/Colors";
import { normalizeWidth, screenHeight } from "../utils/Scaling";

export const bottomBarStyles=StyleSheet.create({
    tabIcon:{
        width:RFValue(25),
        height:RFValue(25), 
    },
    custombutton:{
        shadowColor:'white',
        // opacity:0.9,
        backgroundColor:Colors.card,
         borderRadius:60,
         padding:normalizeWidth(8),
         opacity:5,
         shadowOffset:{width:1,height:1},
         shadowOpacity:0.4,
         bottom:screenHeight*0.004




    }

})
export default bottomBarStyles;
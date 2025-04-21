import { FC, ReactNode } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { View, ViewStyle } from "react-native";
import { Colors } from "../../constants/Colors";


interface CustomAreaViewProps{
    children:ReactNode;
    style?:ViewStyle;
}

const CustomSafeAreaView:FC<CustomAreaViewProps>=({children,style})=>{
    return(
       <SafeAreaView style={[styles.container,style]}>
        <View style={[styles.container,style]} >
        {children}
        </View>
        
       </SafeAreaView >
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:Colors.background,
    }
})

export default CustomSafeAreaView;
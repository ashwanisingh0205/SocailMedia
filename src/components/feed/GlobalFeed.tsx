import { StyleSheet, Text, View ,SafeAreaView, ImageBackground, FlatList, Animated} from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalBg from '../../assets/images/globebg.jpg';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import { useAppDispatch } from '../../redux/reduxHook';
import { fetchFeedReel } from '../../redux/action/reelAction';
import ReelItem from './ReelItem';

const GlobalFeed = () => {
  const dispatch=useAppDispatch()
  const [data,setData]=useState([])
  const[loading,setLoading]=useState(true)
  
  const fetchReel=async()=>{
    setLoading(true)
    const data=await dispatch(fetchFeedReel(0,16));
    setData(data)
    setLoading(false)
  }
  useEffect(()=>{
    fetchReel()
  }, [])

  const renderItem=({item,index}:{item:any,index:number})=>{
    const verticalShift=index%2==0?-20:20
      return(
        <Animated.View style={{transform:[{translateY:verticalShift}]}}>
        <ReelItem item={item} loading={loading} onpress={async()=>{}}/>

        </Animated.View>
      )
  }
  return (
   <ImageBackground source={GlobalBg}

   style={{flex:1,zIndex:1}}
   imageStyle={{resizeMode:'cover'}}>
    <Animated.View style={styles.container}>
    <View style={styles.gridcontainer}>
      {loading ? 
      (
      <FlatList
      data={Array.from({length:16})}
      keyExtractor={(item,index)=>index.toString()}
      renderItem={renderItem}
      numColumns={4}
      pinchGestureEnabled
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatlist}
      />
    )
      :
      (
        <FlatList
        data={data}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={renderItem}
        numColumns={4}
        pinchGestureEnabled
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        />
      )}

       
    </View>
    </Animated.View>
   </ImageBackground>
  )
}

export default GlobalFeed

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
  },
  gridcontainer:{
    width:screenWidth*5,
    height:screenHeight*2.9,
    justifyContent:'center',
    alignItems:'center',
  },
  flatlist:{
    paddingVertical:20,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'flex-start'
  },
   
})
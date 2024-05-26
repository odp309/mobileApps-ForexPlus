// import { StyleSheet, Text, View } from 'react-native'
// import React, { useCallback, useEffect } from 'react'
// import * as Font from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// const Splash = () => {
//     const [fontLoaded, setFontLoaded] = useState(false);

//     useEffect(() => {
//       async function prepare() {
//         try { 
//           await SplashScreen.preventAutoHideAsync(); 
//           await Font.loadAsync({
//             "poppins-regular": require("./../../assets/fonts/Poppins-Regular.ttf"),
//             "poppins-semibold": require("./../../assets/fonts/Poppins-SemiBold.ttf"),
//             "poppins-medium": require("./../../assets/fonts/Poppins-Medium.ttf"),
//           }); 
//           await new Promise((resolve) => setTimeout(resolve, 2000));
//         } catch (e) {
//           console.warn(e);
//         } finally { 
//           setFontLoaded(true);
//         }
//       } 
//       prepare();
//     }, []);
//     const onLayoutRootView = useCallback(async () => {
  
//       if (fontLoaded) { 
//         await SplashScreen.hideAsync();
//       }
//     }, [fontLoaded]);
  
//     if (!fontLoaded) {
//       return null;
//     }
//   return (
//     <View style={styles.container} onLayout={onLayoutRootView}>
//       <Text>SplashScreen</Text>
//     </View>
//   )
// }

// export default Splash

// const styles = StyleSheet.create({
//     container : {
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center'
//     }
// })
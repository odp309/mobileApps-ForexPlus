import * as Font from "expo-font";

const prepare = async () => {
  try {
    await Font.loadAsync({
      "poppins-regular": require("../../assets/fonts/Poppins-Regular.ttf"),
      "poppins-semibold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      "poppins-medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    }); 
  } catch (e) {
    console.warn(e); 
  }
};
const loadFont = async(setFontLoaded) =>{
    await prepare();
    setFontLoaded(true)
  } 


export { prepare,loadFont};

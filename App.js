import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StyledButton from './src/components/shared/StyledButton';

export default function App() {
  return (
    <View style={styles.container}>
      <StyledButton mode="primary" title="Primary" onPress={() => console.log("Test")}/> 
      <StyledButton mode="secondary" title="Secondary" onPress={() => console.log("Test")}/> 
      <StyledButton mode="primary-outlined" title="Primary Outlined" onPress={() => console.log("Test")}/> 
      <StyledButton mode="secondary-outlined" title="Secondary Outlined" onPress={() => console.log("Test")}/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

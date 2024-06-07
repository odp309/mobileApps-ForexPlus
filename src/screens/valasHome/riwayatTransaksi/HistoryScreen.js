import { Dimensions, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React from 'react'
import ContentHeader from '../../../components/valasHome/shared/ContentHeader'
import { useNavigation } from '@react-navigation/native'
import {
    BodyXLTextBold,
    BodySmallText,
} from "../../../components/shared/StyledText";
import { Icon } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';


const DIMENSION_HEIGHT = Dimensions.get("screen").height;

const HistoryScreen = () => {
    const navigation = useNavigation();

    const data = [
        { id: '1', type: 'Tarik', status: '(terjadwal)', date: '26 Mei 2024', amount: '- AUD 1', color: 'orange', icon: require("../../../../assets/icon-histori-tarik.png")},
        { id: '3', type: 'Tarik', status: '(dibatalkan)', date: '26 Mei 2024', amount: '+ AUD 1', color: 'red', icon: require ("../../../../assets/icon-histori-tarik.png") },
        { id: '2', type: 'Tarik', status: '(selesai)', date: '26 Mei 2024', amount: '- AUD 1', color: 'green', icon: require ("../../../../assets/icon-histori-tarik.png") },
        { id: '4', type: 'Jual', date: '26 Mei 2024', amount: '- AUD 1', color: 'orange', icon: require ('../../../../assets/icon-histori-jual.png')},
        { id: '5', type: 'Beli', date: '20 Mei 2024', amount: '+ AUD 1', color: 'purple', icon: require ('../../../../assets/icon-histori-beli.png') },
        { id: '6', type: 'Transfer', date: '14 Mei 2024', amount: '- AUD 1', color: 'blue', icon: require ('../../../../assets/icon-histori-transfer.png') },
        { id: '7', type: 'Beli', date: '20 April 2024', amount: '+ AUD 1', color: 'purple', icon: require ('../../../../assets/icon-histori-beli.png') },
    ];
        const renderItem = ({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('DetailRiwayat', { item })}>
              <View style={styles.iconContainer}>
                <Image source={item.icon} style={styles.icon} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemType}>{item.type} <Text style={{ color: item.color }}>{item.status}</Text></Text>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
              <Text style={[styles.itemAmount, { color: item.amount.startsWith('+') ? 'green' : 'red' }]}>{item.amount}</Text>
            </TouchableOpacity>
          );

return (
    
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <ContentHeader title={"Riwayat"}/>
        </View>

        <View style={styles.middleContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => <Text style={styles.sectionHeader}>Mei 2024</Text>}
          ListFooterComponent={() => <Text style={styles.sectionHeader}>April 2024</Text>}
        />
      </View>
    </View>
  );
};

export default HistoryScreen

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("screen").height,
        justifyContent: "flex-start",
        backgroundColor: "white"
    },
    topContainer: {
        width: "100%", 
        marginTop: "10%",
        marginBottom: "10%",
        paddingHorizontal: 20
    },
    middleContainer: {
        width: "100%",
        paddingHorizontal: 17
    
      },
      sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      icon: {
        width: 50,
        height: 50,
        marginRight: 20 
      },
      itemAmount: {
        marginRight: "80%"
      },

      
});
import { StyleSheet, Text, View, Image} from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import ContentHeader from '../../../components/valasHome/shared/ContentHeader';
import {
    BodySmallText,
    BodyMediumText,
    BodyMediumTextSemiBold,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import { color } from 'react-native-reanimated';
import DetailHistoryHeader from '../../../components/valasHome/valasHistory/DetailHistoryHeader';


const DetailHistoryScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params || {};

    const [transactionDetails, setTransactionDetails] = useState({

        nominalPembelian: '+ AUD 1',
    
        nominalPembayaran: 'Rp 10.716',
    
        kursBeli: 'AUD 1 = Rp 10.761',
    
        tanggalTransaksi: '20 Mei 2024 - 10:13',
    
        idTransaksi: '202405202221JKL109045',
    
        catatan: 'Kurban',
    
      });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title={"Beli Valas"} />
      </View>
      <View style={styles.middleContainer}>
      <View style={styles.iconContainer}>
          <Image source={require("../../../../assets/icon-histori-beli.png")} 
          style={styles.icon}/>
          <Text style={styles.typeText}>Beli</Text>
      </View>

      <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>Nominal Pembelian</Text>
          
          <Text style={styles.textCurrency}>{transactionDetails.nominalPembelian}</Text>
        </View>
        
        <View style={styles.horizontalLine} />
        <View style={styles.nominalPembayaranContainer}>
            <BodyMediumText
            style={{color: colors.color.grey}}>Nominal Pembayaran </BodyMediumText>
            <BodyMediumTextSemiBold
            style={styles.textStyle}>
                Rp 10.716
            </BodyMediumTextSemiBold>
        </View>

        <View style={styles.kursBeliContainer}>   
            <BodyMediumText
            style={{color: colors.color.grey}} > Kurs Beli </BodyMediumText>
            <BodyMediumTextSemiBold style={styles.textStyle}>
               AUD 1 = Rp 10.716
            </BodyMediumTextSemiBold>
        </View>

        <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Tanggal Transaksi</Text>
            <Text style={styles.detailValue}>{transactionDetails.tanggalTransaksi}</Text>
        </View>

        <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>ID Transaksi</Text>
            <Text style={styles.detailValue}>{transactionDetails.idTransaksi}</Text>
        </View>

        <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Catatan</Text>
            <Text style={styles.detailValue}>{transactionDetails.catatan}</Text>
        </View>

    </View> 
</View>
);
};

export default DetailHistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    middleContainer: {
        flex: 1,
        padding: 16,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 8,
    },
    typeText: {
        fontSize: 18,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,      
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailValue: {
        fontSize: 16,
        marginLeft: "30%",
        
    },
    textCurrency: {
        color: 'green'
    },
    textStyle: {
        color: 'black'
    },
    
})

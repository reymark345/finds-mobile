import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView
} from 'react-native';

import { HeaderBar, TevLabel, TextButton, TransactionHistory } from "../../components"
import { COLORS, SIZES, FONTS } from '../../constants';

const Transaction = ({ route }) => {
    const [selectedTev, setSelectedTev] = React.useState(null)

    React.useEffect(() => {
        const { tev } = route.params
        setSelectedTev(tev)
    })

    function renderData() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
                }}
            >
                <TevLabel
                    icon={selectedTev?.image}
                    tev={selectedTev?.tev}
                />
                <View
                    style={{
                        marginTop: SIZES.padding,
                        marginBottom: SIZES.padding * 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{ ...FONTS.h2, color: `#666` }}>₱{selectedTev?.wallet.value}</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>Yr. 2022</Text>
                </View>
                <TextButton
                    height={45}
                    label="More Details"
                    onPress={() => console.log("Trade")}

                />
            </View>


        )
    }

    function renderTransactionHistory() {
        return (
            <TransactionHistory
                customContainerStyle={{
                    ...styles.shadow
                }}
                history={selectedTev?.transactionHistory}

            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderBar
                right={false}

            />
            <ScrollView>
                <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
                    {renderData()}
                    {renderTransactionHistory()}

                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default Transaction;
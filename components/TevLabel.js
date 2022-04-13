import React from "react";
import {
    View,
    Image,
    Text
}from 'react-native';

import { COLORS,SIZES,FONTS } from "../constants"

const TevLabel = ({icon, tev, code}) =>{
    return(
        <View style={{flexDirection:'row'}}>
            <Image
                source={icon}
                resizeMode="cover"
                style={{
                    width:25,
                    height:25,
                    marginTop:5
                }}
            />
            <View style ={{marginLeft:SIZES.base}}>
                <Text style={{...FONTS.h4, color:`#666`}}>{tev}</Text>
                <Text style={{color:COLORS.gray,...FONTS.body4}}>{code}</Text>
            </View>



        </View>
    )
}
export default TevLabel;
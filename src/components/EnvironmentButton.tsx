import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { RectButton, RectButtonProps} from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'


interface EnvironmentButtonProps extends RectButtonProps {
    title: String
    active?: Boolean
}


export function EnvironmentButton( {
    title,
    active = false,
    ...rest
} : EnvironmentButtonProps){
    return(
        <RectButton
        style={[ 
            styles.container,
            active && styles.containerActive
        ]}
        {...rest}
        >
            <Text style={[
                styles.text,
                active && styles.textActive
            ]}
            > { title }</Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 40,
        width: 76, 
        backgroundColor: colors.shape,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5

    },
    containerActive: {
        backgroundColor: colors.green_light
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text
    },
    textActive: {
        fontFamily: fonts.heading,
        color: colors.green_dark,
    }
})
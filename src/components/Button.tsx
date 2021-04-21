import React from 'react'
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends TouchableOpacityProps{
    title: string
}

export function Button({ title, ...rest }: ButtonProps){
    return (
        <TouchableOpacity style={ styles.container } activeOpacity={0.7}>
                <Text 
                    style = { styles.text}
                    {...rest}
                >
                    { title }
                </Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.heading,
    }
})
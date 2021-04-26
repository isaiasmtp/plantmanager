import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import { Header } from '../components/Header'
import { useNavigation } from '@react-navigation/core'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { EnvironmentButton } from '../components/EnvironmentButton'
import api from '../services/api'

interface EnvironmentProps {
    key: string
    title: string
}

export function PlantSelect() {
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([])

    useEffect(() => {
        async function fetchEnvironment() {
            const { data } = await api.get('plants_environments')
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ])
        }

        fetchEnvironment()
    }, [])

    return(
    <View style={styles.container}>
        <View style={styles.header}>
            <Header/>
            <Text style={styles.title}>
                Em qual ambiante
            </Text>
            <Text style={styles.subtitle}>
                Você quer colocar sua planta?
            </Text>
        </View>

        <View>
            <FlatList 
                data = { environments } 
                renderItem={({ item }) => (
                    <EnvironmentButton title={item.title}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={ styles.environmentList}
            />
        </View>

    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30
    }, 
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop:15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    environmentList: {
            height: 40,
            justifyContent: 'center',
            paddingBottom: 5,
            marginLeft: 32,
            marginVertical: 32
    }
})
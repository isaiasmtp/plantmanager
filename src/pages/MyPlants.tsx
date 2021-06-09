import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native'

import { Header } from '../components/Header'

import colors from '../styles/colors'
import waterdrop from '../assets/waterdrop.png'
import { FlatList } from 'react-native-gesture-handler'
import { loadPlant, PlantProps } from '../libs/storage'
import { formatDistance } from 'date-fns/esm'
import { pt } from 'date-fns/locale'
import fonts from '../styles/fonts'
import { PlantCardSecundary } from '../components/PlantCardSecundary'

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWaterd, setNextWaterd] = useState<string>()

    useEffect(() => {
        async function loadStoragedData() {
            const plantsStoraged = await loadPlant()

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(), 
                new Date().getTime(), 
                { locale: pt}
            )

            setNextWaterd(
                `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
            )

            setMyPlants(plantsStoraged)
            setLoading(false)
        }
        loadStoragedData()
    },[])

    return (
        <View style={ styles.container }>
            <Header />
            
            <View style={ styles.spotlight }>
                <Image 
                    source={waterdrop} 
                    style={ styles.spotlightImage }
                />

                <Text style={ styles.spotlightText }>{nextWaterd}</Text>
            </View>

            <View style={ styles.plants }>
                <Text style={ styles.plantsTitle }>
                    Proximas regadas
                </Text>

                <FlatList  
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator = {false}
                    renderItem={({ item }) => (
                        <PlantCardSecundary data={item} />
                    )}
                    contentContainerStyle={{ flex: 0 }}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%'
        
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})
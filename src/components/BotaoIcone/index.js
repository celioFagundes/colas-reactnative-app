import React from 'react'
import { Container } from './style'
import { MaterialIcons } from '@expo/vector-icons'

const BotaoIcone = ({onPress, name, color}) => {
    return (
        <Container onPress = {onPress}> 
            <MaterialIcons name ={name}  size={22} color={color}/>
        </Container>
    )
}

export default BotaoIcone

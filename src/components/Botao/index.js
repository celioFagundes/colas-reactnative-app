import React from 'react'
import { Button, ButtonTitle } from './style'
const Botao = ({title, ativado, funcao}) => {
    return (
        <Button onPress = {funcao }ativado = {ativado}>
            <ButtonTitle>{title}</ButtonTitle>
        </Button>
    )
}

export default Botao

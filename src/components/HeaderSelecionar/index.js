import React from 'react'
import { Fontisto, MaterialIcons } from '@expo/vector-icons'
import {
    Tab,
    Header,
    IconeSelecao,
    LabelCompartilhar,
  } from './style'
const HeaderSelecionar = ({selecionarTodas,lista, tamanhoSelecionadas, tamanhoLista ,disabled, sairSelecao, modalToggle}) => {
  return (
    <Header>
      <IconeSelecao onPress={selecionarTodas}>
        <Tab>{tamanhoSelecionadas}</Tab>
        {lista && tamanhoSelecionadas === tamanhoLista ? (
          <MaterialIcons name='check-circle' size={18} color='#000' />
        ) : (
          <MaterialIcons name='radio-button-unchecked' size={18} color='#000' />
        )}
        <Tab>Todas</Tab>
      </IconeSelecao>
      <IconeSelecao onPress={() => modalToggle(true)} disabled={disabled}>
        <Fontisto
          name='share-a'
          size={16}
          color={disabled ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.6)'}
        />
        <LabelCompartilhar disabled={disabled}>Compartilhar</LabelCompartilhar>
      </IconeSelecao>
      <IconeSelecao onPress={sairSelecao}>
        <Fontisto name='close' size={18} color='black' />
      </IconeSelecao>
    </Header>
  )
}

export default HeaderSelecionar

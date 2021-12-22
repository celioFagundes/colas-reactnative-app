import React from 'react'
import { Modal } from 'react-native'
import { ModalContainer, ModalBox, Mensagem, BoxBotoes, BotaoLabel } from './style'
import Botao from '../Botao'
const ModalExcluirELogout = ({ visible, message, closeFunction, confirmFunction }) => {
  return (
    <Modal visible={visible} transparent={true} animationType='fade'>
      <ModalContainer>
        <ModalBox>
          <Mensagem>{message}</Mensagem>
          <BoxBotoes>
            <Botao title ='Sim' funcao={confirmFunction} ativado/>
            <Botao title ='Não' funcao={closeFunction} ativado/>
          </BoxBotoes>
        </ModalBox>
      </ModalContainer>
    </Modal>
  )
}

export default ModalExcluirELogout

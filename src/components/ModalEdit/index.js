import React from 'react'
import { Modal } from 'react-native'
import { ModalContainer, ModalBox ,BoxBotoes, Tab, Input} from './style'
import Botao from '../Botao'

const ModalEdit = ({ visible,  editFunction, closeFunction, onChangePerg,onChangeRes, valuePerg,valueRes }) => {
  return (
    <Modal visible={visible} transparent={true} animationType='fade'>
      <ModalContainer>
        <ModalBox>
        <Tab>Pergunta</Tab>
          <Input onChangeText={onChangePerg} value={valuePerg} multiline={true} />
          <Tab>Resposta</Tab>
          <Input onChangeText={onChangeRes} value={valueRes} multiline={true} />
          <BoxBotoes>
            <Botao title='Sim' funcao={editFunction} ativado/>
            <Botao title='Nao' funcao={closeFunction} ativado/>
          </BoxBotoes>
        </ModalBox>
      </ModalContainer>
    </Modal>
  )
}

export default ModalEdit

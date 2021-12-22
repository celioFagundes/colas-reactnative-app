import React from 'react'
import { Modal } from 'react-native'
import { Select, Option } from './style'
import ModalPicker from '../../screens/CriarItems/ModalPicker'
import { Entypo } from '@expo/vector-icons'

const ModalSelect = ({
  toggleModal,
  selecionado,
  visible,
  setSelecionado,
  lista,
  reset,
  resetSecao,
  isSecao,
}) => {
  return (
    <>
      <Select onPress={() => toggleModal(true)}>
        <Option color={selecionado !== 'Tópico'  && selecionado !== 'Seção' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.3)'}>
          {selecionado}
        </Option>
        <Entypo name='select-arrows' size={16} color='rgba(0,0,0,0.3)' />
      </Select>
      <Modal transparent={true} animationType='fade' visible={visible}>
        <ModalPicker
          toggleModal={toggleModal}
          setSelecionado={setSelecionado}
          lista={lista}
          reset={reset}
          resetSecao={resetSecao}
          isSecao={isSecao}
        />
      </Modal>
    </>
  )
}

export default ModalSelect

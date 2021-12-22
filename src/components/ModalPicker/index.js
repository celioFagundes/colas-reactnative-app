import React from 'react'
import { ScrollView } from 'react-native'
import { ModalBox, ModalContainer, ModalItem, ItemText } from './style'

const ModalPicker = ({ toggleModal, setSelecionado, lista, isSecao, resetSecao, reset }) => {
  const onPressItem = option => {
    toggleModal(false)
    setSelecionado(option)
    if (!isSecao && reset) {
      resetSecao()
    }
  }

  return (
    <ModalContainer onPress={() => toggleModal(false)}>
      <ModalBox>
        <ScrollView>
          {lista !== null && lista !== undefined ? (
            Object.values(lista).map((item, index) => (
              <ModalItem
                key={index}
                onPress={() => onPressItem(isSecao ? item.secao : item.topico)}
              >
                <ItemText>{isSecao ? item.secao : item.topico}</ItemText>
              </ModalItem>
            ))
          ) : (
            <ItemText>Nenhum item criado</ItemText>
          )}
        </ScrollView>
      </ModalBox>
    </ModalContainer>
  )
}
export default ModalPicker

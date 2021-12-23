import React from 'react'
import { Modal } from 'react-native'
import BotaoIcone from '../BotaoIcone'
import Botao from '../Botao'
import {
  IconeSelecao,
  MensagemCompartilhar,
  Codigo,
  ModalBox,
  ModalContainer,
  BoxBotoes,
  Container,
} from './style'

const ModalShare = ({
  visible,
  terminou,
  tamanho,
  shareFunction,
  closeFunction,
  codigo,
  finishFunction,
  copy,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType='fade'>
      <ModalContainer>
        <ModalBox>
          {!terminou ? (
            <Container>
              <MensagemCompartilhar>
                Compartilhar {tamanho}
                {tamanho > 1 ? ' perguntas' : ' pergunta'} ?
              </MensagemCompartilhar>
              <BoxBotoes>
                <Botao title='Sim' funcao={shareFunction} ativado />
                <Botao title='Não' funcao={closeFunction} ativado />
              </BoxBotoes>
            </Container>
          ) : (
            <Container>
              <MensagemCompartilhar>
                Use este código ao na aba de criação para copiar as perguntas
              </MensagemCompartilhar>
              <IconeSelecao>
                <Codigo>{codigo}</Codigo>
                <BotaoIcone name='content-copy' color='black' onPress={copy} />
              </IconeSelecao>
              <Botao title='Ok' funcao={finishFunction} ativado />
            </Container>
          )}
        </ModalBox>
      </ModalContainer>
    </Modal>
  )
}

export default ModalShare

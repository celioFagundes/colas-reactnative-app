import React from 'react'
import { Modal } from 'react-native'
import { ModalContainer, ModalBox, InputCodigo,Mensagem,Header } from './style'
import Botao from '../Botao'
import CriarStatus from '../../components/Status';

const ModalAddShare = ({terminou, visible,codigo, topicoSelecionado, secaoSelecionada, codigoSet, get, modalSet, status, reset}) => {
  return (
    <Modal transparent={true} animationType='fade' visible={visible}>
      <ModalContainer>
        <ModalBox>
          {!terminou && (
            <>
              <Mensagem>
                Insira um código para adicionar perguntas para o topico e seção selecionados
              </Mensagem>
              <Header>
                <Mensagem>
                  Tópico: {topicoSelecionado !== 'Tópico' ? topicoSelecionado : 'Nenhum'}
                </Mensagem>
                <Mensagem>
                  Seção: {secaoSelecionada !== 'Seção' ? secaoSelecionada : 'Nenhuma'}
                </Mensagem>
              </Header>
              <InputCodigo onChangeText={text => codigoSet(text)} placeholder='AAAA-BBBB-CCCC' />
              {status.tipo === 'codigo' && <CriarStatus status={status} />}
              <Header>
                <Botao title='Adicionar' funcao={() => get(codigo)} ativado />
                <Botao title='Cancelar' funcao={() => modalSet(false)} ativado />
              </Header>
            </>
          )}
          {terminou && (
            <>
              <Mensagem>Perguntas adicionadas com sucesso</Mensagem>
              <Botao title='Ok' funcao={reset} ativado />
            </>
          )}
        </ModalBox>
      </ModalContainer>
    </Modal>
  )
}

export default ModalAddShare

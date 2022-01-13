import React, { useState } from 'react'
import { useDatabaseRemove, useDatabaseUpdate } from '../../config/database'
import BotaoIcone from '../BotaoIcone'
import { Octicons } from '@expo/vector-icons'
import ModalExcluir from '../ModalExcluirELogout'
import ModalEdit from '../ModalEdit'

import {
  Wrapper,
  ContainerPergunta,
  TextoPergunta,
  ContainerResposta,
  Resposta,
  TextoResposta,
  Icon,
  Acoes,

} from './style'

const ContainerExpansivo = ({
  item,
  onClickFunction,
  id,
  topico,
  secao,
  onLongPress,
  selecionada,
  selecionando,
  selecionarFunction,
}) => {
  const [pergunta, setPergunta] = useState({
    pergunta: item.pergunta,
    resposta: item.resposta,
  })
  const [modalEditVisivel, setModalEditVisivel] = useState(false)
  const [modalExcluirVisivel, setModalExcluirVisivel] = useState(false)
  const [updateStatus, update] = useDatabaseUpdate()
  const remove = useDatabaseRemove()

  const onChange = field => text => {
    setPergunta({
      ...pergunta,
      [field]: text,
    })
  }
  const excluirPergunta = id => {
    remove('/perguntas/' + topico + '/' + secao + '/' + id)
    setModalExcluirVisivel(false)
  }

  const editarPergunta = id => {
    if(pergunta.pergunta !== '' &&
    pergunta.resposta !== ''){
    update('/perguntas/' + topico + '/' + secao + '/' + id, {
      pergunta: pergunta.pergunta,
      resposta: pergunta.resposta,
    })
    setModalEditVisivel(false)
  }
  }

  return (
    <Wrapper>
      <ContainerPergunta
        onPress={onClickFunction}
        expandido={item.expandido}
        onLongPress={() => onLongPress(id)}
        selecionada={selecionada}
      >
        <TextoPergunta>{item.pergunta}</TextoPergunta>
        {!selecionando ? (
          <Icon>
            {item.expandido ? (
              <Octicons name='arrow-small-up' size={24} color='#fff' />
            ) : (
              <Octicons name='arrow-small-down' size={24} color='#fff' />
            )}
          </Icon>
        ) : (
          <Icon>
            {selecionada ? (
              <BotaoIcone name='check-circle'  size={24} color='#fff' onPress={selecionarFunction} />
            ) : (
              <BotaoIcone name='radio-button-unchecked' size={24} color='#fff' onPress={selecionarFunction} />
            )}
          </Icon>
        )}
      </ContainerPergunta>
      <ContainerResposta expandido={item.expandido}>
        <Resposta>
          <TextoResposta>{item.resposta}</TextoResposta>
        </Resposta>
        {!selecionando && (
          <Acoes>
            <BotaoIcone name='edit' color='#3772ff' onPress={() => setModalEditVisivel(true)} />
            <BotaoIcone name='delete' color='#3772ff' onPress={() => setModalExcluirVisivel(true)} />
          </Acoes>
        )}
        <ModalEdit
          visible={modalEditVisivel}
          editFunction={() => editarPergunta(id)}
          closeFunction={() => setModalEditVisivel(false)}
          onChangePerg={onChange('pergunta')}
          onChangeRes={onChange('resposta')}
          valuePerg={pergunta.pergunta}
          valueRes={pergunta.resposta}
        />
        <ModalExcluir
          visible={modalExcluirVisivel}
          message={'Tem certeza que quer excluir esta pergunta?'}
          confirmFunction={() => excluirPergunta(id)}
          closeFunction={() => setModalExcluirVisivel(false)}
        />
      </ContainerResposta>
    </Wrapper>
  )
}

export default ContainerExpansivo

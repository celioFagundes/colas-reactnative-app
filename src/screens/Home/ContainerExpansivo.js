import React, { useState } from 'react';
import { useDatabaseRemove, useDatabaseUpdate } from '../../config/database';
import { Modal } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import {
  BoxPergunta,
  Pergunta,
  TextoPergunta,
  BoxResposta,
  Resposta,
  TextoResposta,
  IconArrow,
  Acoes,
  ModalContainer,
  ModalBox,
  Excluir,
  Editar,
  Input,
  BoxBotoes,
  Botao,
  Confirmar,
  Cancelar,
  ExcluirMensagem,
  Tab,
  BotaoLabel,
} from './styleListaPerguntas.js';

const ContainerExpansivo = ({ item, onClickFunction, id, topico, secao }) => {
  const [pergunta, setPergunta] = useState({
    pergunta: item.pergunta,
    resposta: item.resposta,
  });
  const [modalEditVisivel, setModalEditVisivel] = useState(false);
  const [modalExcluirVisivel, setModalExcluirVisivel] = useState(false);
  const [updateStatus, update] = useDatabaseUpdate();
  const remove = useDatabaseRemove();

  const onChange = (field) => (text) => {
    setPergunta({
      ...pergunta,
      [field]: text,
    });
  };
  const excluirPergunta = (id) => {
    remove('/perguntas/' + topico + '/' + secao + '/' + id);
    setModalExcluirVisivel(false);
  };

  const editarPergunta = (id) => {
    update('/perguntas/' + topico + '/' + secao + '/' + id, {
      pergunta: pergunta.pergunta,
      resposta: pergunta.resposta,
    });
    setModalEditVisivel(false);
  };

  return (
    <BoxPergunta>
      <Pergunta onPress={onClickFunction} expandido={item.expandido}>
        <TextoPergunta>{item.pergunta}</TextoPergunta>
        <IconArrow>
          {item.expandido ? (
            <Octicons name='arrow-small-up' size={24} color='#fff' />
          ) : (
            <Octicons name='arrow-small-down' size={28} color='#fff' />
          )}
        </IconArrow>
      </Pergunta>
      <BoxResposta expandido={item.expandido}>
        <Resposta>
          <TextoResposta>{item.resposta}</TextoResposta>
        </Resposta>
        <Acoes>
          <Editar onPress={() => setModalEditVisivel(true)}>Editar</Editar>
          <Excluir onPress={() => setModalExcluirVisivel(true)}>
            Excluir{' '}
          </Excluir>
        </Acoes>
        <Modal visible={modalEditVisivel} transparent={true}>
          <ModalContainer onPress = {() => setModalEditVisivel(false)}>
            <ModalBox>
              <Tab>Pergunta</Tab>
              <Input
                onChangeText={onChange('pergunta')}
                value={pergunta.pergunta}
                multiline={true}
              />
              <Tab>Resposta</Tab>
              <Input
                onChangeText={onChange('resposta')}
                value={pergunta.resposta}
                multiline={true}
              />
              <BoxBotoes>
                <Botao onPress={() => editarPergunta(id)}>
                  <Octicons name='check' size={18} color='black' />
                  <BotaoLabel>Editar</BotaoLabel>
                </Botao>
                <Botao onPress={() => setModalEditVisivel(false)}>
                  <Octicons name='x' size={18} color='black' />
                  <BotaoLabel>Cancelar</BotaoLabel>
                </Botao>
              </BoxBotoes>
            </ModalBox>
          </ModalContainer>
        </Modal>
        <Modal visible={modalExcluirVisivel}>
          <ExcluirMensagem>
            Tem certeza que quer excluir esta pergunta?
          </ExcluirMensagem>
          <Confirmar title='Sim' onPress={() => excluirPergunta(id)} />
          <Cancelar title='Não' onPress={() => setModalExcluirVisivel(false)} />
        </Modal>
      </BoxResposta>
    </BoxPergunta>
  );
};

export default ContainerExpansivo;

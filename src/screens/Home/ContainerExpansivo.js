import React, { useState } from 'react';
import { useDatabaseRemove, useDatabaseUpdate } from '../../config/database';
import { Modal } from 'react-native';
import { Octicons, MaterialIcons } from '@expo/vector-icons';
import {
  BoxPergunta,
  Pergunta,
  TextoPergunta,
  BoxResposta,
  Resposta,
  TextoResposta,
  Icon,
  Acoes,
  ModalContainer,
  ModalBox,
  Excluir,
  Editar,
  Input,
  BoxBotoes,
  Botao,
  ExcluirMensagem,
  Tab,
  BotaoLabel,
} from './styleListaPerguntas.js';

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
      <Pergunta
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
              <Octicons name='arrow-small-down' size={28} color='#fff' />
            )}
          </Icon>
        ) : (
          <Icon>
            {selecionada ? (
              <MaterialIcons
                name='check-circle'
                size={24}
                color='#fff'
                onPress={selecionarFunction}
              />
            ) : (
              <MaterialIcons
                name='radio-button-unchecked'
                size={24}
                color='#fff'
                onPress={selecionarFunction}
              />
            )}
          </Icon>
        )}
      </Pergunta>
      <BoxResposta expandido={item.expandido}>
        <Resposta>
          <TextoResposta>{item.resposta}</TextoResposta>
        </Resposta>
        {!selecionando && (
          <Acoes>
            <Editar onPress={() => setModalEditVisivel(true)}>
              <MaterialIcons name='edit' size={22} color='#3772ff' />
            </Editar>
            <Excluir onPress={() => setModalExcluirVisivel(true)}>
              <MaterialIcons name='delete' size={22} color='#3772ff' />
            </Excluir>
          </Acoes>
        )}

        <Modal
          visible={modalEditVisivel}
          transparent={true}
          animationType='fade'
        >
          <ModalContainer onPress={() => setModalEditVisivel(false)}>
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
                  <Octicons name='check' size={18} color='#fff' />
                  <BotaoLabel>Editar</BotaoLabel>
                </Botao>
                <Botao onPress={() => setModalEditVisivel(false)}>
                  <Octicons name='x' size={14} color='#fff' />
                  <BotaoLabel>Cancelar</BotaoLabel>
                </Botao>
              </BoxBotoes>
            </ModalBox>
          </ModalContainer>
        </Modal>
        <Modal
          visible={modalExcluirVisivel}
          transparent={true}
          animationType='fade'
        >
          <ModalContainer>
            <ModalBox>
              <ExcluirMensagem>
                Tem certeza que quer excluir esta pergunta?
              </ExcluirMensagem>
              <BoxBotoes>
                <Botao onPress={() => excluirPergunta(id)}>
                  <Octicons name='check' size={18} color='#fff' />
                  <BotaoLabel>Sim</BotaoLabel>
                </Botao>
                <Botao onPress={() => setModalExcluirVisivel(false)}>
                  <Octicons name='x' size={14} color='#fff' />
                  <BotaoLabel>Não</BotaoLabel>
                </Botao>
              </BoxBotoes>
            </ModalBox>
          </ModalContainer>
        </Modal>
      </BoxResposta>
    </BoxPergunta>
  );
};

export default ContainerExpansivo;

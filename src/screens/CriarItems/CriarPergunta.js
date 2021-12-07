import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useDatabase, useDatabasePush } from '../../config/database';
import { Entypo } from '@expo/vector-icons';
import ModalPicker from './ModalPicker';
import CriarStatus from './CriarStatus';
import {
  Container,
  Input,
  Button,
  ButtonTitle,
  Tab,
  ModalSelect,
  ModalText,
  ContainerModais,
} from './styles';
const CriarPergunta = ({ topicos, status, setStatus }) => {
  const [pergunta, setPergunta] = useState({ pergunta: '', resposta: '' });
  const [modalTopicoVisivel, setModalTopicoVisivel] = useState(false);
  const [modalSecaoVisivel, setModalSecaoVisivel] = useState(false);
  const [secaoSelecionada, setSecaoSelecionada] = useState('Seção');
  const [topicoSelecionado, setTopicoSelecionado] = useState('Tópico');

  const secoes = useDatabase('/secoes/' + topicoSelecionado);
  const [dataStatus, pushNovaData] = useDatabasePush();

  const savePergunta = () => {
    if (
      topicoSelecionado !== 'Tópico' &&
      secaoSelecionada !== 'Seção' &&
      pergunta.pergunta !== '' &&
      pergunta.resposta !== ''
    ) {
      pushNovaData(
        '/perguntas/' + topicoSelecionado + '/' + secaoSelecionada,
        pergunta
      );
      setStatus({
        tipo: 'pergunta',
        status: 'Pergunta criada!',
        code: 'sucesso',
      });
    } else {
      if (topicoSelecionado === 'Tópico' || secaoSelecionada === 'Seção') {
        setStatus({
          tipo: 'pergunta',
          status: 'Selecione um tópico e uma seção',
          code: 'erro',
        });
      } else {
        setStatus({
          tipo: 'pergunta',
          status: 'Digite valores válidos',
          code: 'erro',
        });
      }
    }
  };

  const onChange = (field) => (text) => {
    setPergunta({
      ...pergunta,
      [field]: text,
    });
  };
  
  const toggleModal = (func, bool) => func(bool)

  const resetSecao = () => {
    setSecaoSelecionada('Seção');
  };
  return (
    <Container>
      <Tab>Criar uma nova pergunta</Tab>
      <ContainerModais>
        <ModalSelect onPress={() => toggleModal(setModalTopicoVisivel, true)}>
          <ModalText
            color={
              topicoSelecionado !== 'Tópico'
                ? 'rgba(0,0,0,0.7)'
                : 'rgba(0,0,0,0.3)'
            }
          >
            {topicoSelecionado}
          </ModalText>
          <Entypo name='select-arrows' size={16} color='rgba(0,0,0,0.3)' />
        </ModalSelect>
        <Modal
          transparent={true}
          animationType='fade'
          visible={modalTopicoVisivel}
          onRequestClose={() => toggleModal(setModalTopicoVisivel, false)}
        >
          <ModalPicker
            toggleModal={setModalTopicoVisivel}
            setData={setTopicoSelecionado}
            lista={topicos}
            reset={true}
            resetSecao={resetSecao}
          />
        </Modal>
        <ModalSelect onPress={() => toggleModal(setModalSecaoVisivel, true)}>
          <ModalText
            color={
              secaoSelecionada !== 'Seção'
                ? 'rgba(0,0,0,0.7)'
                : 'rgba(0,0,0,0.3)'
            }
          >
            {secaoSelecionada}
          </ModalText>
          <Entypo name='select-arrows' size={16} color='rgba(0,0,0,0.3)' />
        </ModalSelect>
        <Modal
          transparent={true}
          animationType='fade'
          visible={modalSecaoVisivel}
          onRequestClose={() => toggleModal(setModalSecaoVisivel, false)}
        >
          <ModalPicker
            toggleModal={setModalSecaoVisivel}
            setData={setSecaoSelecionada}
            lista={secoes && Object.values(secoes)}
            isSecao={true}
          />
        </Modal>
      </ContainerModais>
      <Input
        onChangeText={onChange('pergunta')}
        value={pergunta.pergunta}
        placeholder='Escreva uma pergunta'
        multiline={true}
      />
      <Input
        onChangeText={onChange('resposta')}
        value={pergunta.resposta}
        placeholder='Escreva uma resposta'
        multiline={true}
      />
      {status.tipo === 'pergunta' && <CriarStatus status={status} />}
      <Button onPress={savePergunta}>
        <ButtonTitle>Adicionar Pergunta</ButtonTitle>
      </Button>
    </Container>
  );
};

export default CriarPergunta;

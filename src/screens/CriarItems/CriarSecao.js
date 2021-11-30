import React, { useState } from 'react';
import { useDatabase, useDatabasePush } from '../../config/database';
import { Keyboard, Modal } from 'react-native';
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
} from './styles';
const CriarSecao = ({ topicos, status, setStatus }) => {
  const [novaSecao, setNovaSecao] = useState('');
  const [selecionado, setSelecionado] = useState('Tópico');
  const [modalVisivel, setModalVisivel] = useState(false);
  const secoes = useDatabase('/secoes/' + selecionado);
  const [dataStatus, pushNovaData] = useDatabasePush();

  const toggleModal = (bool) => {
    setModalVisivel(bool);
  };
  const selecionarTopico = (option) => {
    setSelecionado(option);
  };
  const saveSecao = () => {
    let listaSecoes = [];
    secoes !== null &&
      Object.keys(secoes).map((sec) => {
        listaSecoes.push(secoes[sec].secao);
      });
    if (novaSecao !== '' && selecionado !== 'Selecione um tópico') {
      if (secoes === null || !listaSecoes.includes(novaSecao)) {
        pushNovaData('/secoes/' + selecionado, { secao: novaSecao });
        Keyboard.dismiss();
        setStatus({ tipo: 'secao', status: 'Seção criada', code: 'sucesso' });
      } else {
        setStatus({ tipo: 'secao', status: 'A seção já existe', code: 'erro' });
      }
    } else {
      selecionado === 'Selecione um tópico'
        ? setStatus({
            tipo: 'secao',
            status: 'Seleciona um tópico',
            code: 'erro',
          })
        : setStatus({
            tipo: 'secao',
            status: 'Digite um nome válido',
            code: 'erro',
          });
    }
  };
  return (
    <Container>
      <Tab>Criar uma nova seção</Tab>
      <ModalSelect onPress={() => toggleModal(true)}>
        <ModalText
          color={
            selecionado !== 'Tópico' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.3)'
          }
        >
          {selecionado}
        </ModalText>
        <Entypo name='select-arrows' size={16} color='rgba(0,0,0,0.3)' />
      </ModalSelect>
      <Modal
        transparent={true}
        animationType='fade'
        visible={modalVisivel}
        onRequestClose={() => toggleModal(false)}
      >
        <ModalPicker
          toggleModal={toggleModal}
          setData={selecionarTopico}
          lista={topicos}
        />
      </Modal>
      <Input
        onChangeText={(text) => setNovaSecao(text)}
        value={novaSecao}
        placeholder='Digite uma nova seção'
      />
      {status.tipo === 'secao' && <CriarStatus status={status} />}
      <Button onPress={saveSecao}>
        <ButtonTitle>Adicionar Seção</ButtonTitle>
      </Button>
    </Container>
  );
};

export default CriarSecao;

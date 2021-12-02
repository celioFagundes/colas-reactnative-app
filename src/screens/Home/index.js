import React, { useState, useEffect, useContext } from 'react';
import { Octicons, MaterialIcons } from '@expo/vector-icons';
import { useDatabase, useDatabaseRemove } from '../../config/database';
import ListaPerguntas from './ListaPerguntas';
import { AuthContext } from '../../config/auth';
import { FlatList } from 'react-native';
import { Modal } from 'react-native';
import {
  Wrapper,
  ScrollContainer,
  Container,
  Tab,
  Excluir,
  Button,
  ButtonTitle,
  Placeholder,
  ModalContainer,
  ModalBox,
  ExcluirMensagem,
  BoxBotoes,
  Botao,
  BotaoLabel,
} from './styles';

const Home = (props) => {
  const auth = useContext(AuthContext);

  const [topico, setTopico] = useState(null);
  const [topicoKey, setTopicoKey] = useState(null);
  const [secao, setSecao] = useState(null);
  const [secaoKey, setSecaoKey] = useState(null);
  const [modalExcluirTopico, setModalExcluirTopico] = useState(false);
  const [modalExcluirSecao, setModalExcluirSecao] = useState(false);
  
  const data = useDatabase('/topicos/');
  const dataSecoes = useDatabase('/secoes/' + topico);
  const dataPerguntas = useDatabase('/perguntas/' + topico + '/' + secao);
  const remove = useDatabaseRemove();

  const refetchSecoes = (data, itemKey) => {
    topico === data ? setTopico(null) : setTopico(data);
    setTopicoKey(itemKey);
    setSecao(null);
  };
  const refetchPerguntas = (data, itemKey) => {
    secao === data ? setSecao(null) : setSecao(data);
    setSecaoKey(itemKey);
  };

  const excluirTopico = () => {
    remove('/topicos/' + topicoKey);
    remove('/secoes/' + '/' + topico);
    remove('/perguntas/' + '/' + topico);
    setTopico(null);
    setTopicoKey(null);
    setModalExcluirTopico(false);
  };
  const excluirSecao = () => {
    remove('/secoes/' + '/' + topico + '/' + secaoKey);
    remove('/perguntas/' + '/' + topico + '/' + secao);
    setSecao(null);
    setSecaoKey(null);
    setModalExcluirSecao(false);
  };

  useEffect(() => {
    if (auth.loading && auth.user === null) {
      props.navigation.navigate('Loading');
    }
  }, [auth.user]);

  return (
    <Wrapper>
      <ScrollContainer>
        <Container>
          <Tab>Tópicos</Tab>
          {data && Object.keys(data).length > 0 ? (
            <FlatList
              data={Object.keys(data)}
              renderItem={({ item }) => (
                <Button
                  onPress={() => refetchSecoes(data[item].topico, item)}
                  key={data[item].topico}
                  selecionado={topico === data[item].topico ? true : false}
                >
                  <ButtonTitle>{data[item].topico}</ButtonTitle>
                </Button>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              style={{ marginTop: 15 }}
            />
          ) : (
            <Placeholder>Sem tópicos</Placeholder>
          )}
          {topico !== null && (
            <Excluir onPress={() => setModalExcluirTopico(true)}>
              <MaterialIcons name='delete' size={22} color='#3772ff' />
            </Excluir>
          )}
        </Container>
        <Container>
          <Tab>Secões</Tab>
          {dataSecoes && topico !== '' ? (
            <FlatList
              data={Object.keys(dataSecoes)}
              renderItem={({ item }) => (
                <Button
                  onPress={() => refetchPerguntas(dataSecoes[item].secao, item)}
                  key={dataSecoes[item].secao}
                  selecionado={secao === dataSecoes[item].secao ? true : false}
                >
                  <ButtonTitle>{dataSecoes[item].secao}</ButtonTitle>
                </Button>
              )}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 15 }}
            />
          ) : (
            <Placeholder>
              {topico === '' ? 'Selecione um tópico' : 'Sem secões'}
            </Placeholder>
          )}
          {secao !== null && (
            <Excluir onPress={() => setModalExcluirSecao(true)}>
              <MaterialIcons name='delete' size={22} color='#3772ff' />
            </Excluir>
          )}
        </Container>
        <Modal
          visible={modalExcluirTopico}
          transparent={true}
          animationType='fade'
        >
          <ModalContainer>
            <ModalBox>
              <ExcluirMensagem>
                Tem certeza que quer excluir este tópico? As seções e perguntas
                deste topico tambem serão excluidas
              </ExcluirMensagem>
              <BoxBotoes>
                <Botao onPress={excluirTopico}>
                  <Octicons name='check' size={18} color='#fff' />
                  <BotaoLabel>Sim</BotaoLabel>
                </Botao>
                <Botao onPress={() => setModalExcluirTopico(false)}>
                  <Octicons name='x' size={14} color='#fff' />
                  <BotaoLabel>Não</BotaoLabel>
                </Botao>
              </BoxBotoes>
            </ModalBox>
          </ModalContainer>
        </Modal>
        <Modal
          visible={modalExcluirSecao}
          transparent={true}
          animationType='fade'
        >
          <ModalContainer>
            <ModalBox>
              <ExcluirMensagem>
                Tem certeza que quer excluir esta seção? As perguntas desta
                seção tambem serão excluidas
              </ExcluirMensagem>
              <BoxBotoes>
                <Botao onPress={excluirSecao}>
                  <Octicons name='check' size={18} color='#fff' />
                  <BotaoLabel>Sim</BotaoLabel>
                </Botao>
                <Botao onPress={() => setModalExcluirSecao(false)}>
                  <Octicons name='x' size={14} color='#fff' />
                  <BotaoLabel>Não</BotaoLabel>
                </Botao>
              </BoxBotoes>
            </ModalBox>
          </ModalContainer>
        </Modal>

        <ListaPerguntas data={dataPerguntas} topico={topico} secao={secao} />
      </ScrollContainer>
    </Wrapper>
  );
};

export default Home;

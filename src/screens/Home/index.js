import React, { useState, useRef, useEffect, useContext } from 'react';
import { useDatabase, useDatabaseRemove } from '../../config/database';
import ListaPerguntas from './ListaPerguntas';
import { AuthContext } from '../../config/auth';
import { FlatList } from 'react-native';
import {
  Wrapper,
  ScrollContainer,
  Container,
  Tab,
  Excluir,
  Button,
  ButtonTitle,
  Placeholder,
} from './styles';

const Home = (props) => {
  const auth = useContext(AuthContext);

  const [topico, setTopico] = useState(null);
  const [topicoKey, setTopicoKey] = useState(null);
  const [secao, setSecao] = useState(null);
  const [secaoKey, setSecaoKey] = useState(null);

  const data = useDatabase('/topicos/');
  const dataSecoes = useDatabase('/secoes/' + topico);
  const dataPerguntas = useDatabase('/perguntas/' + topico + '/' + secao);
  const remove = useDatabaseRemove();

  const dataRef = useRef(null);

  const refetchSecoes = (data, itemKey) => {
    topico === data ? setTopico(null) : setTopico(data);
    setTopicoKey(itemKey);
    setSecao(null)
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
  };
  const excluirSecao = () => {
    remove('/secoes/' + '/' + topico + '/' + secaoKey);
    remove('/perguntas/' + '/' + topico + '/' + secao);
    setSecao(null);
    setSecaoKey(null);
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
              ref={dataRef}
              style={{ marginTop: 15 }}
            />
          ) : (
            <Placeholder>Sem tópicos</Placeholder>
          )}
          {topico !== null && (
            <Excluir onPress={excluirTopico}>Excluir tópico</Excluir>
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
              ref={dataRef}
              style={{ marginTop: 15 }}
            />
          ) : (
            <Placeholder>
              {topico === '' ? 'Selecione um tópico' : 'Sem secões'}
            </Placeholder>
          )}
          {secao !== null && (
            <Excluir onPress={excluirSecao}>Excluir seção</Excluir>
          )}
        </Container>
        <ListaPerguntas data={dataPerguntas} topico={topico} secao={secao} />
      </ScrollContainer>
    </Wrapper>
  );
};

export default Home;

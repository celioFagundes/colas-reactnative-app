import React, { useState, useRef } from "react";
import {
  ScrollContainer,
  Wrapper,
  Container,
  Tab,
  Button,
  ButtonTitle,
} from "../../styles/styles";
import ListaPerguntas from "./ListaPerguntas";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { useDatabase, useDatabaseRemove } from "../../config/database";
import { Excluir } from "./styles";

const App = () => {
  const [topico, setTopico] = useState(null);
  const [topicoKey, setTopicoKey] = useState(null)
  const [secao, setSecao] = useState(null);
  const [secaoKey, setSecaoKey] = useState(null);

  const data = useDatabase("/celio/topicos/");
  const dataSecoes = useDatabase("/celio/secoes/" + topico);
  const dataPerguntas = useDatabase("/celio/perguntas/" + topico + "/" + secao);
  const remove = useDatabaseRemove();
  const dataRef = useRef(null);

  const refetchSecoes = (data, itemKey) => {
    topico === data ? setTopico(null) : setTopico(data);
    setTopicoKey(itemKey)
  };
  const refetchPerguntas = (data, itemKey) => {
    secao === data ? setSecao(null) : setSecao(data);
    setSecaoKey(itemKey)
  };

  const excluirTopico = () => {
    remove("/celio/topicos/" + topicoKey);
    remove("/celio/secoes/" + '/' + topico );
    remove("/celio/perguntas/" + '/' + topico );
    setTopico(null);
    setTopicoKey(null);
  };
  const excluirSecao = () => {
    remove("/celio/secoes/" + '/' + topico + '/' + secaoKey);
    remove("/celio/perguntas/" + '/' + topico + '/' + secao);
    setSecao(null);
    setSecaoKey(null);
  };
  
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
            <Text>Sem tópicos</Text>
          )}
          {topico !== null && (
            <Excluir onPress={excluirTopico}>Excluir tópico</Excluir>
          )}
        </Container>
        <Container>
          <Tab>Secões</Tab>
          {dataSecoes && topico !== ''? (
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
            <Text>{topico === "" ? "Selecione um tópico" : "Sem secões"}</Text>
          )}
          {secao !== null && (
            <Excluir onPress={excluirSecao}>Excluir seção</Excluir>
          )}
        </Container>
      
        <ListaPerguntas data = {dataPerguntas} topico = {topico} secao = {secao}/>
      </ScrollContainer>
    </Wrapper>
  );
};

export default App;

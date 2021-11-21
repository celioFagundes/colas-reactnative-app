import React, { useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
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

import { useDatabase } from "../../config/database";

const App = () => {
  
  const [topico, setTopico] = useState("");
  const [secao, setSecao] = useState("");

  const data = useDatabase("/celio/topicos/");
  const dataSecoes = useDatabase("/celio/topicos/" + topico + "/secoes/");

  const dataPerguntas = useDatabase(
    "/celio/topicos/" + topico + "/secoes/" + secao + "/perguntas/"
  );

  const dataRef = useRef(null);
  const refetchSecoes = (data) => {
    setTopico(data);
   
  };
  const refetchPerguntas = (data) => {
    setSecao(data);
  
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
                  onPress={() => refetchSecoes(item)}
                  key={item}
                  selecionado={topico === item ? true : false}
                >
                  <ButtonTitle>{item}</ButtonTitle>
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
        </Container>
        <Container>
          <Tab>Secões</Tab>
          {dataSecoes && dataSecoes !== "Sem topicos" ? (
            <FlatList
              data={Object.keys(dataSecoes)}
              renderItem={({ item }) => (
                <Button onPress={() => refetchPerguntas(item)} key={item} selecionado={secao === item ? true : false}>
                  <ButtonTitle>{item}</ButtonTitle>
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
        </Container>
        <ListaPerguntas data={dataPerguntas} />
      </ScrollContainer>
    </Wrapper>
  );
};

export default App;

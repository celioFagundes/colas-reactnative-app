import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import {
  useDatabase,
  useDatabasePush,
  useDatabasePushPergunta,
} from "../../config/database";

const App = () => {
  const [topico, setTopico] = useState("");
  const [secao, setSecao] = useState("");
  const [novoTopico, setNovoTopico] = useState("");
  const [novaSecao, setNovaSecao] = useState("");
  const [novaPergunta, setNovaPergunta] = useState("");
  const [novaResposta, setNovaResposta] = useState("");
  const data = useDatabase("/celio/topicos/");
  const dataSecoes = useDatabase("/celio/topicos/" + topico + "/secoes/");

  const dataPerguntas = useDatabase(
    "/celio/topicos/" + topico + "/secoes/" + secao + "/perguntas/"
  );
  const [dataPush, pushNovaData] = useDatabasePush("/celio/topicos/");
  const [pergPush, pushNovaPerg] = useDatabasePushPergunta("/celio/topicos/");

  const refetchTopico = (data) => {
    setTopico(data);
    data.refetch;
    dataSecoes.refetch;
    dataPerguntas.refetch;
  };
  const refetchSecoes = (data) => {
    setSecao(data);
    dataPerguntas.refetch;
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView style={styles.scroll}>
        <View>
          <Text>
            {data.data &&
              Object.keys(data.data).map((topico) => (
                <Button title={topico} onPress={() => refetchTopico(topico)} />
              ))}
          </Text>
        </View>
        <View>
          {dataSecoes.data &&
            Object.keys(dataSecoes.data).map((sec) => (
              <View>
                <Button title={sec} onPress={() => refetchSecoes(sec)} />
              </View>
            ))}
        </View>
        <View>
          {dataPerguntas.data &&
            Object.keys(dataPerguntas.data).map((perg) => (
              <View>
                <Text>{dataPerguntas.data[perg].pergunta}</Text>
                <Text>{dataPerguntas.data[perg].resposta}</Text>
              </View>
            ))}
        </View>

        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNovoTopico(text)}
           
            value={novoTopico}
          />
          <Button
            onPress={() => pushNovaData(novoTopico, "Sem topicos")}
            title="adicionar topico"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNovaSecao(text)}
            value={novaSecao}
          />
          <Button
            onPress={() =>
              pushNovaData(topico + "/secoes/" + novaSecao, "asasd")
            }
            title="adicionar seção"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNovaPergunta(text)}
            value={novaPergunta}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNovaResposta(text)}
            value={novaResposta}
            onBlur={() => setNovaResposta("")}
          />
          <Button
            onPress={() =>
              pushNovaPerg(topico + "/secoes/" + secao + "/perguntas/", {
                pergunta: novaPergunta,
                resposta: novaResposta,
              })
            }
            title="adicionar pergunta"
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding:40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#000",
    color: "#fff",
    margin: 10,
  },
});
export default App;

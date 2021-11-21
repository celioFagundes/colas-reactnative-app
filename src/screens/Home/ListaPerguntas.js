import React, { useState, useEffect } from "react";
import { Fontisto,Octicons } from "@expo/vector-icons";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Wrapper, Tab } from "../../styles/styles";
import {
  ContainerPerguntas,
  PerguntasHeader,
  ToggleSelect,
  IconsContainer,
  Pergunta,
  BoxPergunta,
  Resposta,
  TextoPergunta,
  TextoResposta,
  IconArrow
} from "./styles";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExpandableComponent = ({ item, onClickFunction}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.expandido) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.expandido]);
  return (
    <BoxPergunta>
      <Pergunta onPress={onClickFunction} expandido = {item.expandido}>
        <TextoPergunta>{item.pergunta}</TextoPergunta>
        <IconArrow >
          {  item.expandido ? <Octicons name="arrow-small-up" size={24} color="#fff" /> :<Octicons name="arrow-small-down" size={28} color="#fff" />}
        </IconArrow>
      </Pergunta>
      <View style = {{height: layoutHeight, overflow: 'hidden',}}>
        <Resposta>
          <TextoResposta> {item.resposta}</TextoResposta>
        </Resposta>
      </View>
    </BoxPergunta>
  );
};
const ListaPerguntas = ({ data }) => {
  const [dataSource, setDataSource] = useState(data);
  const [multiSelect, setMultiSelect] = useState(false);

  useEffect(() => {
    setDataSource(data);
  }, [data]);
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const array = Object.values(dataSource);
    if (multiSelect) {
      array[index]["expandido"] = !array[index]["expandido"];
    } else {
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]["expandido"] = !array[placeindex]["expandido"])
          : (array[placeindex]["expandido"] = false)
      );
    }
    setDataSource(array);
  };

  return (
    <ContainerPerguntas>
      <PerguntasHeader>
        <Tab>Perguntas</Tab>
        <ToggleSelect onPress={() => setMultiSelect(!multiSelect)}>
          <Tab>
            {multiSelect ? (
              <Fontisto name="arrow-v" size={18} color="#3772ff" />
            ) : (
              <IconsContainer>
                <Fontisto name="arrow-v" size={18} color="#3772ff" />
                <Fontisto name="arrow-v" size={18} color="#3772ff" />
              </IconsContainer>
            )}
          </Tab>
        </ToggleSelect>
      </PerguntasHeader>
      <View>
        {dataSource &&
          Object.values(dataSource).map((item, index) => (
            <ExpandableComponent
              item={item}
              key={item.pergunta}
              onClickFunction={() => updateLayout(index)}           
            />
          ))}
      </View>
    </ContainerPerguntas>
  );
};

export default ListaPerguntas;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  item: {
    backgroundColor: "orange",
    padding: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
});

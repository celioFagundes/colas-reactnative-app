import React, { useState, useEffect } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  View,
  Text,
  Keyboard,
  Modal,
  Touchable,
  ScrollView,
} from "react-native";
import ModalPicker from "./ModalPicker";

import {
  Wrapper,
  ButtonTitle,
  ScrollContainer,
  Tab,
} from "../../styles/styles";
import {
  Container,
  Input,
  Button,
  Status,
  StatusIcon,
  StatusMessage,
  ModalSelect,
  ModalText,
  ContainerModais,
} from "./styles";
import {
  useDatabase,
  useDatabasePush,
  useDatabasePushPergunta,
} from "../../config/database";

const CriarItems = () => {
  const [selecionado, setSelecionado] = useState("Tópico");
  const [selecionadoSecao, setSelecionadoSecao] = useState("Seção");
  const [selecionadoTopicoPerg, setSelecionadoTopicoPerg] = useState("Tópico");

  const topicos = useDatabase("/celio/topicos/");
  const secoes = useDatabase(
    "/celio/topicos/" + selecionadoTopicoPerg + "/secoes/"
  );

  const [modalVisivel, setModalVisivel] = useState(false);
  const [topicoVisivel, setTopicoVisivel] = useState(false);
  const [secaoVisivel, setSecaoVisivel] = useState(false);
  const [statusTopicos, setStatusTopicos] = useState({
    status: "",
    code: "",
  });
  const [statusSecao, setStatusSecao] = useState({
    status: "",
    code: "",
  });
  const [novoTopico, setNovoTopico] = useState("");
  const [novaSecao, setNovaSecao] = useState("");
  const [novaPergunta, setNovaPergunta] = useState("");
  const [novaResposta, setNovaResposta] = useState("");
  const [dataStatus, pushNovaData] = useDatabasePush("/celio/topicos/");
  const [pergPush, pushNovaPerg] = useDatabasePushPergunta("/celio/topicos/");

  const saveTopico = () => {
    if (novoTopico !== "") {
      if (topicos === null || !Object.keys(topicos).includes(novoTopico)) {
        pushNovaData(novoTopico, "Sem Seções");
        Keyboard.dismiss();
        setStatusTopicos({ status: "Tópico criado", code: "sucesso" });
      } else {
        setStatusTopicos({ status: "O tópico já existe", code: "erro" });
      }
    } else {
      setStatusTopicos({ status: "Digite um nome válido", code: "erro" });
    }
  };
  const saveSecao = () => {
    if (novaSecao !== "" && selecionado !== "Selecione um tópico") {
      if (secoes === null || !Object.keys(secoes).includes(novaSecao)) {
        pushNovaData(selecionado + "/secoes/" + novaSecao, "Sem perguntas");
        Keyboard.dismiss();
        setStatusSecao({ status: "Seção criada", code: "sucesso" });
      } else {
        setStatusSecao({ status: "A Seção já existe", code: "erro" });
      }
    } else {
      selecionado === "Selecione um tópico"
        ? setStatusSecao({ status: "Seleciona um tópico", code: "erro" })
        : setStatusSecao({ status: "Digite um nome válido", code: "erro" });
    }
  };
  const savePergunta = () => {
    if(selecionadoTopicoPerg !== 'Tópico' && selecionadoSecao !== 'Seção' && novaPergunta !== '' && novaResposta !== '')
    pushNovaPerg(selecionadoTopicoPerg + "/secoes/" + selecionadoSecao + "/perguntas/", {
      pergunta: novaPergunta,
      resposta: novaResposta,
    })
  };
  const focusTopico = () => {
    setStatusTopicos({ status: "", code: "" });
  };
  const toggleModal = (bool) => {
    setModalVisivel(bool);
  };
  const toggleSecao = (bool) => {
    setSecaoVisivel(bool);
  };
  const toggleTopico = (bool) => {
    setTopicoVisivel(bool);
  };

  const setData = (option) => {
    setSelecionado(option);
  };
  const setDataSecao = (option) => {
    setSelecionadoSecao(option);
  };
  const setDataTopicoPerg = (option) => {
    setSelecionadoTopicoPerg(option);
  };

  return (
    <ScrollView>
      <Container>
        <Tab>Criar um novo tópico</Tab>
        <Input
          onChangeText={(text) => setNovoTopico(text)}
          value={novoTopico}
          placeholder="Digite um novo tópico"
          onFocus={focusTopico}
        />
        <Status>
          <StatusIcon>
            {statusTopicos.code !== "" &&
              (statusTopicos.code === "sucesso" ? (
                <AntDesign name="checkcircle" size={12} color="#14CC60" />
              ) : (
                <AntDesign name="closecircle" size={12} color="#FF5154" />
              ))}
          </StatusIcon>
          <StatusMessage code={statusTopicos.code}>
            {statusTopicos.status}
          </StatusMessage>
        </Status>
        <Button onPress={saveTopico}>
          <ButtonTitle>Adicionar Tópico</ButtonTitle>
        </Button>
      </Container>
      <Container>
        <Tab>Criar uma nova seção</Tab>
        <ModalSelect onPress={() => toggleModal(true)}>
          <ModalText
            color={
              selecionado !== "Tópico" ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)"
            }
          >
            {selecionado}
          </ModalText>
          <Entypo name="select-arrows" size={16} color="rgba(0,0,0,0.3)" />
        </ModalSelect>
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisivel}
          onRequestClose={() => toggleModal(false)}
        >
          <ModalPicker
            toggleModal={toggleModal}
            setData={setData}
            lista={topicos}
          />
        </Modal>
        <Input
          onChangeText={(text) => setNovaSecao(text)}
          value={novaSecao}
          placeholder="Digite uma nova seção"
        />
        <Status>
          <StatusIcon>
            {statusSecao.code !== "" &&
              (statusSecao.code === "sucesso" ? (
                <AntDesign name="checkcircle" size={12} color="#14CC60" />
              ) : (
                <AntDesign name="closecircle" size={12} color="#FF5154" />
              ))}
          </StatusIcon>
          <StatusMessage code={statusSecao.code}>
            {statusSecao.status}
          </StatusMessage>
        </Status>
        <Button onPress={saveSecao}>
          <ButtonTitle>Adicionar Seção</ButtonTitle>
        </Button>
      </Container>
      <Container>
        <Tab>Criar uma nova pergunta</Tab>
        <ContainerModais>
          <ModalSelect onPress={() => toggleTopico(true)}>
            <ModalText
              color={
                selecionadoTopicoPerg !== "Tópico"
                  ? "rgba(0,0,0,0.7)"
                  : "rgba(0,0,0,0.3)"
              }
            >
              {selecionadoTopicoPerg}
            </ModalText>
            <Entypo name="select-arrows" size={16} color="rgba(0,0,0,0.3)" />
          </ModalSelect>
          <Modal
            transparent={true}
            animationType="fade"
            visible={topicoVisivel}
            onRequestClose={() => toggleTopico(false)}
          >
            <ModalPicker
              toggleModal={toggleTopico}
              setData={setDataTopicoPerg}
              lista={topicos}
            />
          </Modal>
          <ModalSelect onPress={() => toggleSecao(true)}>
            <ModalText
              color={
                selecionadoSecao !== "Seção"
                  ? "rgba(0,0,0,0.7)"
                  : "rgba(0,0,0,0.3)"
              }
            >
              {selecionadoSecao}
            </ModalText>
            <Entypo name="select-arrows" size={16} color="rgba(0,0,0,0.3)" />
          </ModalSelect>
          <Modal
            transparent={true}
            animationType="fade"
            visible={secaoVisivel}
            onRequestClose={() => toggleSecao(false)}
          >
            <ModalPicker
              toggleModal={toggleSecao}
              setData={setDataSecao}
              lista={secoes}
            />
          </Modal>
        </ContainerModais>
        <Input
          onChangeText={(text) => setNovaPergunta(text)}
          value={novaPergunta}
          placeholder="Escreva uma pergunta"
        />
        <Input
          onChangeText={(text) => setNovaResposta(text)}
          value={novaResposta}
          placeholder="Escreva uma resposta"
        />
        <Button onPress={savePergunta}>
          <ButtonTitle>Adicionar Pergunta</ButtonTitle>
        </Button>
      </Container>
    </ScrollView>
  );
};

export default CriarItems;

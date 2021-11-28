import React, { useState, useEffect , useContext} from "react";
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
import { AuthContext } from "../../config/auth";
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

const CriarItems = (props) => {
  const auth = useContext(AuthContext)
  const [selecionado, setSelecionado] = useState("Tópico");
  const [selecionadoSecao, setSelecionadoSecao] = useState("Seção");
  const [selecionadoTopicoPerg, setSelecionadoTopicoPerg] = useState("Tópico");

  const topicos = useDatabase("/topicos/");
  const secoes = useDatabase("/secoes/" + selecionado);
  const secoesPerg = useDatabase("/secoes/" + selecionadoTopicoPerg);

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
  const [statusPerg, setStatusPerg] = useState({
    status: "",
    code: "",
  });
  const [novoTopico, setNovoTopico] = useState("");
  const [novaSecao, setNovaSecao] = useState("");
  const [novaPergunta, setNovaPergunta] = useState("");
  const [novaResposta, setNovaResposta] = useState("");
  const [dataStatus, pushNovaData] = useDatabasePush();
  

  const saveTopico = () => {
    let listaTopicos = [];
    topicos !== null && Object.keys(topicos).map((top) => {
      listaTopicos.push(topicos[top].topico);
    });
    console.log(listaTopicos);
    if (novoTopico !== "") {
      if (topicos === null || !listaTopicos.includes(novoTopico)) {
        pushNovaData("/topicos/", { topico: novoTopico });
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
    let listaSecoes = [];
     secoes !== null && Object.keys(secoes).map(sec =>{
      listaSecoes.push(secoes[sec].secao)
      console.log(secoes[sec].secao)
      
    });
    if (novaSecao !== "" && selecionado !== "Selecione um tópico") {
      if (secoes === null || !listaSecoes.includes(novaSecao)) {
        pushNovaData( "/secoes/" + selecionado, {secao: novaSecao});
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
    if (
      selecionadoTopicoPerg !== "Tópico" &&
      selecionadoSecao !== "Seção" &&
      novaPergunta !== "" &&
      novaResposta !== ""
    ) {
      pushNovaData(
        '/perguntas/' + selecionadoTopicoPerg + '/'+ selecionadoSecao,
        {
          pergunta: novaPergunta,
          resposta: novaResposta,
        }
      );
      setStatusPerg({ status: "Pergunta criada!", code: "sucesso" });
    } else {
      if (selecionadoTopicoPerg === "Tópico" || selecionadoSecao === "Seção") {
        setStatusPerg({
          status: "Selecione um tópico e uma seção",
          code: "erro",
        });
      } else {
        setStatusPerg({ status: "Digite valores válidos", code: "erro" });
      }
    }
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

  const resetSecao = () =>{
    setSelecionadoSecao('Seção')
  }

  useEffect(() => {
    if(auth.loading && auth.user === null){
        props.navigation.navigate("Loading");
    }
  }, [auth.user])
  return (
    <Wrapper>
      <ScrollContainer>
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
                reset = {true}
                resetSecao = {resetSecao}
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
                lista={secoesPerg && Object.values(secoesPerg)}
                isSecao = {true}
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
          <Status>
            <StatusIcon>
              {statusPerg.code !== "" &&
                (statusPerg.code === "sucesso" ? (
                  <AntDesign name="checkcircle" size={12} color="#14CC60" />
                ) : (
                  <AntDesign name="closecircle" size={12} color="#FF5154" />
                ))}
            </StatusIcon>
            <StatusMessage code={statusPerg.code}>
              {statusPerg.status}
            </StatusMessage>
          </Status>
          <Button onPress={savePergunta}>
            <ButtonTitle>Adicionar Pergunta</ButtonTitle>
          </Button>
        </Container>
      </ScrollContainer>
    </Wrapper>
  );
};

export default CriarItems;

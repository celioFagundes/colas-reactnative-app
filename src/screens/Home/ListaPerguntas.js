import React, { useState, useEffect } from 'react';
import * as Clipboard from 'expo-clipboard';

import { useDatabaseSharePush } from '../../config/database';
import { Fontisto, MaterialIcons, Octicons } from '@expo/vector-icons';
import ContainerExpansivo from './ContainerExpansivo';
import {
  LayoutAnimation,
  Platform,
  UIManager,
  Modal,
  Button,
  Text,
  View,
  Alert,
} from 'react-native';
import {
  ContainerPerguntas,
  Tab,
  Header,
  ToggleSelect,
  IconsContainer,
  Lista,
  IconeSelecao,
  LabelCompartilhar,
  MensagemCompartilhar,
  Codigo
} from './styleListaPerguntas';
import {
  ModalBox,
  ModalContainer,
  BoxBotoes,
  Botao,
  BotaoLabel,
} from './styles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ListaPerguntas = ({ data, topico, secao }) => {
  const [dataSource, setDataSource] = useState({});
  const [codigoShare, setCodigoShare] = useState('');
  const [shareTerminou, setShareTerminou] = useState(false);
  const [shareModalVisivel, setShareModalVisivel] = useState(false);
  const [modoSelecionando, setModoselecionando] = useState(true);
  const [multiSelect, setMultiSelect] = useState(true);
  const [compartilharDisabled, setCompartilharDisabled] = useState(false);
  const [pushData, push, genKey] = useDatabaseSharePush();
  const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);

  useEffect(() => {
    perguntasSelecionadas.length > 0
      ? setCompartilharDisabled(false)
      : setCompartilharDisabled(true);
  }, [perguntasSelecionadas]);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = dataSource;
    if (multiSelect) {
      array[index]['expandido'] = !array[index]['expandido'];
    } else {
      Object.keys(array).map((value) =>
        value === index
          ? (array[value]['expandido'] = !array[value]['expandido'])
          : (array[value]['expandido'] = false)
      );
    }
    setDataSource({ ...array });
  };
  const jaSelecionada = (id) => {
    const status = perguntasSelecionadas.some((element) => {
      if (element.id === id) {
        return true;
      } else {
        return false;
      }
    });
    return status;
  };

  const selecionar = (id) => {
    setModoselecionando(true);
    if (!jaSelecionada(id)) {
      setPerguntasSelecionadas([
        ...perguntasSelecionadas,
        {
          id: id,
          pergunta: dataSource[id].pergunta,
          resposta: dataSource[id].resposta,
        },
      ]);
    } else {
      const arraySemItem = perguntasSelecionadas.filter((item) => {
        return item.id !== id;
      });
      setPerguntasSelecionadas([...arraySemItem]);
    }
  };
  const sairDaSelecao = () => {
    setModoselecionando(false);
    setPerguntasSelecionadas([]);
  };
  const selecionarTodas = () => {
    const todasPerg = [];
    if (perguntasSelecionadas.length === Object.keys(dataSource).length) {
      setPerguntasSelecionadas([]);
    } else {
      Object.keys(dataSource).map((item) => {
        todasPerg.push({
          id: item,
          pergunta: dataSource[item].pergunta,
          resposta: dataSource[item].resposta,
        });
      });
      setPerguntasSelecionadas([...todasPerg]);
    }
  };
  const share = () => {
    let arrayKey = genKey();
    Promise.all(
      perguntasSelecionadas.map((perg) => {
        console.log('rodando');
        push(
          {
            pergunta: perg.pergunta,
            resposta: perg.resposta,
          },
          arrayKey
        );
      })
    );
    setCodigoShare(arrayKey);
    setShareTerminou(true);
  };

  const terminarShare = () => {
    setCodigoShare('');
    setShareTerminou(false);
    setShareModalVisivel(false);
  };
  const copyToClipboard = () => {
    Clipboard.setString(codigoShare);
    Alert.alert('Código', 'Código copiado para área de transferência');
  };
  return (
    <ContainerPerguntas>
      {!modoSelecionando && (
        <Header>
          <Tab>Perguntas</Tab>
          <ToggleSelect onPress={() => setMultiSelect(!multiSelect)}>
            <Tab>
              {multiSelect ? (
                <Fontisto name='arrow-v' size={18} color='#3772ff' />
              ) : (
                <IconsContainer>
                  <Fontisto name='arrow-v' size={18} color='#3772ff' />
                  <Fontisto name='arrow-v' size={18} color='#3772ff' />
                </IconsContainer>
              )}
            </Tab>
          </ToggleSelect>
        </Header>
      )}
      {modoSelecionando && (
        <Header>
          <IconeSelecao onPress={selecionarTodas}>
            <Tab>{perguntasSelecionadas.length}</Tab>
            {dataSource &&
            perguntasSelecionadas.length === Object.keys(dataSource).length ? (
              <MaterialIcons name='check-circle' size={18} color='#000' />
            ) : (
              <MaterialIcons
                name='radio-button-unchecked'
                size={18}
                color='#000'
              />
            )}
            <Tab>Todas</Tab>
          </IconeSelecao>
          <IconeSelecao
            onPress={() => setShareModalVisivel(true)}
            disabled={compartilharDisabled}
          >
            <Fontisto
              name='share-a'
              size={16}
              color={
                compartilharDisabled
                  ? 'rgba(0, 0, 0, 0.3)'
                  : 'rgba(0, 0, 0, 0.6)'
              }
            />
            <LabelCompartilhar disabled={compartilharDisabled}>
              Compartilhar
            </LabelCompartilhar>
          </IconeSelecao>
          <IconeSelecao onPress={sairDaSelecao}>
            <Fontisto name='close' size={18} color='black' />
          </IconeSelecao>
        </Header>
      )}
      <Lista>
        {dataSource &&
          Object.keys(dataSource).map((item, index) => (
            <ContainerExpansivo
              item={dataSource[item]}
              id={item}
              key={item}
              selecionando={modoSelecionando}
              selecionada={modoSelecionando && jaSelecionada(item)}
              onLongPress={selecionar}
              selecionarFunction={() => selecionar(item)}
              onClickFunction={() => updateLayout(item)}
              topico={topico}
              secao={secao}
            />
          ))}
      </Lista>
      <Modal
        visible={shareModalVisivel}
        animationType='fade'
        transparent={true}
      >
        <ModalContainer>
          <ModalBox>
            {!shareTerminou ? (
              <View>
                <MensagemCompartilhar>
                  Compartilhar {perguntasSelecionadas.length}{' '}
                  {perguntasSelecionadas.length > 1 ? 'perguntas' : ' pergunta'}{' '}
                  ?
                </MensagemCompartilhar>
                <BoxBotoes>
                  <Botao onPress={share}>
                    <Octicons name='check' size={18} color='#fff' />
                    <BotaoLabel>Sim</BotaoLabel>
                  </Botao>
                  <Botao onPress={() => setShareModalVisivel(false)}>
                    <Octicons name='x' size={14} color='#fff' />
                    <BotaoLabel>Não</BotaoLabel>
                  </Botao>
                </BoxBotoes>
              </View>
            ) : (
              <View>
                <MensagemCompartilhar>
                  Use este código ao na aba de criação para copiar as perguntas
                </MensagemCompartilhar>
                <IconeSelecao >
                  <Codigo>{codigoShare}</Codigo>
                  <MaterialIcons name='content-copy' size={18} color='black' onPress={copyToClipboard}/>
                </IconeSelecao>
                <Botao onPress={terminarShare}>
                    <BotaoLabel>Ok</BotaoLabel>
                  </Botao>
              </View>
            )}
          </ModalBox>
        </ModalContainer>
      </Modal>
    </ContainerPerguntas>
  );
};

export default ListaPerguntas;

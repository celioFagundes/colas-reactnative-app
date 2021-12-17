import React, { useState, useEffect } from 'react';
import { useDatabaseShare } from '../../config/database';
import { Fontisto } from '@expo/vector-icons';
import { Button, Pressable } from 'react-native';
import ContainerExpansivo from './ContainerExpansivo';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import {
  ContainerPerguntas,
  Tab,
  PerguntasHeader,
  ToggleSelect,
  IconsContainer,
  Lista,
} from './styleListaPerguntas';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ListaPerguntas = ({ data, topico, secao }) => {
  const [dataSource, setDataSource] = useState({});
  const [modoSelecionando, setModoselecionando] = useState(false);
  const [multiSelect, setMultiSelect] = useState(true);
  const [pushData, push, genKey] = useDatabaseShare();
  const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);

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
    if(!jaSelecionada()){
      setPerguntasSelecionadas([
        ...perguntasSelecionadas,
        {
          id: id,
          pergunta: dataSource[id].pergunta,
          resposta: dataSource[id].resposta,
        },
      ]);
    }

  }

  const removerSelecao = (id) => {};

  const share = () => {
    let arrayKey = genKey();
    if (perguntasSelecionadas.length > 0) {
      Promise.all(
        perguntasSelecionadas.map((perg) => {
          push(
            {
              pergunta: perg.pergunta,
              resposta: perg.resposta,
            },
            arrayKey
          );
          console.log('rodando');
        })
      );
      console.log('passo');
    }
  };
  return (
    <ContainerPerguntas>
      <PerguntasHeader>
        <Button title='share' onPress={share} />
        <Tab>Perguntas {JSON.stringify(perguntasSelecionadas)}</Tab>
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
      </PerguntasHeader>
      <Lista>
        <Pressable>
          {dataSource &&
            Object.keys(dataSource).map((item, index) => (
              <ContainerExpansivo
                item={dataSource[item]}
                id={item}
                key={item}
                onLongPress={selecionar}
                onClickFunction={() => updateLayout(item)}
                topico={topico}
                secao={secao}
              />
            ))}
        </Pressable>
      </Lista>
    </ContainerPerguntas>
  );
};

export default ListaPerguntas;

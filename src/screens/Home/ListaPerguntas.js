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
    setModoselecionando(true)
    if(!jaSelecionada(id)){
      setPerguntasSelecionadas([
        ...perguntasSelecionadas,
        {
          id: id,
          pergunta: dataSource[id].pergunta,
          resposta: dataSource[id].resposta,
        },
      ])
    }else{
      const arraySemItem = perguntasSelecionadas.filter(item =>{
        return item.id !== id
      })
      setPerguntasSelecionadas([...arraySemItem])
    }
  }
  const sairDaSelecao = () =>{
    setModoselecionando(false)
    setPerguntasSelecionadas([])
  }
  const selecionarTodas = () =>{
    const todasPerg = []
    if(perguntasSelecionadas.length === Object.keys(dataSource).length){
      setPerguntasSelecionadas([])
    }else{
      Object.keys(dataSource).map(item =>{
        todasPerg.push({id: item, pergunta: dataSource[item].pergunta,resposta: dataSource[item].resposta})
      })
      setPerguntasSelecionadas([...todasPerg])
    }
    
  }
  const share = () => {
    let arrayKey = genKey()
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
        <Button title='sair da selecao' onPress={sairDaSelecao} />
        <Button title='selecionar todas' onPress={selecionarTodas} />
        <Tab>Perguntas {JSON.stringify(perguntasSelecionadas)} {modoSelecionando.toString()}</Tab>
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
                selecionando = {modoSelecionando}
                selecionada = {modoSelecionando && jaSelecionada(item)}
                onLongPress={selecionar}
                onClickFunction={ !modoSelecionando ? () => updateLayout(item) : () => selecionar(item)}
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

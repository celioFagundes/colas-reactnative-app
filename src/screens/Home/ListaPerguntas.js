import React, { useState, useEffect } from 'react';
import { Fontisto } from '@expo/vector-icons';
import ContainerExpansivo from './ContainerExpansivo';
import {LayoutAnimation, Platform, UIManager } from 'react-native';
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
  const [multiSelect, setMultiSelect] = useState(true);

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

  return (
    <ContainerPerguntas>
      <PerguntasHeader>
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
      </PerguntasHeader>
      <Lista>
        {dataSource &&
          Object.keys(dataSource).map((item, index) => (
            <ContainerExpansivo
              item={dataSource[item]}
              key={index}
              id={item}
              onClickFunction={() => updateLayout(item)}
              topico={topico}
              secao={secao}
            />
          ))}
      </Lista>
    </ContainerPerguntas>
  );
};

export default ListaPerguntas;

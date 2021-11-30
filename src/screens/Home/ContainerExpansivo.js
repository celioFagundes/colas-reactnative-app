import React from 'react'
import {useDatabaseRemove} from '../../config/database'
import { Octicons } from '@expo/vector-icons';
import {
    BoxPergunta,
    Pergunta,
    TextoPergunta,
    BoxResposta,
    Resposta,
    TextoResposta,
    IconArrow,
    Excluir,
  } from './styleListaPerguntas.js';

const ContainerExpansivo = ({ item, onClickFunction, id, topico, secao}) => {
    const remove = useDatabaseRemove();
    const excluirPergunta = (id) => {
      remove(
        '/perguntas/' + topico + '/' + secao + '/'+ id
      );
    };
    return (
      <BoxPergunta>
        <Pergunta onPress={onClickFunction} expandido={item.expandido}>
          <TextoPergunta>{item.pergunta}</TextoPergunta>
          <IconArrow>
            {item.expandido ? (
              <Octicons name='arrow-small-up' size={24} color='#fff' />
            ) : (
              <Octicons name='arrow-small-down' size={28} color='#fff' />
            )}
          </IconArrow>
        </Pergunta>
        <BoxResposta expandido={item.expandido}>
          <Resposta>
            <TextoResposta>{item.resposta}</TextoResposta>
          </Resposta>
          <Excluir onPress={() => excluirPergunta(id)}>Excluir Pergunta</Excluir>
        </BoxResposta>
      </BoxPergunta>
    );
  };

export default ContainerExpansivo
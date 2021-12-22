import React, { useState } from 'react';
import { useDatabasePush } from '../../config/database';
import { Keyboard } from 'react-native';
import CriarStatus from './CriarStatus';
import Layout from '../../components/LayoutContainer'
import { Container, Input, Button, ButtonTitle, Tab } from './styles';
import Botao from '../../components/Botao'
const CriarTopico = ({ topicos, status, setStatus }) => {
  const [novoTopico, setNovoTopico] = useState('');
  const [dataStatus, pushNovaData] = useDatabasePush();

  const saveTopico = () => {
    const invalidCharacters  = [".", "#", "$", "[","]", "/",]
    let listaTopicos = [];
    topicos !== null &&
      Object.keys(topicos).map((top) => {
        listaTopicos.push(topicos[top].topico);
      });

    if (novoTopico.trim() !== '' &&  !invalidCharacters.some(el => novoTopico.includes(el))) {
      if (topicos === null || !listaTopicos.includes(novoTopico.toLocaleLowerCase())) {
        pushNovaData('/topicos/', { topico: novoTopico.toLocaleLowerCase() });
        Keyboard.dismiss();
        setStatus({ tipo: 'topico', status: 'Tópico criado', code: 'sucesso' });
      } else {
        setStatus({
          tipo: 'topico',
          status: 'O tópico já existe',
          code: 'erro',
        });
      }
    } else {
      setStatus({
        tipo: 'topico',
        status: 'Valor inválido ou possui ".", "#", "$", "[","]", "/")',
        code: 'erro',
      });
    }
  };
  return (
    <Layout title ='Criar um novo tópico'>
      <Input
        onChangeText={(text) => setNovoTopico(text)}
        value={novoTopico}
        placeholder='Digite um novo tópico'
      />
      {status.tipo === 'topico' && <CriarStatus status={status} />}
      <Botao funcao={saveTopico} title = 'Adicionar Tópico' ativado />

    </Layout>
    
  );
};

export default CriarTopico;

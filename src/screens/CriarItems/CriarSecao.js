import React, { useState } from 'react'
import { useDatabase, useDatabasePush } from '../../config/database'
import { Keyboard} from 'react-native'
import CriarStatus from '../../components/Status';
import Layout from '../../components/LayoutContainer'
import Botao from '../../components/Botao'
import ModalSelect from '../../components/ModalSelect'
import { Input} from './styles'
const CriarSecao = ({ topicos, status, setStatus }) => {
  const [novaSecao, setNovaSecao] = useState('')
  const [selecionado, setSelecionado] = useState('Tópico')
  const [modalVisivel, setModalVisivel] = useState(false)
  const secoes = useDatabase('/secoes/' + selecionado)
  const [dataStatus, pushNovaData] = useDatabasePush()

  const saveSecao = () => {
    const invalidCharacters = ['.', '#', '$', '[', ']', '/']
    let listaSecoes = []
    secoes !== null &&
      Object.keys(secoes).map(sec => {
        listaSecoes.push(secoes[sec].secao)
      })
    if (novaSecao.trim() !== '' && selecionado !== 'Tópico' && !invalidCharacters.some(el => novaSecao.includes(el))) {
      if (secoes === null || !listaSecoes.includes(novaSecao.toLocaleLowerCase())) {
        pushNovaData('/secoes/' + selecionado, {
          secao: novaSecao.toLocaleLowerCase(),
        })
        Keyboard.dismiss()
        setStatus({ tipo: 'secao', status: 'Seção criada', code: 'sucesso' })
      } else {
        setStatus({ tipo: 'secao', status: 'A seção já existe', code: 'erro' })
      }
    } else {
      selecionado === 'Tópico'
        ? setStatus({
            tipo: 'secao',
            status: 'Seleciona um tópico',
            code: 'erro',
          })
        : setStatus({
            tipo: 'secao',
            status: 'Valor inválido ou possui ".", "#", "$", "[","]", "/")',
            code: 'erro',
          })
    }
  }
  return (
    <Layout title='Criar uma nova seção'>
      <ModalSelect
        toggleModal={setModalVisivel}
        visible = {modalVisivel}
        lista = {topicos}
        selecionado={selecionado}
        setSelecionado={setSelecionado}
      />
      <Input onChangeText={text => setNovaSecao(text)} value={novaSecao} placeholder='Digite uma nova seção' />
      {status.tipo === 'secao' && <CriarStatus status={status} />}
      <Botao funcao={saveSecao} title = 'Adicionar Seção' ativado/>
    </Layout>
  )
}

export default CriarSecao

import React, { useState, useEffect } from 'react'
import {
  useDatabase,
  useDatabasePush,
  useDatabaseShareGet,
} from '../../config/database'
import Layout from '../../components/LayoutContainer'
import CriarStatus from '../../components/Status';
import Botao from '../../components/Botao'
import ModalSelect from '../../components/ModalSelect'
import {
  Input,
  ButtonTitle,
  ContainerModais,
  ButtonShare,
} from './styles'
import ModalAddShare from '../../components/ModalAddShare'
const CriarPergunta = ({ topicos, status, setStatus }) => {
  const [pergunta, setPergunta] = useState({ pergunta: '', resposta: '' })
  const [codigo, setCodigo] = useState('C000-36E2-4932')
  const [adicionarTerminou, setAdicionarTerminou] = useState(false)
  const [modalTopicoVisivel, setModalTopicoVisivel] = useState(false)
  const [modalSecaoVisivel, setModalSecaoVisivel] = useState(false)
  const [modalShareVisivel, setModalShareVisivel] = useState(false)
  const [secaoSelecionada, setSecaoSelecionada] = useState('Seção')
  const [topicoSelecionado, setTopicoSelecionado] = useState('Tópico')

  const secoes = useDatabase('/secoes/' + topicoSelecionado)
  const [dataStatus, pushNovaData] = useDatabasePush()
  const [perguntasShare, setPerguntasShare] = useState({})
  const [getPerguntas] = useDatabaseShareGet()


  const isDisabled = () =>{
    if(topicoSelecionado !== 'Tópico' &&
    secaoSelecionada !== 'Seção' ){
      return false
    }else{
      return true
    }
  }
  const savePergunta = () => {
    if (
      topicoSelecionado !== 'Tópico' &&
      secaoSelecionada !== 'Seção' &&
      pergunta.pergunta !== '' &&
      pergunta.resposta !== ''
    ) {
      pushNovaData(
        '/perguntas/' + topicoSelecionado + '/' + secaoSelecionada,
        pergunta
      )
      setStatus({
        tipo: 'pergunta',
        status: 'Pergunta criada!',
        code: 'sucesso',
      })
    } else {
      if (topicoSelecionado === 'Tópico' || secaoSelecionada === 'Seção') {
        setStatus({
          tipo: 'pergunta',
          status: 'Selecione um tópico e uma seção',
          code: 'erro',
        })
      } else {
        setStatus({
          tipo: 'pergunta',
          status: 'Digite valores válidos',
          code: 'erro',
        })
      }
    }
  }

  const onChange = (field) => (text) => {
    setPergunta({
      ...pergunta,
      [field]: text,
    })
  }

  const resetSecao = () => {
    setSecaoSelecionada('Seção')
  }

  const receberPerguntas = async (codigo) => {
    if (  codigo !== ''){
      const data = await getPerguntas(codigo)
      if (data !== null) {
        setPerguntasShare(data)
        setAdicionarTerminou(true)
        setStatus({
          tipo: 'codigo',
          status: ``,
          code: 'sucesso',
        })
      } else {
        setStatus({
          tipo: 'codigo',
          status: `Nenhuma pergunta encontrada`,
          code: 'erro',
        })
      }
    }else {
        setStatus({
          tipo: 'codigo',
          status: 'Digite valores válidos',
          code: 'erro',
        })
      
    }
  }
  const adicionarPerguntas = () => {
    Promise.all(
      Object.keys(perguntasShare).map((item) => {
        pushNovaData(
          '/perguntas/' + topicoSelecionado + '/' + secaoSelecionada,
          {
            pergunta: perguntasShare[item].pergunta,
            resposta: perguntasShare[item].resposta,
          }
        )
      })
    )
  }

  useEffect(() => {
    if (Object.keys(perguntasShare).length > 0) {
      adicionarPerguntas()
    }
  }, [perguntasShare])

  const resetShare = () =>{
    setCodigo('')
    setAdicionarTerminou(false)
    setModalShareVisivel(false)
    setPerguntasShare({})
    setStatus({})
    
  }
  return (
    <Layout title ='Criar uma nova pergunta'>
        <ButtonShare onPress={() => setModalShareVisivel(true)} disabled = {isDisabled()}>
          <ButtonTitle>+ Código</ButtonTitle>
        </ButtonShare>
        <ModalAddShare
          visible={modalShareVisivel}
          terminou={adicionarTerminou}
          topicoSelecionado={topicoSelecionado}
          secaoSelecionada={secaoSelecionada}
          codigo={codigo}
          codigoSet={setCodigo}
          reset={resetShare}
          get={receberPerguntas}
          modalSet={setModalShareVisivel}
          status={status}
        />
      <ContainerModais>
        <ModalSelect
          toggleModal={setModalTopicoVisivel}
          selecionado={topicoSelecionado}
          visible={modalTopicoVisivel}
          setSelecionado={setTopicoSelecionado}
          reset={true}
          resetSecao={resetSecao}
          lista={topicos}
        />
        <ModalSelect
          toggleModal={setModalSecaoVisivel}
          selecionado={secaoSelecionada}
          visible={modalSecaoVisivel}
          setSelecionado={setSecaoSelecionada}
          isSecao={true}
          lista={secoes && Object.values(secoes)}
        />
      </ContainerModais>
      <Input
        onChangeText={onChange('pergunta')}
        value={pergunta.pergunta}
        placeholder='Escreva uma pergunta'
        multiline={true}
      />
      <Input
        onChangeText={onChange('resposta')}
        value={pergunta.resposta}
        placeholder='Escreva uma resposta'
        multiline={true}
      />
      {status.tipo === 'pergunta' && <CriarStatus status={status} />}
      <Botao funcao={savePergunta} title ='Adicionar Pergunta' ativado/>
     </Layout>
  )
}

export default CriarPergunta

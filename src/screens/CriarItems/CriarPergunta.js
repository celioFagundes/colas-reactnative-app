import React, { useState, useEffect } from 'react'
import { Modal, View } from 'react-native'
import {
  useDatabase,
  useDatabasePush,
  useDatabaseShareGet,
} from '../../config/database'
import { Entypo } from '@expo/vector-icons'
import ModalPicker from './ModalPicker'
import CriarStatus from './CriarStatus'
import {
  Container,
  Input,
  InputCodigo,
  Button,
  ButtonTitle,
  Tab,
  ModalSelect,
  ModalText,
  ContainerModais,
  Header,
  ModalContainer,
  ModalBox,
  Mensagem,
} from './styles'
const CriarPergunta = ({ topicos, status, setStatus }) => {
  const [pergunta, setPergunta] = useState({ pergunta: '', resposta: '' })
  const [codigo, setCodigo] = useState('')
  const [adicionarTerminou, setAdicionarTerminou] = useState(false)
  const [modalTopicoVisivel, setModalTopicoVisivel] = useState(false)
  const [modalSecaoVisivel, setModalSecaoVisivel] = useState(false)
  const [modalShareVisivel, setModalShareVisivel] = useState()
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

  const toggleModal = (func, bool) => func(bool)
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
    <Container>
      <Header>
        <Tab>Criar uma nova pergunta</Tab>
        <Button onPress={() => setModalShareVisivel(true)} disabled = {isDisabled()}>
          <ButtonTitle>+ Código</ButtonTitle>
        </Button>
      </Header>
      <Modal
        transparent={true}
        animationType='fade'
        visible={modalShareVisivel}
      >
        <ModalContainer>
          <ModalBox>
            {!adicionarTerminou && (
              <View>
                <Mensagem>
                  Insira um código para adicionar perguntas para o topico e
                  seção selecionados
                </Mensagem>
                <Header>
                  <Mensagem>
                    Tópico:{' '}
                    {topicoSelecionado !== 'Tópico'
                      ? topicoSelecionado
                      : 'Nenhum'}
                  </Mensagem>
                  <Mensagem>
                    Seção:{' '}
                    {secaoSelecionada !== 'Seção'
                      ? secaoSelecionada
                      : 'Nenhuma'}
                  </Mensagem>
                </Header>
                <InputCodigo
                  onChangeText={(text) => setCodigo(text)}
                  placeholder='AAAA-BBBB-CCCC'
                />
                {status.tipo === 'codigo' && <CriarStatus status={status} />}
                <Header>
                  <Button onPress={() => receberPerguntas(codigo)}>
                    <ButtonTitle>Adicionar</ButtonTitle>
                  </Button>
                  <Button onPress={() => setModalShareVisivel(false)}>
                    <ButtonTitle>Cancelar</ButtonTitle>
                  </Button>
                </Header>
              </View>
            )}
            {adicionarTerminou && (
              <View>
                <Mensagem>Perguntas adicionadas com sucesso</Mensagem>
                <Button onPress={resetShare}>
                  <ButtonTitle>Ok</ButtonTitle>
                </Button>
              </View>
            )}
          </ModalBox>
        </ModalContainer>
      </Modal>
      <ContainerModais>
        <ModalSelect onPress={() => toggleModal(setModalTopicoVisivel, true)}>
          <ModalText
            color={
              topicoSelecionado !== 'Tópico'
                ? 'rgba(0,0,0,0.7)'
                : 'rgba(0,0,0,0.3)'
            }
          >
            {topicoSelecionado}
          </ModalText>
          <Entypo name='select-arrows' size={16} color='rgba(0,0,0,0.3)' />
        </ModalSelect>
        <Modal
          transparent={true}
          animationType='fade'
          visible={modalTopicoVisivel}
          onRequestClose={() => toggleModal(setModalTopicoVisivel, false)}
        >
          <ModalPicker
            toggleModal={setModalTopicoVisivel}
            setData={setTopicoSelecionado}
            lista={topicos}
            reset={true}
            resetSecao={resetSecao}
          />
        </Modal>
        <ModalSelect onPress={() => toggleModal(setModalSecaoVisivel, true)}>
          <ModalText
            color={
              secaoSelecionada !== 'Seção'
                ? 'rgba(0,0,0,0.7)'
                : 'rgba(0,0,0,0.3)'
            }
          >
            {secaoSelecionada}
          </ModalText>
          <Entypo name='select-arrows' size={16} color='rgba(0,0,0,0.3)' />
        </ModalSelect>
        <Modal
          transparent={true}
          animationType='fade'
          visible={modalSecaoVisivel}
          onRequestClose={() => toggleModal(setModalSecaoVisivel, false)}
        >
          <ModalPicker
            toggleModal={setModalSecaoVisivel}
            setData={setSecaoSelecionada}
            lista={secoes && Object.values(secoes)}
            isSecao={true}
          />
        </Modal>
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
      <Button onPress={savePergunta}>
        <ButtonTitle>Adicionar Pergunta</ButtonTitle>
      </Button>
    </Container>
  )
}

export default CriarPergunta

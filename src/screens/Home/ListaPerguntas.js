import React, { useState, useEffect } from 'react'
import * as Clipboard from 'expo-clipboard'
import { useDatabaseSharePush } from '../../config/database'
import { Fontisto, MaterialIcons } from '@expo/vector-icons'
import ContainerExpansivo from '../../components/ContainerExpansivo'
import BotaoIcone from '../../components/BotaoIcone'
import ModalShare from '../../components/ModalShare'
import HeaderSelecionar from '../../components/HeaderSelecionar'
import { LayoutAnimation, Platform, UIManager, Alert, FlatList } from 'react-native'
import {
  ContainerPerguntas,
  Tab,
  Header,
  Lista,
  IconeSelecao,
  LabelCompartilhar,
} from './styles_lista'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const ListaPerguntas = ({ data, topico, secao }) => {
  const [dataSource, setDataSource] = useState({})
  const [codigoShare, setCodigoShare] = useState('')
  const [verLista, setVerLista] = useState(false)
  const [shareTerminou, setShareTerminou] = useState(false)
  const [shareModalVisivel, setShareModalVisivel] = useState(false)
  const [modoSelecionando, setModoselecionando] = useState(false)
  const [multiSelect, setMultiSelect] = useState(true)
  const [compartilharDisabled, setCompartilharDisabled] = useState(false)
  const [pushData, push, genKey] = useDatabaseSharePush()
  const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([])

  useEffect(() => {
    perguntasSelecionadas.length > 0
      ? setCompartilharDisabled(false)
      : setCompartilharDisabled(true)
  }, [perguntasSelecionadas])

  useEffect(() => {
    setDataSource(data)
  }, [data])

  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    const array = dataSource
    if (multiSelect) {
      array[index]['expandido'] = !array[index]['expandido']
    } else {
      Object.keys(array).map(value =>
        value === index
          ? (array[value]['expandido'] = !array[value]['expandido'])
          : (array[value]['expandido'] = false)
      )
    }
    setDataSource({ ...array })
  }
  const jaSelecionada = id => {
    const status = perguntasSelecionadas.some(element => {
      if (element.id === id) {
        return true
      } else {
        return false
      }
    })
    return status
  }

  const selecionar = id => {
    setModoselecionando(true)
    if (!jaSelecionada(id)) {
      setPerguntasSelecionadas([
        ...perguntasSelecionadas,
        {
          id: id,
          pergunta: dataSource[id].pergunta,
          resposta: dataSource[id].resposta,
        },
      ])
    } else {
      const arraySemItem = perguntasSelecionadas.filter(item => {
        return item.id !== id
      })
      setPerguntasSelecionadas([...arraySemItem])
    }
  }
  const sairDaSelecao = () => {
    setModoselecionando(false)
    setPerguntasSelecionadas([])
  }
  const selecionarTodas = () => {
    const todasPerg = []
    if (perguntasSelecionadas.length === Object.keys(dataSource).length) {
      setPerguntasSelecionadas([])
    } else {
      Object.keys(dataSource).map(item => {
        todasPerg.push({
          id: item,
          pergunta: dataSource[item].pergunta,
          resposta: dataSource[item].resposta,
        })
      })
      setPerguntasSelecionadas([...todasPerg])
    }
  }
  const share = () => {
    let arrayKey = genKey()
    Promise.all(
      perguntasSelecionadas.map(perg => {
        console.log('rodando')
        push(
          {
            pergunta: perg.pergunta,
            resposta: perg.resposta,
          },
          arrayKey
        )
      })
    )
    setCodigoShare(arrayKey)
    setShareTerminou(true)
  }

  const terminarShare = () => {
    setCodigoShare('')
    setShareTerminou(false)
    setShareModalVisivel(false)
  }
  const copyToClipboard = () => {
    Clipboard.setString(codigoShare)
    Alert.alert('Código', 'Código copiado para área de transferência')
  }

  const toggleVerLista = bool => {
    setVerLista(bool)
  }
  return (
    <ContainerPerguntas vendo={verLista}>
      {!modoSelecionando && (
        <Header>
          <Tab>Perguntas</Tab>
          <BotaoIcone
            onPress={() => toggleVerLista(!verLista)}
            name='remove-red-eye'
            color='#3772ff'
          />
          {multiSelect ? (
            <BotaoIcone
              onPress={() => setMultiSelect(!multiSelect)}
              name='horizontal-rule'
              color='#3772ff'
            />
          ) : (
            <BotaoIcone
              onPress={() => setMultiSelect(!multiSelect)}
              name='horizontal-split'
              color='#3772ff'
            />
          )}
        </Header>
      )}
      {modoSelecionando && (
        <HeaderSelecionar
          selecionarTodas={selecionarTodas}
          lista={dataSource}
          tamanhoSelecionadas={perguntasSelecionadas.length}
          tamanhoLista={Object.keys(dataSource).length}
          disabled={compartilharDisabled}
          sairSelecao={sairDaSelecao}
          modalToggle={setShareModalVisivel}
        />
      )}
      <Lista>
        {dataSource && (
          <FlatList
            data={Object.keys(dataSource)}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item}
            style={{ marginTop: 15 }}
            renderItem={({ item }) => (
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
            )}
          />
        )}
      </Lista>
      <ModalShare
        visible={shareModalVisivel}
        terminou={shareTerminou}
        tamanho={perguntasSelecionadas.length}
        shareFunction={share}
        closeFunction={() => setShareModalVisivel(false)}
        codigo={codigoShare}
        finishFunction={terminarShare}
        copy={copyToClipboard}
      />
    </ContainerPerguntas>
  )
}

export default ListaPerguntas

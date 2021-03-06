import React, { useState, useEffect, useContext } from 'react'
import { useDatabase, useDatabaseRemove } from '../../config/database'
import ModalExcluir from '../../components/ModalExcluirELogout'
import { AuthContext } from '../../config/auth'
import ListaPerguntas from './ListaPerguntas'
import Lista from '../../components/Lista'
import Layout from '../../components/LayoutContainer'
import BotaoIcone from '../../components/BotaoIcone'

import {
  Wrapper,
  Placeholder,
} from './styles_index'

const Home = props => {
  const auth = useContext(AuthContext)

  const [topico, setTopico] = useState()
  const [topicoKey, setTopicoKey] = useState(null)
  const [secao, setSecao] = useState()
  const [secaoKey, setSecaoKey] = useState(null)
  const [modalExcluirTopico, setModalExcluirTopico] = useState(false)
  const [modalExcluirSecao, setModalExcluirSecao] = useState(false)

  const data = useDatabase('/topicos/')
  const dataSecoes = useDatabase('/secoes/' + topico)
  const dataPerguntas = useDatabase('/perguntas/' + topico + '/' + secao)
  const remove = useDatabaseRemove()

  const refetchSecoes = (data, itemKey) => {
    topico === data ? setTopico(null) : setTopico(data)
    setTopicoKey(itemKey)
    setSecao(null)
  }
  const refetchPerguntas = (data, itemKey) => {
    secao === data ? setSecao(null) : setSecao(data)
    setSecaoKey(itemKey)
  }

  const excluirTopico = () => {
    remove('/topicos/' + topicoKey)
    remove('/secoes/' + '/' + topico)
    remove('/perguntas/' + '/' + topico)
    setTopico(null)
    setTopicoKey(null)
    setModalExcluirTopico(false)
  }
  const excluirSecao = () => {
    remove('/secoes/' + '/' + topico + '/' + secaoKey)
    remove('/perguntas/' + '/' + topico + '/' + secao)
    setSecao(null)
    setSecaoKey(null)
    setModalExcluirSecao(false)
  }

  useEffect(() => {
    if (auth.loading && auth.user === null) {
      props.navigation.navigate('Loading')
    }
  }, [auth.user])

  
  return (
    <Wrapper>
        <Layout title='T??picos'>
          {data && Object.keys(data).length > 0 ? (
            <Lista data={data} refetchFunction={refetchSecoes} tipo='topico' selecionado={topico} />
          ) : (
            <Placeholder>Sem t??picos</Placeholder>
          )}
          {topico !== undefined && (
            <BotaoIcone name='delete' color='#3772ff' onPress={() => setModalExcluirTopico(true)} />
          )}
        </Layout>
        <Layout title='Sec??es'>
          {dataSecoes && topico !== '' ? (
            <Lista
              data={dataSecoes}
              refetchFunction={refetchPerguntas}
              tipo={'secao'}
              selecionado={secao}
            />
          ) : (
            <Placeholder>{topico === null ? 'Selecione um t??pico' : 'Sem sec??es'}</Placeholder>
          )}
          {secao !==  undefined && (
            <BotaoIcone name='delete' color='#3772ff' onPress={() => setModalExcluirSecao(true)} />
          )}
        </Layout>
        <ModalExcluir
          visible={modalExcluirTopico}
          message={`Tem certeza que quer excluir o t??pico ${topico}? As se????es e perguntas deste topico tambem ser??o excluidas`}
          confirmFunction={excluirTopico}
          closeFunction={() => setModalExcluirTopico(false)}
        />
        <ModalExcluir
          visible={modalExcluirSecao}
          message={` Tem certeza que quer excluir a se????o ${secao}? As perguntas desta se????o tambem ser??o excluidas`}
          confirmFunction={excluirSecao}
          closeFunction={() => setModalExcluirSecao(false)}
        />
        <ListaPerguntas data={dataPerguntas} topico={topico} secao={secao} />
    </Wrapper>
  )
}

export default Home

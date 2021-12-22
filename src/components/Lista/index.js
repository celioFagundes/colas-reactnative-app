import React from 'react'
import { FlatList } from 'react-native'
import Botao from '../Botao'
const Lista = ({ data, refetchFunction, tipo, selecionado }) => {
  return (
    <FlatList
      data={Object.keys(data)}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item}
      style={{ marginTop: 15 }}
      renderItem={({ item }) => (
        <Botao
          funcao={() => refetchFunction(data[item][tipo], item)}
          title={data[item][tipo]}
          key={data[item][tipo]}
          ativado={selecionado === data[item][tipo] ? true : false}
        />
      )}
    />
  )
}

export default Lista

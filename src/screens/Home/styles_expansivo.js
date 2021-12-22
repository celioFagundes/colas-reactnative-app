import styled, { css } from 'styled-components/native'
import { Texto } from '../../styles/geral'

export const FlexContainer = css`
  flex-direction: row;
  align-items: center;
`

export const Wrapper = styled.View`
  margin: 15px 0;
`
export const ContainerPergunta = styled.TouchableOpacity`
  background-color: ${(props) => (props.selecionada ? '#1545B3' : '#3772ff')};
  padding: 20px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: ${(props) => (props.expandido ? '0px' : '8px')};
  border-bottom-left-radius: ${(props) => (props.expandido ? '0px' : '8px')};
`

export const ContainerResposta = styled.View`
  height: ${(props) => (props.expandido ? 'auto' : '0')};
  overflow: hidden;
`
export const Resposta = styled.View`
  background-color: #b5cbff;
  padding: 20px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`
export const Icon = styled.View`
  position: absolute;
  top: 20px;
  right: 10px;
`
export const Acoes = styled.View`
  ${FlexContainer}
  align-self: flex-end;
`

//TEXTOS


export const TextoPergunta = styled(Texto)`
  color: #fff;
`
export const TextoResposta = styled(Texto)``

//TEXTOS

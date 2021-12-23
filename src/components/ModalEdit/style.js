import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width - 30 + 'px'
const windowHeight = Dimensions.get('window').height / 4 + 'px'
import { Sombra, Texto } from '../../styles/geral'

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`
export const ModalBox = styled.View`
  min-height: ${windowHeight};
  height: auto;
  width: ${windowWidth};
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fb;
  ${Sombra}
`

export const Input = styled.TextInput`
  padding: 10px;
  font-size: 18px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  margin: 5px 0;
  ${Sombra}
`
export const Tab = styled(Texto)`
  font-weight: bold;
  margin-left: 5px;
`

export const BoxBotoes = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  align-self: center;
`;

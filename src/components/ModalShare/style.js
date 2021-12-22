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
export const IconeSelecao = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`
export const LabelCompartilhar = styled(Texto)`
  color: ${(props) =>
    props.disabled ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.6)'};
  font-weight: bold;
  margin-left: 5px;
`
export const MensagemCompartilhar = styled(Texto)`
  text-align: center;
`
export const Container = styled.View`
  
`;
export const Codigo = styled(Texto)`
  font-weight: bold;

`
export const BoxBotoes = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  align-self: center;
  width: 100%;
`
export const Botao = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  border-radius: 8px;
  margin: 5px;
  background-color: rgba(0, 0, 0, 0.8);
`
export const BotaoLabel = styled(Texto)`
  color: #fff;
  margin-left: 5px;
`
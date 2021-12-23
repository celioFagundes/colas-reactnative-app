import styled from 'styled-components/native'
import { Texto } from '../../styles/geral.js'


export const Tab = styled(Texto)`
  font-weight: bold;
  margin-left: 5px;
`
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const IconeSelecao = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const LabelCompartilhar = styled(Texto)`
  color: ${(props) =>
    props.disabled ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.6)'};
  font-weight: bold;
  margin-left: 5px;
`


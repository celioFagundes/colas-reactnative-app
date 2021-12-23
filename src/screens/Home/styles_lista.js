import styled from 'styled-components/native'
import { Sombra, Texto } from '../../styles/geral.js'

export const ContainerPerguntas = styled.View`
  position:${props => props.vendo ? 'absolute' : 'relative'};
  width:100%;
  top:0;
  bottom:0;
  left:${props => props.vendo ? '20px' : '0'};
  background-color: #f8f9fb;
  border-radius: 8px;
  padding: 20px 10px;
  ${Sombra}
`
export const Tab = styled(Texto)`
  font-weight: bold;
  margin-left: 5px;
`
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

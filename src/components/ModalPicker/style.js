import styled from 'styled-components/native'
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width - 30 + 'px';
const windowHeight = Dimensions.get('window').height / 2 + 'px';
import { Sombra } from '../../styles/geral';
export const ModalContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const ModalBox = styled.View`
  height: ${windowHeight};
  width: ${windowWidth};
  justify-content: center;
  align-items:center;
  padding:20px;
  background-color: #f8f9fb;
  ${Sombra}
`;
export const ModalItem = styled.TouchableOpacity`
  align-items:center;
`;
export const ItemText = styled.Text`
  color: #000;
  margin: 15px;
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
`;

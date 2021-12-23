import styled from 'styled-components/native';
import { Sombra } from '../../styles/geral';

export const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 5px 15px 0 15px;
`;
export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;
export const Container = styled.View`
  margin-bottom: 10px;
  background-color: #f8f9fb;
  border-radius: 8px;
  padding: 10px;
  ${Sombra}
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0, 0, 0, 0.3)',
})`
  padding: 10px;
  font-size: 18px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  margin: 5px 0;
  ${Sombra}
  
`;

export const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const ContainerModais = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 10px 0;
`;

export const ButtonShare = styled.TouchableOpacity`
  background-color: ${props => props.disabled ? '#8AADFF': '#3772ff'};
  padding: 8px 15px;
  width: 100px;
  border-radius: 8px;
  margin: 5px 0px;
  ${Sombra}
`;

import styled from "styled-components/native";
import { Sombra , Texto} from "../../styles/geral";

export const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 5px 15px 0 15px;
`;
export const ScrollView = styled.ScrollView`
  flex: 1;
`;
export const Container = styled.View`
  flex: 1;
  margin-bottom: 10px;
  background-color: #f8f9fb;
  border-radius: 8px;
  padding: 20px 10px;
  ${Sombra}
`;
export const Tab = styled(Texto)`
  font-weight: bold;
`;
export const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.selecionado ? "#3772ff" : "#6E99FF")};
  padding: 8px 15px;
  border-radius: 8px;
  margin-right: 10px;
  ${Sombra}
`;
export const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Placeholder = styled.Text`
  
`;




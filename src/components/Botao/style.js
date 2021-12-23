import styled from "styled-components/native";
import { Sombra } from "../../styles/geral";

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.ativado ? "#3772ff" : "#6E99FF")};
  max-height:40px;
  padding: 8px 15px;
  align-self:center;
  border-radius: 8px;
  margin-right: 10px;
  ${Sombra}
`;
export const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-align:center;
`;
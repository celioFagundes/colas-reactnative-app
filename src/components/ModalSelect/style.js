import styled from "styled-components/native";
import { Sombra } from "../../styles/geral";

export const Select = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  width: 48%;
  align-items: stretch;
  background-color: #fff;
  padding: 8px 10px;
  border-radius: 8px;
  margin: 5px 0;
  ${Sombra}
`;
export const Option = styled.Text`
  color: ${(props) => props.color};
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;
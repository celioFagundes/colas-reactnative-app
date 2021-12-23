import styled from "styled-components/native";
import { Sombra,Texto } from "../../styles/geral";

export const Container = styled.View`
  margin-bottom: 10px;
  background-color: #f8f9fb;
  border-radius: 8px;
  padding: 20px 10px;
  ${Sombra}
`;
export const Tab = styled(Texto)`
  font-weight: bold;
`;

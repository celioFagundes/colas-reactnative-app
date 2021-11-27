import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Excluir } from "../Home/styles";

export const Wrapper = styled(LinearGradient)`
  flex: 1;

  justify-content: center;
  align-items: center;
`;
export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  left: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const BackLabel = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  margin-left: 10px;
`;
export const Input = styled.TextInput`
  margin: 10px 0;
  line-height: 15px;
  padding: 5px 15px;
  width: 60%;
  background-color: #fff;
  border-radius: 40px;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 1px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 60%;
  background-color: #6e99ff;
  border-radius: 40px;
  padding: 10px 20px;
  margin: 10px;
`;
export const ButtonTitle = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  margin-left:5px;
`;

export const NovaConta = styled.Text`
  color: #fff;
`;
export const Link = styled.Text`
  color: #fff;
  text-decoration: underline;
`;
export const Error = styled.Text`
  width: 60%;
  color: #ff5154;
`;

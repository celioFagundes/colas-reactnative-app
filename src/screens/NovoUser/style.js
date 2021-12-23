import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
export const Wrapper = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 30px;
  left: 20px;
`;
export const BackLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  color: #fff;
`;
export const Input = styled.TextInput`
  width: 60%;
  padding: 5px 15px;
  margin: 10px 0;
  line-height: 15px;
  border-radius: 40px;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 1px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 60%;
  border-radius: 40px;
  padding: 10px 20px;
  margin: 10px;
  background-color: #6e99ff;
`;
export const ButtonTitle = styled.Text`
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  margin-left: 5px;
  color: #fff;
`;

export const NovaConta = styled.Text`
  color: #fff;
`;
export const Link = styled.Text`
  text-decoration: underline;
  color: #fff;
`;
export const Error = styled.Text`
  width: 60%;
  color: #ff5154;
`;

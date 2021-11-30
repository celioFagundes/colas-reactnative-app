import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 5px 15px 0 15px;
`;
export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  margin-bottom: 10px;
  background-color: #f8f9fb;
  border-radius: 8px;
  padding: 20px 10px;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 0.5px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.selecionado ? "#3772ff" : "#6E99FF")};
  padding: 8px 15px;
  border-radius: 8px;
  margin-right: 10px;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 1px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
`;
export const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;
export const Tab = styled.Text`
  color: rgba(0, 0, 0, 0.6);
  font-size: 18px;
  font-weight: bold;
`;
export const TabContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

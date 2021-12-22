import styled from "styled-components/native";

export const Status = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  margin-bottom: 5px;
`;
export const StatusIcon = styled.View`
  margin-right: 5px;
`;
export const StatusMessage = styled.Text`
  color: ${(props) => (props.code === 'sucesso' ? '#14CC60' : '#FF5154')};
`;
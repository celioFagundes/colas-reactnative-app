import styled from 'styled-components/native';


export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 0 20px;
  background-color: #fff;
`;
export const User = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Username = styled.Text`
  margin-left: 6px;
  color: #6e99ff;
`;

export const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const LogoutLabel = styled.Text`
  margin-left: 4px;
  color: #000;
`;




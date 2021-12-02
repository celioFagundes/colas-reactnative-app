import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width - 30 + 'px';
const windowHeight = Dimensions.get('window').height / 2 + 'px';

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
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 0.5px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
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
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 1px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const Button = styled.TouchableOpacity`
  background-color: #3772ff;
  align-self: center;
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

export const ModalSelect = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  width: 48%;
  align-items: stretch;
  background-color: #fff;
  padding: 8px 10px;
  border-radius: 8px;
  margin: 10px 0;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 1px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
`;
export const ModalText = styled.Text`
  color: ${(props) => props.color};

  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const ContainerModais = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 5px;
`;
export const ModalContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ModalBox = styled.View`
  height: ${windowHeight};
  width: ${windowWidth};
  background-color: #3772ff;
  border-radius: 5px;
  border-top-width: 0.5px;
  border-left-width: 0.5px;
  border-right-width: 1px;
  border-bottom-width: 2px;
  border-color: rgba(0, 0, 0, 0.1);
`;
export const ModalItem = styled.TouchableOpacity`
  align-items:center;
`;
export const ItemText = styled.Text`
  color: #fff;
  margin: 15px;
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
`;

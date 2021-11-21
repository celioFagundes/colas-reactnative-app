import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView
} from "react-native";
import { ModalContainer } from "./styles";
const options = ["red", "green", "blue"];
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ModalPicker = ({ toggleModal, setData ,lista}) => {

    const onPressItem = option =>{
        toggleModal(false)
        setData(option)
    }
   
  return (
    <ModalContainer
      onPress={() => toggleModal(false)}
      style={styles.container}
    >
      <View style={[styles.modal, { width: width - 30, height: height / 2 }]}>
        <ScrollView>
            {lista !== 'Sem seções' && lista !== null ? Object.keys(lista).map((item) => (
              <TouchableOpacity key={item} style={styles.item} onPress = {() => onPressItem(item)}>
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            )): <Text style={styles.text}>Nenhum item criado</Text>}
        </ScrollView>
      </View>
    </ModalContainer>
  );
};

export default ModalPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
    
   
  },
  modal: {
    backgroundColor: "#3772ff",
    
    borderRadius: 5,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  text: {
    color: "#fff",
    margin:15,
    fontSize:20,
    fontWeight:'bold',
    textTransform:'capitalize',
   
  },
  item:{
      alignItems:'center',
      
     
    
  }
});

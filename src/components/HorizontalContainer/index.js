import React, { useRef } from "react";
import { FlatList } from "react-native";
import ListItem from "./item";
import { Container, ListContainer } from "./styles";

const HorizontalContainer = ({data}) => {
  const dataRef = useRef(null);

  return (
    <Container>
      <ListContainer>
        <FlatList
          data={data}
          renderItem={({ item }) => <ListItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator = {false}
          pagingEnabled
          bounces = {false}
          ref={dataRef}
        />
      </ListContainer>
    </Container>
  );
};
export default HorizontalContainer;

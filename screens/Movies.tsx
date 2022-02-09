import { Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const MovieText = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  return (
    <Btn
      onPress={() => {
        navigate("Stack", { screen: "One" });
      }}
    >
      <MovieText>Movie</MovieText>
    </Btn>
  );
};

export default Movies;

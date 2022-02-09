import { StyleSheet, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

export default function Tv() {
  return (
    <Container>
      <Text>Tv</Text>
    </Container>
  );
}

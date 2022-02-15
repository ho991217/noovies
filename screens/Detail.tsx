import React from "react";
import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const BgImg = styled.Image`
  width: 100%;
  height: 200px;
  position: absolute;
  top: 0;
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  const isDark = useColorScheme() === "dark";
  useEffect(() => {
    console.log(params);
    if (params.media_type === "movie") {
      setOptions({
        title: params.title,
      });
    } else {
      setOptions({
        title: params.original_name,
      });
    }
  }, []);
  return (
    <Container>
      <BgImg source={{ uri: makeImgPath(params.backdrop_path) || "" }} />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={Platform.OS === "ios" ? 50 : 100}
        // style={{ width: "100%", height: "100%", position: "absolute" }}
      >
        <Poster path={params.poster_path || ""} />
      </BlurView>
    </Container>
  );
};

export default Detail;

import { BlurView } from "expo-blur";
import React from "react";
import { Platform, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const ViewContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 20px;
  font-family: "Noto Sans Bold";
  color: ${(props) => (props.isDark ? "white" : "black")};
`;

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 50%;
  margin-left: 20px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 5px;
  font-size: 14px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"};
  font-family: "Noto Sans Medium";
`;

const Votes = styled(Overview)<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"};
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  overview: number;
  voteAverage: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  overview,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <ViewContainer>
      <BgImg source={{ uri: makeImgPath(backdropPath) }}></BgImg>
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={Platform.OS === "ios" ? 50 : 100}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            <Overview isDark={isDark} numberOfLines={3}>
              {overview}
            </Overview>
            <Votes isDark={isDark}>{voteAverage} / 10</Votes>
          </Column>
        </Wrapper>
      </BlurView>
    </ViewContainer>
  );
};

export default Slide;

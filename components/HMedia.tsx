import styled from "styled-components/native";
import React from "react";
import Poster from "./Poster";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  align-items: center;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 65%;
  flex: 1;
`;

const BigTitle = styled.Text`
  margin-bottom: -2px;
  font-size: 18px;
  color: ${(props) => props.theme.mainTextColor};
  font-family: "Noto Sans Medium";
  text-align: left;
`;

const Overview = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.mainTextColor};
  font-family: "Noto Sans Regular";
`;

const Release = styled(Overview)`
  font-size: 10px;
  margin-bottom: 15px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate: string;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
}) => {
  return (
    <HMovie>
      <Poster path={posterPath} />
      <HColumn>
        <BigTitle>{originalTitle}</BigTitle>
        <Release>
          {new Date(releaseDate).toLocaleDateString("ko", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Release>
        <Overview>
          {overview !== "" && overview.length > 100
            ? overview.slice(0, 100)
            : overview}
          {overview.length > 100 && "..."}
        </Overview>
      </HColumn>
    </HMovie>
  );
};

export default HMedia;

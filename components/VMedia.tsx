import styled from "styled-components/native";
import React from "react";
import { FlatList, Text, useColorScheme, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Poster from "./Poster";

const ListSection = styled.View<{ isDark: boolean }>`
  background-color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(46, 37, 20, 0.06)"};
  padding: 15px 0px;
  margin-bottom: 20px;
`;

const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
`;

const Votes = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
  font-size: 10px;
  margin-left: 5px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const Movie = styled.View`
  /* margin-right: 20px; */
  border-radius: 5px;
  align-items: center;
`;

const Title = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${(props) => props.theme.mainTextColor};
  width: 100px;
  text-align: center;
`;

const VMedia: React.FC = ({ trending }: Array) => {
  const isDark = useColorScheme() === "dark";
  return (
    <ListSection isDark={isDark}>
      <TrendingScroll
        horizontal
        keyExtractor={(item) => item.id + ""}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={() => {
          return <View style={{ width: 20 }} />;
        }}
        data={trending}
        renderItem={({ item }) => (
          <Movie key={item.id}>
            <Poster path={item.poster_path} />
            <Title numberOfLines={2}>
              {item.original_title.slice(0, 24)}
              {item.original_title.length > 24 && "..."}
            </Title>
            <Rating>
              <Ionicons
                name="ios-star"
                size={10}
                color={isDark ? "white" : "black"}
              />
              <Votes>{item.vote_average} / 10</Votes>
            </Rating>
          </Movie>
        )}
      />
    </ListSection>
  );
};

export default VMedia;

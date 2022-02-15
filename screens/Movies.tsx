import { FlatList } from "react-native";
import { Dimensions } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import { useState } from "react";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesApi, Movie } from "../api";
import Loader from "../components/Loader";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

export const ListTitle = styled.Text`
  color: ${(props) => props.theme.mainTextColor};
  font-size: 16px;
  font-family: "Noto Sans Bold";
  margin-left: 20px;
  margin-bottom: 20px;
`;

const VSeperator = styled.View`
  height: 30px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const queryClient = useQueryClient();
  const isDark = useColorScheme() === "dark";
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRetchingUpcoming,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  // const refreshing =
  //   isRetchingNowPlaying || isRetchingTrending || isRetchingUpcoming;

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  useEffect(() => {}, []);

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 20,
              marginTop: 10,
            }}
            showsButtons={false}
            autoplay
            autoplayTimeout={3.5}
            loop
            showsPagination={false}
            paginationStyle={{ bottom: 10 }}
            activeDotColor={isDark ? "#E4E8ED" : "#30363D"}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                overview={movie.overview}
                voteAverage={movie.vote_average}
                fullData={movie}
              />
            ))}
          </Swiper>
          <ListTitle>인기 상영작</ListTitle>
          <VMedia fullData={trendingData} />

          <ListTitle>개봉 예정작</ListTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={VSeperator}
      renderItem={({ item }) => {
        return (
          <HMedia
            posterPath={item.poster_path || ""}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            fullData={item}
          />
        );
      }}
    />
  ) : null;
};

export default Movies;

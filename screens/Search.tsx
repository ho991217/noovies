import React from "react";
import { useState } from "react";
import { Alert, useColorScheme } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import { ListTitle } from "./Movies";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput<{ isDark: boolean }>`
  background-color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(46, 37, 20, 0.06)"};
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

export default function Search() {
  const isDark = useColorScheme() === "dark";
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });
  const onChangeText = (text: string) => {
    setQuery(text);
  };
  const onSubmit = () => {
    if (query === "") {
      return;
    } else {
      searchMovies();
      searchTv();
    }
  };
  return (
    <Container>
      <SearchBar
        isDark={isDark}
        placeholder="검색어를 입력하세요"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData && (
        <>
          <ListTitle>영화</ListTitle>
          <VMedia fullData={moviesData} />
        </>
      )}
      {tvData && (
        <>
          <ListTitle>드라마</ListTitle>
          <VMedia fullData={tvData} />
        </>
      )}
    </Container>
  );
}

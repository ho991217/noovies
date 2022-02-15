import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import styled from "styled-components/native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { ListTitle } from "./Movies";
import { useState } from "react";

export default function Tv() {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(["tv", "today"], tvApi.airingToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(["tv", "top"], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], tvApi.trending);
  const loading = todayLoading || topLoading || trendingLoading;
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ListTitle>인기 방영</ListTitle>
      <VMedia fullData={trendingData} />
      <ListTitle>오늘 인기</ListTitle>
      <VMedia fullData={todayData} />
      <ListTitle>최고 인기</ListTitle>
      <VMedia fullData={topData} />
    </ScrollView>
  );
}

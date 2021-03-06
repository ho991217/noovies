const API_KEY = "ad7542e7f54260fb0df36e082050f503";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const moviesApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),
  search: async ({ queryKey }) => {
    const [_, query] = queryKey;
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&page=1&region=KR&query=${query}`
    );
    return await res.json();
  },
};

export const tvApi = {
  trending: () =>
    fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),
  airingToday: () =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),
  topRated: () =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),
  search: async ({ queryKey }) => {
    const [_, query] = queryKey;
    const res = await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&page=1&region=KR&query=${query}`
    );
    return await res.json();
  },
};

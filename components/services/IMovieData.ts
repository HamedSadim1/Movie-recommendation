import axios from "axios";

//! Movies
export interface Data {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

//! Movie Details

export interface Detail {
  adult: boolean;
  backdropPath: string;
  belongsToCollection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdbID: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  poster_path: string;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spokenLanguages: any[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  voteCount: number;
}

export enum OriginalLanguage {
  En = "en",
  It = "it",
  Zh = "zh",
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logoPath?: null | string;
  name: string;
  originCountry: string;
}

export interface ProductionCountry {
  iso3166_1: string;
  name: string;
}

//! ApiUrl ApiKey
const apiUrl: string = "https://api.themoviedb.org/3";
const apiKey: string = "18f0c1bfe643593733b0a4c124cbae28";

//! Get popular movies
export const getPopularMovies = async () => {
  const response = await axios.get<Data>(
    `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  return response.data;
};

//! Get upcoming movies
export const getUpcomingMovies = async () => {
  const response = await axios.get<Data>(
    `${apiUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
  );
  return response.data;
};

//! Get movie details
export const getMovieDetails = async (id: number) => {
  const response = await axios.get<Detail>(
    `${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
  );
  return response.data;
};

//! Genre Family movies
export const getFamilyMovies = async () => {
  const response = await axios.get<Data>(
    `${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10751`
  );
  return response.data;
};

//! Popular Tv
export const getPopularTv = async () => {
  const response = await axios.get<Data>(
    `${apiUrl}/tv/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  return response.data;
};
//! Documentary
export const getDocumentary = async () => {
  const response = await axios.get<Data>(
    `${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=99`
  );
  return response.data;
};

// ! SearchMovie
export const searchMovie = async (query: string) => {
  const response = await axios.get<Data>(
    `${apiUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
  );
  return response.data;
};

// ! Find a movie with Id
export const findMovie = async (id: number) => {
  const response = await axios.get<Data>(
    `${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
  );
  return response.data;
};

import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { Data } from "./services/IMovieData";

import {
  getUpcomingMovies,
  getPopularMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentary,
} from "./services/IMovieData";
import List from "./List";

const Movie = () => {
  // crate a popular movies
  const [popularMovies, setPopularMovies] = useState<Data>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  } as Data);

  // upcoming movies
  const [upcomingMovies, setUpcomingMovies] = useState<Data>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  } as Data);

  // popular tv
  const [popularTv, setPopularTv] = useState<Data>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  } as Data);

  // family movies
  const [familyMovies, setFamilyMovies] = useState<Data>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  } as Data);

  // get Documentary
  const [documentary, setDocumentary] = useState<Data>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  } as Data);

  // loading
  const [loading, setLoading] = useState<boolean>(false);

  // PostUrl Function Give the source of the Url Image
  const PosterUrl = (source: string) => {
    return `https://image.tmdb.org/t/p/w500${source}`;
  };

  // get Dimension width and height
  const width = Dimensions.get("window").width;

  let flatList = useRef<FlatList<string[]>>();

  //!  function sets an interval that will execute every 3 seconds keeps track of the number of times the list has been scrolled. When the number of scrolls reaches the numberOfData limit, the scroll position is reset back to the beginning and the scrolled counter is reset to 0
  const infiniteScroll = () => {
    const numberOfData: number = 20;
    let scrollValue: number = 0;
    let scrolled: number = 0;

    const interval = setInterval(() => {
      scrolled++;
      if (scrolled < numberOfData) scrollValue = scrollValue + width;
      else {
        scrollValue = 0;
        scrolled = 0;
      }

      if (flatList.current) {
        flatList.current.scrollToOffset({
          animated: true,
          offset: scrollValue,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  };

  //! Get all the data for each movie type
  const getData = async () => {
    const popularMovies = await getPopularMovies();
    const upcomingMovies = await getUpcomingMovies();
    const popularTv = await getPopularTv();
    const familyMovies = await getFamilyMovies();
    const documentary = await getDocumentary();

    return {
      popularMovies,
      upcomingMovies,
      popularTv,
      familyMovies,
      documentary,
    };
  };

  useEffect(() => {
    setLoading(true);
    getData()
      .then((data) => {
        setPopularMovies(data.popularMovies);
        setUpcomingMovies(data.upcomingMovies);
        setPopularTv(data.popularTv);
        setFamilyMovies(data.familyMovies);
        setDocumentary(data.documentary);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    //! clean the interval
    const unsubscribe = infiniteScroll();
    return unsubscribe;
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loading}
          />
        ) : (
          <>
            <View style={styles.list}>
              <FlatList
                ref={flatList as any}
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                legacyImplementation={false}
                data={upcomingMovies.results}
                renderItem={({ item }) => (
                  <Image
                    resizeMode="cover"
                    style={{ width, height: 700 }}
                    source={{ uri: PosterUrl(item.poster_path) }}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
            <List title="Popular Movies" Movies={popularMovies} />
            <List title="Upcoming Movies" Movies={upcomingMovies} />
            <List title="Popular Tv" Movies={popularTv} />
            <List title="Family Movies" Movies={familyMovies} />
            <List title="Documentary" Movies={documentary} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    marginStart: 5,
    marginEnd: 20,
    paddingTop: 15,
  },
  list: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    paddingTop: 400,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

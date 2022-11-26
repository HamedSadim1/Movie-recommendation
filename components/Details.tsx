import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import React, { useRef } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { getMovieDetails, Detail } from "./services/IMovieData";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";

import { Rating } from "react-native-ratings";
import PlayButton from "./PlayButton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Details = () => {
  const route: RouteProp<any> = useRoute();
  const [movieDetails, setMovieDetails] = useState<Detail>({} as Detail);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  const releaseDateFormat = dateFormat(
    movieDetails.release_date,
    "d,mmmm,yyyy"
  );

  const movieId: number = route.params?.movieId
    ? parseInt(route.params.movieId)
    : 0;

  useEffect(() => {
    setLoading(true);
    getMovieDetails(movieId)
      .then((data) => {
        setMovieDetails(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [route]);
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={styles.container}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
                }}
                style={styles.image}
              />
              <View style={styles.PlayButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetails.title}</Text>

              <View style={styles.genreContainer}>
                {movieDetails.genres?.map((genre) => (
                  <Text key={genre.id} style={styles.genresTitle}>
                    {genre.name}
                  </Text>
                ))}
              </View>

              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                readonly={true}
                startingValue={movieDetails.vote_average / 2}
              />
              <Text style={styles.overview}>{movieDetails.overview}</Text>
              <Text style={styles.releaseDate}>
                Release Date: {releaseDateFormat}
              </Text>
            </View>
          )}
          {modalVisible && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.videoModal}></View>
              <View>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Text>Hide Video</Text>
                </Pressable>
              </View>
            </Modal>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: height / 2.5,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom: 10,
  },
  overview: {
    padding: 15,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  genresTitle: {
    fontSize: 15,
    color: "black",
    paddingBottom: 5,
    fontWeight: "bold",
    marginRight: 20,
  },
  releaseDate: {
    fontWeight: "bold",
  },
  PlayButton: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 290,
    marginRight: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
